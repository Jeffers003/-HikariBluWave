import axios from "axios";
import qs from "qs";

import { chamarAliExpress } from "./aliexpressClient.js";
import { gerarAssinatura } from "../utils/aliexpressSign.js";

const TOKEN_URL =
  "https://api-sg.aliexpress.com/rest/auth/token/security/create";

export async function gerarAccessToken(code) {
  try {
    const params = {
      app_key: process.env.ALIEXPRESS_APP_KEY,

      code,

      timestamp: Date.now(),

      sign_method: "sha256",
    };

    params.sign = gerarAssinatura(params, process.env.ALIEXPRESS_APP_SECRET);

    const resposta = await axios.post(TOKEN_URL, qs.stringify(params), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    return resposta.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function buscarCategoriasAliExpress() {
  return chamarAliExpress("aliexpress.ds.category.get");
}

export async function buscarProdutosAliExpress(keyword) {
  return chamarAliExpress("aliexpress.ds.product.get", {
    keywords: keyword,
    page_no: 1,
    page_size: 20,
  });
}

export async function buscarProdutoAliExpress(url) {
  return {
    sucesso: true,

    url,
  };
}
