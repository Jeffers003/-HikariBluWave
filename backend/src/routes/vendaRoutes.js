import { Router } from "express";

import {
  criarVenda,
  listarVendas,
  atualizarVenda,
  deletarVenda,
} from "../controllers/vendaController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Vendas
 *   description: Gerenciamento de vendas mensais
 */

/**
 * @swagger
 * /vendas:
 *   get:
 *     summary: Lista todas as vendas
 *     tags: [Vendas]
 *     responses:
 *       200:
 *         description: Lista de vendas retornada com sucesso
 */

/**
 * @swagger
 * /vendas:
 *   post:
 *     summary: Criar uma nova venda
 *     tags: [Vendas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mes:
 *                 type: string
 *                 example: Julho
 *               ano:
 *                 type: number
 *                 example: 2026
 *               total:
 *                 type: number
 *                 example: 499.90
 *               quantidadePedidos:
 *                 type: number
 *                 example: 10
 *     responses:
 *       201:
 *         description: Venda criada com sucesso
 */

/**
 * @swagger
 * /vendas/{id}:
 *   put:
 *     summary: Atualizar venda
 *     tags: [Vendas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da venda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Venda atualizada com sucesso
 *       404:
 *         description: Venda não encontrada
 */

/**
 * @swagger
 * /vendas/{id}:
 *   delete:
 *     summary: Deletar venda
 *     tags: [Vendas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da venda
 *     responses:
 *       200:
 *         description: Venda removida com sucesso
 *       404:
 *         description: Venda não encontrada
 */

router.post("/", criarVenda);

router.get("/", listarVendas);

router.put("/:id", atualizarVenda);

router.delete("/:id", deletarVenda);

export default router;
