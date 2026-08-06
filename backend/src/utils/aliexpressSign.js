import crypto from "crypto";

export function gerarAssinatura(params, secret, api = "") {
  const keys = Object.keys(params)
    .filter((key) => key !== "sign")
    .sort();

  let parametersString = "";

  for (const key of keys) {
    parametersString += key + params[key];
  }

  if (api.includes("/")) {
    parametersString = api + parametersString;
  }

  return crypto
    .createHmac("sha256", secret)
    .update(parametersString, "utf8")
    .digest("hex")
    .toUpperCase();
}
