import express from "express";

import {
  importarProduto,
  listarCategorias,
  iniciarAuthAliExpress,
  callbackAliExpress,
  importarCategorias,
  listarProdutosAliExpress,
} from "../controllers/aliexpressController.js";

const router = express.Router();

router.post("/importar", importarProduto);

router.get("/teste", listarCategorias);

router.get("/auth", iniciarAuthAliExpress);

router.get("/produtos", listarProdutosAliExpress);

router.get("/callback", callbackAliExpress);

router.get("/importar-categorias", importarCategorias);

export default router;
