import express from "express";

import {
  listarColecoes,
  buscarColecao,
  criarColecao,
  atualizarColecao,
  excluirColecao,
} from "../controllers/colecaoController.js";

import { auth } from "../middlewares/auth.js";
import { admin } from "../middlewares/admin.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", listarColecoes);

router.get("/:id", buscarColecao);

router.post("/", auth, admin, upload.single("imagem"), criarColecao);

router.put("/:id", auth, admin, upload.single("imagem"), atualizarColecao);

router.delete("/:id", auth, admin, excluirColecao);

export default router;
