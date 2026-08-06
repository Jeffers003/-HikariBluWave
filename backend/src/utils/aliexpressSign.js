import crypto from "crypto";

export function gerarAssinatura(params, secret) {
  const keys = Object.keys(params)
    .filter(
      (key) =>
        key !== "sign" && params[key] !== undefined && params[key] !== null,
    )
    .sort();

  let signString = secret;

  for (const key of keys) {
    signString += key + params[key];
  }

  signString += secret;

  console.log("STRING ASSINADA:", signString);

  return crypto
    .createHash("sha256")
    .update(signString, "utf8")
    .digest("hex")
    .toUpperCase();
}
