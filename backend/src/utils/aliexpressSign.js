import crypto from "crypto";

export function gerarAssinatura(params, secret, apiPath = "") {
  const keys = Object.keys(params)
    .filter((k) => k !== "sign")
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
