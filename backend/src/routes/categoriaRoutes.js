import { Router } from "express";

import {
  listarCategorias,
  listarCategoriasPublicas,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria,
} from "../controllers/categoriaController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias de produtos
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 */

/**
 * @swagger
 * /categorias/publicas:
 *   get:
 *     summary: Lista todas as categorias públicas
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias públicas retornada com sucesso
 */

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Criar uma categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Periféricos
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 */

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Atualizar categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Placas de Vídeo
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Deletar categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Categoria removida com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
router.get("/publicas", listarCategoriasPublicas);

router.get("/", listarCategorias);

router.post("/", criarCategoria);

router.put("/:id", atualizarCategoria);

router.delete("/:id", deletarCategoria);

export default router;
