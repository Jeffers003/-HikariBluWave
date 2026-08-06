import { auth } from "../middlewares/auth.js";
import { admin } from "../middlewares/admin.js";

import { Router } from "express";
import { validarProduto } from "../middlewares/validarProduto.js";

import {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  excluirProduto,
} from "../controllers/produtoController.js";

import upload from "../middlewares/upload.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Buscar produto por ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Criar produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - preco
 *               - categoria
 *               - estoque
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Headset Hikari BluWave RGB
 *               descricao:
 *                 type: string
 *                 example: Headset gamer RGB
 *               preco:
 *                 type: number
 *                 example: 249.90
 *               categoria:
 *                 type: string
 *                 example: 6a6436ec9716502266c43bbf
 *               estoque:
 *                 type: number
 *                 example: 10
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualizar produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               estoque:
 *                 type: number
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 */

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Excluir produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 */

router.get("/", listarProdutos);

router.get("/:id", buscarProdutoPorId);

router.post(
  "/",
  auth,
  admin,
  upload.single("imagem"),
  validarProduto,
  criarProduto,
);

router.put(
  "/:id",
  auth,
  admin,
  upload.single("imagem"),
  validarProduto,
  atualizarProduto,
);

router.delete("/:id", auth, admin, excluirProduto);

export default router;
