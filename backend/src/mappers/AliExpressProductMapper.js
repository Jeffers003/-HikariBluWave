/**
 * AliExpressProductMapper.js
 *
 * Converte as respostas cruas da AliExpress Open Platform (IOP) para o
 * schema de Produto do HikariBluWave.
 *
 * Baseado na estrutura REAL de resposta (extraída do SDK Java oficial,
 * classes com.aliexpress.open.domain.*), não em suposição:
 *
 *   aliexpress.ds.text.search  -> data.products[]  (lista resumida p/ busca)
 *   aliexpress.ds.product.get  -> result           (detalhe completo)
 *
 * IMPORTANTE: apesar dos campos Java serem camelCase, o JSON retornado pela
 * API usa @ApiField -> nomes em snake_case (ex: ae_item_base_info_dto,
 * sku_price, image_urls). É isso que o mapper espera abaixo.
 */

// ---------------------------------------------------------------------------
// 1) Mapper para o resultado de BUSCA (aliexpress.ds.text.search)
//    Usado pra montar a lista/preview antes de importar o produto.
// ---------------------------------------------------------------------------

/**
 * @param {object} rawItem - item de data.products[] da resposta de ds.text.search
 */
export function mapSearchResultToPreview(rawItem) {
  // targetSalePrice/targetOriginalPrice = preço já convertido pro país/moeda
  // pedidos no request (ex: BRL). salePrice/originalPrice vêm em CNY (preço
  // "doméstico" chinês) e NÃO devem ser usados pra exibir ao cliente final.
  return {
    externalId: rawItem.itemId,                 // usar depois em ds.product.get
    fornecedor: 'aliexpress',
    nome: rawItem.title,
    imagem: rawItem.itemMainPic,
    precoOriginal: parseFloat(rawItem.targetOriginalPrice ?? rawItem.originalPrice) || null,
    precoComDesconto: parseFloat(rawItem.targetSalePrice ?? rawItem.salePrice) || null,
    moeda: rawItem.targetOriginalPriceCurrency || rawItem.salePriceCurrency || 'USD',
    desconto: rawItem.discount || null,
    pedidos180d: parseInt(String(rawItem.orders || '0').replace(/[^\d]/g, ''), 10) || 0,
    avaliacao: parseFloat(rawItem.score) || null,
    categoriaIdExterna: rawItem.cateId || null,
    urlOriginal: rawItem.itemUrl ? `https:${rawItem.itemUrl}` : null,
    videoUrl: rawItem.productVideoUrl || null,
  };
}

/**
 * @param {object} searchResponse - resposta completa de aliexpress.ds.text.search
 */
export function mapSearchResponse(searchResponse) {
  const data = searchResponse?.aliexpress_ds_text_search_response?.data
    ?? searchResponse?.data; // depende de como o chamarAliExpress() desembrulha

  // A API aninha a lista em products.selection_search_product, não em products direto
  const lista = data?.products?.selection_search_product;

  if (!data || !Array.isArray(lista)) {
    return { total: 0, pagina: 1, tamanhoPagina: 0, produtos: [] };
  }

  return {
    total: data.totalCount || 0,
    pagina: data.pageIndex || 1,
    tamanhoPagina: data.pageSize || lista.length,
    produtos: lista.map(mapSearchResultToPreview),
  };
}

// ---------------------------------------------------------------------------
// 2) Mapper para o DETALHE COMPLETO (aliexpress.ds.product.get)
//    Usado quando o admin clica "Importar do AliExpress".
// ---------------------------------------------------------------------------

/**
 * A AliExpress (protocolo TOP) é inconsistente na hora de serializar listas
 * em JSON: às vezes vem array puro, às vezes vem embrulhada num objeto com
 * uma chave extra (ex: { selection_search_product: [...] }), e às vezes,
 * quando só tem 1 item, vem o objeto sozinho, sem array nenhum.
 * Essa função normaliza os três casos pra sempre devolver um array.
 */
function extractList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    // objeto-wrapper com uma única chave contendo o array de verdade
    if (keys.length === 1 && Array.isArray(value[keys[0]])) {
      return value[keys[0]];
    }
    // objeto único representando 1 item (API omite o array quando só há 1)
    return [value];
  }
  return [];
}

function mapSku(sku) {
  return {
    skuId: sku.sku_id,
    atributos: extractList(sku.ae_sku_property_dtos).map((p) => ({
      nome: p.sku_property_name,
      valor: p.property_value_definition_name || p.sku_property_value,
      imagem: p.sku_image || null,
    })),
    preco: parseFloat(sku.sku_price) || null,
    precoComDesconto: parseFloat(sku.offer_sale_price) || null,
    moeda: sku.currency_code || null,
    estoque: sku.sku_available_stock ?? null,
    codigoBarras: sku.barcode || sku.ean_code || null,
    faixasAtacado: extractList(sku.wholesale_price_tiers).map((t) => ({
      quantidadeMin: t.begin_num,
      preco: parseFloat(t.price),
    })),
  };
}

