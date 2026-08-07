import axios from "axios";
import aliexpressConfig from "../config/aliexpress.js";
import { gerarAssinatura } from "../utils/aliexpressSign.js";

const BASE_URL =
  "https://api-sg.aliexpress.com/rest/auth/token/security/create";

export async function chamarAliExpress(method, params = {}) {
  const request = {
    app_key: aliexpressConfig.appKey,
    method,
    sign_method: "sha256",
    timestamp: Math.floor(Date.now() / 1000),
    format: "json",
    v: "2.0",
    ...params,
  };

  request.sign = gerarAssinatura(request, aliexpressConfig.appSecret);

  const resposta = await axios.post(BASE_URL, qs.stringify(request), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  return resposta.data;
}
