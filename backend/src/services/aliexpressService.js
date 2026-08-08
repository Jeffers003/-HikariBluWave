// src/services/aliexpressService.js
import axios from "axios";
import qs from "qs";

import { chamarAliExpress } from "./aliexpressClient.js";
import { obterAccessToken } from "./aliexpressToken.js"; // re-exportado abaixo por compatibilidade
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

  const resposta = await axios.post(TOKEN_URL, qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  return resposta.data;
}

// Re-exportado aqui só pra não quebrar quem já importa obterAccessToken
// a partir de aliexpressService.js em outro lugar do projeto.
// A fonte real agora é aliexpressToken.js (ver esse arquivo).
export { obterAccessToken };

export async function buscarCategoriasAliExpress() {
  return chamarAliExpress("aliexpress.ds.category.get");
}

export async function buscarProdutosAliExpress(keyword) {
  return chamarAliExpress("aliexpress.ds.text.search", {
    keyWord: keyword,
    countryCode: "BR",
    currency: "BRL",
    local: "pt_BR",
    pageIndex: 1,
    pageSize: 20,
  });
}

export async function buscarDetalheProdutoAliExpress(productId) {
  return chamarAliExpress("aliexpress.ds.product.get", {
    product_id: productId,
    ship_to_country: "BR",
    target_currency: "BRL",
    target_language: "pt",
  });
}

/**
 * Extrai o product_id numérico de uma URL de produto da AliExpress.
 * Aceita formatos como:
 *   https://www.aliexpress.com/item/1005010517074712.html
 *   https://pt.aliexpress.com/item/1005010517074712.html?spm=...
 *   //www.aliexpress.com/item/1005010517074712.html?skuId=...
 */
export function extrairProductIdDaUrl(url) {
  const match = url.match(/\/item\/(\d+)\.html/);
  if (!match) {
    throw new Error(`Não foi possível extrair o product_id da URL: ${url}`);
  }
  return match[1];
}

export async function buscarProdutoAliExpress(url) {
  const productId = extrairProductIdDaUrl(url);
  return buscarDetalheProdutoAliExpress(productId);
}

/**
 * Consulta o frete real (aliexpress.ds.freight.query) — diferente do
 * ds.product.get, que só devolve prazo estimado, sem valor de envio.
 * @param {string} productId
 * @param {string} skuId - obrigatório, cada variação pode ter frete diferente
 * @param {number} quantity
 */
export async function buscarFreteAliExpress(productId, skuId, quantity = 1) {
  const queryDeliveryReq = {
    productId,
    selectedSkuId: skuId,
    quantity,
    shipToCountry: "BR",
    currency: "BRL",
    language: "pt",
    locale: "pt_BR",
  };

  return chamarAliExpress("aliexpress.ds.freight.query", {
    queryDeliveryReq: JSON.stringify(queryDeliveryReq),
  });
}
