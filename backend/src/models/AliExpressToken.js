// src/services/aliexpressToken.js
//
// Extraído de aliexpressService.js para quebrar a dependência circular:
// antes, aliexpressService.js <-> aliexpressClient.js se importavam
// mutuamente. Agora os dois importam apenas daqui.

import AliExpressToken from "./aliexpressToken.js";

export async function obterAccessToken() {
  const token = await AliExpressToken.findOne();

  if (!token) {
    throw new Error("Nenhum token do AliExpress encontrado.");
  }

  // TODO: checar token.expireTime aqui e renovar automaticamente
  // com refresh_token quando estiver perto de expirar. Por enquanto
  // isso não existe e a chamada vai falhar com token expirado depois
  // do tempo de expires_in.

  return token.accessToken;
}
