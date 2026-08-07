import axios from "axios";
import qs from "qs";

import { obterAccessToken } from "./aliexpressService.js";
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

  request.sign = gerarAssinatura(
    request,
    process.env.ALIEXPRESS_APP_SECRET,
    "",
  );

  console.log("ALI REQUEST:");
  console.log(request);

  const resposta = await axios.post(BASE_URL, qs.stringify(request), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  return resposta.data;
}
