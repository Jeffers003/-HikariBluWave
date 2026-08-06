import { chamarAliExpress } from "./aliexpressClient.js";
export async function buscarCategoriasAliExpress() {
  return await chamarAliExpress("aliexpress.ds.category.get");
}
export async function buscarProdutoAliExpress(url) {
  return {
    sucesso: true,
    mensagem: "Produto recebido",
    url,
  };
}

export async function buscarProdutosAliExpress(keyword) {
  return await chamarAliExpress("aliexpress.ds.product.get", {
    keywords: keyword,
    page_no: 1,
    page_size: 20,
  });
}

export async function importarCategoriasAliExpress() {
  const resposta = await buscarCategoriasAliExpress();

  const categorias =
    resposta.aliexpress_ds_category_get_response.resp_result.result.categories
      .category;

  return categorias.map((categoria) => ({
    nome: categoria.category_name,

    slug: categoria.category_name.toLowerCase().replace(/\s+/g, "-"),

    descricao: "Categoria importada do AliExpress",

    ativo: true,

    origem: "AliExpress",

    externalId: categoria.category_id,
  }));
}
export async function gerarAccessToken(code) {
  const resposta = await chamarAliExpress("aliexpress.oauth.token.create", {
    code,
  });

  return resposta;
}
