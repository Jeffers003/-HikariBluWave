import { buscarProdutoAliExpress } from "../services/aliexpressService.js";

export async function importarProduto(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        mensagem: "URL do AliExpress é obrigatória",
      });
    }

    const produto = await buscarProdutoAliExpress(url);

    res.json(produto);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao importar produto AliExpress",
      erro: error.message,
    });
  }
}
