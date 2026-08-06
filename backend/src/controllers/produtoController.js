import mongoose from "mongoose";
import Produto from "../models/Produto.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

// LISTAR PRODUTOS
export const listarProdutos = asyncHandler(async (req, res) => {
  const {
    categoria,
    nome,
    page = 1,
    limit = 10,
    sort = "createdAt",
  } = req.query;

  const filtro = {};

  if (categoria) {
    filtro.categoria = categoria;
  }

  if (nome) {
    filtro.nome = {
      $regex: nome,
      $options: "i",
    };
  }

  const pagina = parseInt(page);
  const limite = parseInt(limit);

  const totalProdutos = await Produto.countDocuments(filtro);

  const produtos = await Produto.find(filtro)
    .populate("categoria")
    .sort(sort)
    .skip((pagina - 1) * limite)
    .limit(limite);

  res.status(200).json({
    page: pagina,
    limit: limite,
    totalProdutos,
    totalPages: Math.ceil(totalProdutos / limite),
    produtos,
  });
});

// CRIAR PRODUTO
export const criarProduto = asyncHandler(async (req, res) => {
  const produto = await Produto.create({
    nome: req.body.nome,
    descricao: req.body.descricao,
    preco: Number(req.body.preco),
    categoria: req.body.categoria,
    estoque: Number(req.body.estoque),
    ativo: req.body.ativo === "true",
    imagem: req.file ? `/uploads/${req.file.filename}` : null,
  });

  res.status(201).json({
    message: "Produto criado com sucesso.",
    produto,
  });
});

// ATUALIZAR PRODUTO
export const atualizarProduto = async (req, res) => {
  try {
    const dadosAtualizados = {
      ...req.body,
    };

    if (req.file) {
      dadosAtualizados.imagem = `/uploads/${req.file.filename}`;
    }

    const produto = await Produto.findByIdAndUpdate(
      req.params.id,
      dadosAtualizados,
      {
        new: true,
      },
    );

    if (!produto) {
      return res.status(404).json({
        mensagem: "Produto não encontrado",
      });
    }

    res.json(produto);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensagem: "Erro ao atualizar produto",
    });
  }
};

// EXCLUIR PRODUTO
export const excluirProduto = asyncHandler(async (req, res) => {
  const produto = await Produto.findByIdAndDelete(req.params.id);

  if (!produto) {
    throw new AppError("Produto não encontrado.", 404);
  }

  res.status(200).json({
    message: "Produto removido com sucesso.",
  });
});

// BUSCAR PRODUTO POR ID
export const buscarProdutoPorId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("ID do produto inválido.", 400);
  }

  const produto = await Produto.findById(id).populate("categoria");

  if (!produto) {
    throw new AppError("Produto não encontrado.", 404);
  }

  res.status(200).json(produto);
});
