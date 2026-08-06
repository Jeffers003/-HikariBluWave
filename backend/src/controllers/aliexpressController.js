import {
  buscarProdutoAliExpress,
  buscarCategoriasAliExpress,
  buscarProdutosAliExpress,
  importarCategoriasAliExpress,
} from "../services/aliexpressService.js";
import { gerarAccessToken } from "../services/aliexpressService.js";
export async function importarProduto(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        mensagem: "URL do AliExpress é obrigatória",
      });
    }

    const produto = await buscarProdutoAliExpress(url);

    res.json(produto);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao importar produto AliExpress",
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
      sucesso: false,
      mensagem: error.message,
    });
  }
}

export async function testarAliExpress(req, res) {
  try {
    const resultado = await buscarProdutosAliExpress();

    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
}

export function iniciarAuthAliExpress(req, res) {
  const authUrl =
    `https://api-sg.aliexpress.com/oauth/authorize` +
    `?response_type=code` +
    `&client_id=${process.env.ALIEXPRESS_APP_KEY}` +
    `&redirect_uri=${encodeURIComponent(process.env.ALIEXPRESS_CALLBACK_URL)}`;

  res.redirect(authUrl);
}

export async function callbackAliExpress(req, res) {
  try {
    const { code } = req.query;

    const token = await gerarAccessToken(code);

    res.json(token);
  } catch (error) {
    res.status(500).json({
      erro: error.response?.data || error.message,
    });
  }
}

export async function importarCategorias(req, res) {
  try {
    const categorias = await importarCategoriasAliExpress();

    res.json({
      sucesso: true,
      total: categorias.length,
      categorias,
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
