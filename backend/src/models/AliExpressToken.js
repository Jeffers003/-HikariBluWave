// src/services/aliexpressToken.js
import AliExpressToken from "../models/AliExpressToken.js";

export async function obterAccessToken() {
  const token = await AliExpressToken.findOne();

  if (!token) {
    throw new Error("Nenhum token do AliExpress encontrado.");
  }

  return token.accessToken;
}
