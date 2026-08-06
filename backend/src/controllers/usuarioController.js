import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

// LISTAR USUÁRIOS
export const listarUsuarios = asyncHandler(async (req, res) => {
  const usuarios = await Usuario.find().select("-senha");

  res.status(200).json(usuarios);
});

// CRIAR USUÁRIO
export const criarUsuario = asyncHandler(async (req, res) => {
  const { nome, email, senha, cargo } = req.body;

  if (!nome || !email || !senha) {
    throw new AppError("Nome, e-mail e senha são obrigatórios.", 400);
  }

  const usuarioExistente = await Usuario.findOne({ email });

  if (usuarioExistente) {
    throw new AppError("Já existe um usuário com este e-mail.", 409);
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const usuario = await Usuario.create({
    nome,
    email,
    senha: senhaCriptografada,
    cargo: cargo || "cliente",
  });

  const resposta = usuario.toObject();
  delete resposta.senha;

  res.status(201).json({
    message: "Usuário criado com sucesso.",
    usuario: resposta,
  });
});

// LOGIN
export const login = asyncHandler(async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    throw new AppError("E-mail e senha são obrigatórios.", 400);
  }

  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    throw new AppError("E-mail ou senha inválidos.", 401);
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    throw new AppError("E-mail ou senha inválidos.", 401);
  }

  const token = jwt.sign(
    {
      id: usuario._id,
      cargo: usuario.cargo,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );

  res.status(200).json({
    message: "Login realizado com sucesso.",
    token,
    usuario: {
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      cargo: usuario.cargo,
    },
  });
});
