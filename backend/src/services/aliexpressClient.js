import axios from "axios";
import aliexpressConfig from "../config/aliexpress.js";
import { gerarAssinatura } from "../utils/aliexpressSign.js";

const BASE_URL = "https://api-sg.aliexpress.com/sync";

export async function chamarAliExpress(method, params = {}) {
  const request = {
    app_key: aliexpressConfig.appKey,

    method,

    sign_method: "sha256",

    timestamp: Date.now(),

    format: "json",

    v: "2.0",

    ...params,
  };

  request.sign = gerarAssinatura(request, aliexpressConfig.appSecret);

  const response = await axios.post(BASE_URL, null, {
    params: request,
  });

  return response.data;
}
