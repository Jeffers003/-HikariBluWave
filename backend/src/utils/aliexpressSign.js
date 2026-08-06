import crypto from "crypto";

export function gerarAssinatura(params, secret, api) {
  const keys = Object.keys(params).sort();

  let signString = "";

  for (const key of keys) {
    signString += key + params[key];
  }

  if (api.includes("/")) {
    signString = api + signString;
  }

  return crypto
    .createHmac("sha256", secret)
    .update(signString, "utf8")
    .digest("hex")
    .toUpperCase();
}
