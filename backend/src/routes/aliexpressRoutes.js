import express from "express";

import {
  importarProduto,
  listarCategorias,
  iniciarAuthAliExpress,
  callbackAliExpress,
} from "../controllers/aliexpressController.js";

const router = express.Router();

router.post("/importar", importarProduto);

router.get("/teste", listarCategorias);

router.get("/auth", iniciarAuthAliExpress);

router.get("/produtos", listarProdutosAliExpress);

router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        mensagem: "Código de autorização é obrigatório",
      });
    }

    const token = await gerarAccessToken(code);

    res.json(token);
  } catch (error) {
    res.status(500).json({
      erro: error.response?.data || error.message,
    });
  }
});

export default router;
