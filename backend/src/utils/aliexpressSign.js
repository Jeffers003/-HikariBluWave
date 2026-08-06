import crypto from "crypto";

export function gerarAssinatura(params, secret) {
  const keys = Object.keys(params)
    .filter((key) => key !== "sign")
    .sort();

  let signString = secret;

  for (const key of keys) {
    if (params[key] !== undefined && params[key] !== null) {
      signString += key + params[key];
    }
  }

  signString += secret;

  return crypto
    .createHash("sha256")
    .update(signString, "utf8")
    .digest("hex")
    .toUpperCase();
}
