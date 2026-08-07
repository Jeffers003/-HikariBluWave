import {
  buscarProdutoAliExpress,
  buscarCategoriasAliExpress,
  buscarProdutosAliExpress,
  gerarAccessToken,
} from "../services/aliexpressService.js";
import AliExpressToken from "../models/AliExpressToken.js";

export async function importarProduto(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        mensagem: "URL obrigatória",
      });
    }

    const produto = await buscarProdutoAliExpress(url);

    res.json(produto);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
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
      erro: error,
    });
  }
}

export async function listarProdutosAliExpress(req, res) {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({
        mensagem: "Informe uma palavra-chave",
      });
    }

    const produtos = await buscarProdutosAliExpress(keyword);

    res.json(produtos);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
}
