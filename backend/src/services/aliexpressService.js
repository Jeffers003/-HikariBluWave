import aliexpressConfig from "../config/aliexpress.js";

export async function buscarProdutoAliExpress(url) {
  try {
    console.log("Buscando produto AliExpress:", url);

    return {
      sucesso: true,
      mensagem: "Serviço AliExpress conectado",
      url,
      config: {
        possuiAppKey: !!aliexpressConfig.appKey,
      },
    };
  } catch (error) {
    console.error("Erro AliExpress:", error.message);

    throw error;
  }
}
