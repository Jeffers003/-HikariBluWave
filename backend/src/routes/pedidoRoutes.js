import { Router } from "express";
import { admin } from "../middlewares/admin.js";
import {
  criarPedido,
  listarPedidos,
  buscarPedidoPorId,
  atualizarStatusPedido,
} from "../controllers/pedidoController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gerenciamento de pedidos
 */

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Lista pedidos do usuário autenticado
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *       401:
 *         description: Token inválido ou ausente
 */

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itens:
 *                 type: array
 *                 example:
 *                   - produto: 6a6436ec9716502266c43bbf
 *                     quantidade: 2
 *               formaPagamento:
 *                 type: string
 *                 example: pix
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Buscar pedido por ID
 *     tags: [Pedidos]
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
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */

/**
 * @swagger
 * /pedidos/{id}/status:
 *   put:
 *     summary: Atualizar status do pedido
 *     tags: [Pedidos]
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: pago
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 */

router.get("/", auth, listarPedidos);

router.post("/", auth, criarPedido);

router.get("/:id", auth, buscarPedidoPorId);

router.put("/:id/status", auth, admin, atualizarStatusPedido);

export default router;
