// src/utils/aliexpressSign.js
import crypto from "crypto";

export function gerarAssinatura(params, secret, apiPath = "") {
  const keys = Object.keys(params)
    .filter((k) => k !== "sign")
    // espelha IopUtils.areNotEmpty() do SDK Java: pula chave/valor
    // nulo, undefined ou string vazia — senão a assinatura pode
    // divergir da calculada pelo servidor da AliExpress.
    .filter((k) => params[k] !== null && params[k] !== undefined && params[k] !== "")
    .sort();

  let signString = apiPath;

  for (const key of keys) {
    signString += key + params[key];
  }

  console.log("STRING ASSINATURA:");
  console.log(signString);

  return crypto
    .createHmac("sha256", secret)
    .update(signString, "utf8")
    .digest("hex")
    .toUpperCase();
}
