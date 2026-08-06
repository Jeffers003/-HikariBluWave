import { Router } from "express";

import {
  obterDashboard,
  obterVendasMensais,
  obterStatusPedidos,
  obterFormasPagamento,
} from "../controllers/dashboardController.js";

import { auth } from "../middlewares/auth.js";
import { admin } from "../middlewares/admin.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Indicadores e métricas administrativas
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Retorna resumo geral do dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados gerais do dashboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalProdutos:
 *                   type: number
 *                   example: 10
 *                 totalCategorias:
 *                   type: number
 *                   example: 5
 *                 totalUsuarios:
 *                   type: number
 *                   example: 20
 *                 totalPedidos:
 *                   type: number
 *                   example: 50
 *                 faturamentoTotal:
 *                   type: number
 *                   example: 4999.90
 *       401:
 *         description: Token inválido ou ausente
 *       403:
 *         description: Acesso permitido apenas para administradores
 */

/**
 * @swagger
 * /dashboard/vendas-mensais:
 *   get:
 *     summary: Retorna vendas agrupadas por mês
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vendas mensais
 *       401:
 *         description: Token inválido ou ausente
 *       403:
 *         description: Acesso permitido apenas para administradores
 */

/**
 * @swagger
 * /dashboard/status-pedidos:
 *   get:
 *     summary: Retorna quantidade de pedidos por status
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Status dos pedidos
 *       401:
 *         description: Token inválido ou ausente
 *       403:
 *         description: Acesso permitido apenas para administradores
 */

/**
 * @swagger
 * /dashboard/formas-pagamento:
 *   get:
 *     summary: Retorna estatísticas das formas de pagamento
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Formas de pagamento utilizadas
 *       401:
 *         description: Token inválido ou ausente
 *       403:
 *         description: Acesso permitido apenas para administradores
 */

router.get("/", auth, admin, obterDashboard);

router.get("/vendas-mensais", auth, admin, obterVendasMensais);

router.get("/status-pedidos", auth, admin, obterStatusPedidos);

router.get("/formas-pagamento", auth, admin, obterFormasPagamento);

export default router;
