import crypto from "crypto";

export function gerarAssinatura(params, secret) {
  const keys = Object.keys(params).sort();

  let signString = secret;

  for (const key of keys) {
    if (params[key] !== undefined && params[key] !== null) {
      signString += key + params[key];
    }
  }

  signString += secret;

  return crypto
    .createHash("md5")
    .update(signString, "utf8")
    .digest("hex")
    .toUpperCase();
}
