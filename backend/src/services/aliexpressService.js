import axios from "axios";
import qs from "qs";

import { chamarAliExpress } from "./aliexpressClient.js";
import { gerarAssinatura } from "../utils/aliexpressSign.js";
import AliExpressToken from "../models/AliExpressToken.js";

const TOKEN_URL =
  "https://api-sg.aliexpress.com/rest/auth/token/security/create";

export async function gerarAccessToken(code) {
  const params = {
    app_key: process.env.ALIEXPRESS_APP_KEY,

    code: code,

    timestamp: Date.now(),

    sign_method: "sha256",
  };

  params.sign = gerarAssinatura(
    params,
    process.env.ALIEXPRESS_APP_SECRET,
    "/auth/token/security/create",
  );
  console.log("PARAMS TOKEN:");
  console.log(params);
  console.log({
    app_key: params.app_key,
    code: params.code,
    timestamp: params.timestamp,
    sign_method: params.sign_method,
    sign: params.sign,
  });
  console.log("SECRET LENGTH:", process.env.ALIEXPRESS_APP_SECRET.length);
  const resposta = await axios.post(
    "https://api-sg.aliexpress.com/rest/auth/token/security/create",

    qs.stringify(params),

    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    },
  );

  return resposta.data;
}

export async function obterAccessToken() {
  const token = await AliExpressToken.findOne();

  if (!token) {
    throw new Error("Nenhum token do AliExpress encontrado.");
  }

  return token.accessToken;
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