function mapPropriedades(props) {
  return extractList(props).map((p) => ({
    nome: p.attr_name,
    valor: p.attr_value,
    unidade: p.attr_value_unit || null,
  }));
}

/**
 * @param {object} productResponse - resposta completa de aliexpress.ds.product.get
 */
export function mapProductDetail(productResponse) {
  const result =
    productResponse?.aliexpress_ds_product_get_response?.result ??
    productResponse?.result;

  if (!result) {
    throw new Error('Resposta da AliExpress sem "result" — produto não encontrado ou token inválido.');
  }

  const base = result.ae_item_base_info_dto || {};
  const multimedia = result.ae_multimedia_info_dto || {};
  const store = result.ae_store_info || {};
  const logistics = result.logistics_info_dto || {};
  const skus = extractList(result.ae_item_sku_info_dtos);
  const propriedades = result.ae_item_properties; // extractList aplicado dentro de mapPropriedades

  return {
    externalId: base.product_id,
    fornecedor: 'aliexpress',

    nome: base.subject,
    descricaoHtml: base.detail || base.mobile_detail || '',

    categoriaIdExterna: base.category_id,
    status: base.product_status_type,

    moeda: base.currency_code,
    vendasTotais: base.sales_count ?? null,
    avaliacaoMedia: base.avg_evaluation_rating ?? null,
    totalAvaliacoes: base.evaluation_count ?? null,

    imagens: (multimedia.image_urls || '')
      .split(';')
      .map((u) => u.trim())
      .filter(Boolean),
    videos: extractList(multimedia.ae_video_dtos).map((v) => v.video_url).filter(Boolean),

    variacoes: skus.map(mapSku),
    propriedades: mapPropriedades(propriedades),

    loja: {
      idExterno: store.store_id,
      nome: store.store_name,
      pais: store.store_country_code,
      avaliacaoComunicacao: store.communication_rating ?? null,
      avaliacaoEnvio: store.shipping_speed_rating ?? null,
      avaliacaoConformidade: store.item_as_described_rating ?? null,
    },

    logistica: {
      // logistics_info_dto varia bastante conforme país/rota;
      // guardamos cru pra usar no cálculo de frete depois
      raw: logistics,
    },

    temAtacado: Boolean(result.has_whole_sale),

    importadoEm: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// 3) Schema final salvo no MongoDB (Produto HikariBluWave)
//    Combina o preview da busca (opcional) com o detalhe completo.
// ---------------------------------------------------------------------------

/**
 * @param {object} detalhe - saída de mapProductDetail()
 * @param {string} categoriaLocalId - _id da categoria já mapeada no seu catálogo
 */
export function toHikariBluWaveProduct(detalhe, categoriaLocalId = null) {
  const precoBase = detalhe.variacoes?.[0]?.precoComDesconto
    ?? detalhe.variacoes?.[0]?.preco
    ?? null;

  return {
    nome: detalhe.nome,
    descricao: detalhe.descricaoHtml,
    imagens: detalhe.imagens,
    preco: precoBase,
    moeda: detalhe.moeda,
    categoria: categoriaLocalId,
    variacoes: detalhe.variacoes,
    fornecedor: {
      nome: 'aliexpress',
      productIdExterno: detalhe.externalId,
      loja: detalhe.loja,
    },
    avaliacao: detalhe.avaliacaoMedia,
    totalAvaliacoes: detalhe.totalAvaliacoes,
    ativo: detalhe.status === 'onSelling' || detalhe.status === 'ACTIVE',
    importadoEm: detalhe.importadoEm,
  };
}

/* ------------------------- EXEMPLO DE USO -------------------------

import { mapSearchResponse, mapProductDetail, toHikariBluWaveProduct } from './AliExpressProductMapper.js';

// 1. Busca (rota GET /aliexpress/produtos?keyword=mouse)
const buscaRaw = await chamarAliExpress('aliexpress.ds.text.search', { keyWord: 'mouse', ... });
const { produtos } = mapSearchResponse(buscaRaw);
// -> lista pro admin escolher o que importar

// 2. Ao clicar "Importar do AliExpress" com um externalId escolhido
const detalheRaw = await chamarAliExpress('aliexpress.ds.product.get', {
  product_id: produtoEscolhido.externalId,
  ship_to_country: 'BR',
  target_currency: 'BRL',
  target_language: 'pt',
});
const detalhe = mapProductDetail(detalheRaw);
const produtoParaSalvar = toHikariBluWaveProduct(detalhe, categoriaLocalId);

await ProdutoModel.create(produtoParaSalvar);

---------------------------------------------------------------------- */
