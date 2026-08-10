// src/controllers/aliexpressController.js
import {
  buscarProdutoAliExpress,
  buscarCategoriasAliExpress,
  buscarProdutosAliExpress,
  buscarFreteAliExpress,
  gerarAccessToken,
} from "../services/aliexpressService.js";
import AliExpressToken from "../models/AliExpressToken.js";
import {
  mapProductDetail,
  toHikariBluWaveProduct,
  mapFreightResponse,
  mapSearchResponse,
} from "../mappers/AliExpressProductMapper.js"; // ajuste o caminho se salvou em outro lugar
import ProdutoModel from "../models/Produto.js"; // ajuste pro nome/caminho real do seu model

export async function importarProduto(req, res) {
  try {
    const { url, categoriaId = null } = req.body;

    if (!url) {
      return res.status(400).json({
        mensagem: "URL obrigatória",
      });
    }

    const raw = await buscarProdutoAliExpress(url);
    const detalhe = mapProductDetail(raw);
    const produto = toHikariBluWaveProduct(detalhe, categoriaId);

    const existente = await ProdutoModel.findOne({
      productIdExterno: detalhe.externalId,
    });

    let salvo;
    if (existente) {
      Object.assign(existente, produto);
      salvo = await existente.save();
    } else {
      salvo = await ProdutoModel.create(produto);
    }

    res.json({ sucesso: true, mensagem: "Produto importado com sucesso.", produto: salvo });
  } catch (error) {
    console.error("[aliexpress] erro ao importar produto:", error?.response?.data || error.message);
    res.status(500).json({
      erro: error?.response?.data || error.message,
    });
  }
}

export async function listarCategorias(req, res) {
  try {
    const resultado = await buscarCategoriasAliExpress();

    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
}

export function iniciarAuthAliExpress(req, res) {
  const url =
    `https://api-sg.aliexpress.com/oauth/authorize` +
    `?response_type=code` +
    `&client_id=${process.env.ALIEXPRESS_APP_KEY}` +
    `&redirect_uri=${encodeURIComponent(process.env.ALIEXPRESS_CALLBACK_URL)}`;

  res.redirect(url);
}

export async function callbackAliExpress(req, res) {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        erro: "code ausente",
      });
    }

    const token = await gerarAccessToken(code);

    await AliExpressToken.findOneAndUpdate(
      {},
      {
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
        expireTime: token.expire_time,
        refreshExpireTime: token.refresh_token_valid_time,
        sellerId: token.seller_id,
        userId: token.user_id,
        locale: token.locale,
        sp: token.sp,
      },
      {
        upsert: true,
        new: true,
      },
    );

    res.json({
      sucesso: true,
      mensagem: "Token salvo com sucesso.",
    });
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
}

export async function listarProdutosAliExpress(req, res) {
  try {
    const { keyword } = req.query;

    const raw = await buscarProdutosAliExpress(keyword);
    const resultado = mapSearchResponse(raw);

    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
}

/**
 * GET /aliexpress/frete?productId=123&skuId=456&quantity=1
 */
export async function consultarFreteAliExpress(req, res) {
  try {
    const { productId, skuId, quantity = 1 } = req.query;

    if (!productId || !skuId) {
      return res.status(400).json({
        erro: "productId e skuId são obrigatórios.",
      });
    }

    const raw = await buscarFreteAliExpress(productId, skuId, Number(quantity));
    const opcoes = mapFreightResponse(raw);

    res.json({ sucesso: true, opcoes });
  } catch (error) {
    console.error("[aliexpress] erro ao consultar frete:", error?.response?.data || error.message);
    res.status(500).json({
      erro: error?.response?.data || error.message,
    });
  }
}
