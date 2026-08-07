import crypto from "crypto";

export function gerarAssinatura(params, secret, apiPath = "") {
  const keys = Object.keys(params).sort();

  let signString = "";

  for (const key of keys) {
    signString += key + params[key];
  }

  signString = apiPath + signString;

  return crypto
    .createHmac("sha256", secret)
    .update(signString, "utf8")
    .digest("hex")
    .toUpperCase();
}
