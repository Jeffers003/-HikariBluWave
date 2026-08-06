import crypto from "crypto";

export function gerarAssinatura(params, secret) {
  const keys = Object.keys(params)
    .filter((key) => key !== "sign")
    .sort();

  let signString = "";

  for (const key of keys) {
    signString += key + params[key];
  }

  return crypto
    .createHmac("sha256", secret)
    .update(signString, "utf8")
    .digest("hex")
    .toUpperCase();
}
