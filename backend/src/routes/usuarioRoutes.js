import { Router } from "express";

import {
  listarUsuarios,
  criarUsuario,
  login,
} from "../controllers/usuarioController.js";

import { auth } from "../middlewares/auth.js";
import { admin } from "../middlewares/admin.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários e autenticação JWT
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       401:
 *         description: Token inválido ou ausente
 *       403:
 *         description: Acesso negado
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Criar um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Jefferson
 *               email:
 *                 type: string
 *                 example: jeff@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *               cargo:
 *                 type: string
 *                 example: cliente
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: jeff@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso e retorna JWT
 *       401:
 *         description: E-mail ou senha inválidos
 */

router.get("/", auth, admin, listarUsuarios);

router.post("/", criarUsuario);

router.post("/login", login);

export default router;
