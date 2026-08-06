import express from "express";

import {
  listarAchadinhos,
  listarPorColecao,
  buscarAchadinho,
  criarAchadinho,
  atualizarAchadinho,
  excluirAchadinho,
} from "../controllers/achadinhoController.js";

import { auth } from "../middlewares/auth.js";
import { admin } from "../middlewares/admin.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", listarAchadinhos);

router.get("/colecao/:slug", listarPorColecao);

router.get("/:id", buscarAchadinho);

router.post("/", auth, admin, upload.single("imagem"), criarAchadinho);

router.put("/:id", auth, admin, upload.single("imagem"), atualizarAchadinho);

router.delete("/:id", auth, admin, excluirAchadinho);

export default router;
