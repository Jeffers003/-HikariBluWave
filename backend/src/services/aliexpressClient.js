// src/services/aliexpressClient.js
import axios from "axios";
import qs from "qs";

import { obterAccessToken } from "./aliexpressToken.js"; // <- antes vinha de aliexpressService.js (circular)
import { gerarAssinatura } from "../utils/aliexpressSign.js";

const BASE_URL = "https://api-sg.aliexpress.com/sync";

export async function chamarAliExpress(method, params = {}) {
  console.log("METODO ALIEXPRESS:");
  console.log(method);

  console.log("PARAMETROS:");
  console.log(params);

  const token = await obterAccessToken();

  const request = {
    app_key: process.env.ALIEXPRESS_APP_KEY,
    method,
    session: token,
    timestamp: Date.now(),
    sign_method: "sha256",
    format: "json",
    v: "2.0",
    ...params,
  };

  // apiPath = "" é intencional aqui: o protocolo TOP (/sync) da AliExpress
  // assina a string vazia + parâmetros ordenados, já que "method" entra
  // como parâmetro comum e participa da concatenação. Diferente do
  // endpoint REST de token (/auth/token/security/create), que usa o
  // path como prefixo da assinatura — ver aliexpressService.js.
  request.sign = gerarAssinatura(request, process.env.ALIEXPRESS_APP_SECRET, "");

  console.log("ALI REQUEST:");
  console.log(request);

  const resposta = await axios.post(BASE_URL, qs.stringify(request), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  return resposta.data;
}
