import express from "express";

import {
  importarProduto,
  listarCategorias,
  iniciarAuthAliExpress,
  callbackAliExpress,
  listarProdutosAliExpress,
} from "../controllers/aliexpressController.js";

const router = express.Router();

router.post("/importar", importarProduto);

router.get("/teste", listarCategorias);

router.get("/auth", iniciarAuthAliExpress);

router.get("/callback", callbackAliExpress);

router.get("/produtos", listarProdutosAliExpress);

export default router;
