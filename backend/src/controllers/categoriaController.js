import Categoria from "../models/Categoria.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import slugify from "slugify";
// LISTAR CATEGORIAS
export const listarCategorias = asyncHandler(async (req, res) => {
  const categorias = await Categoria.find().sort({
    ordem: 1,
  });

  res.status(200).json(categorias);
});

// LISTAR CATEGORIAS PÚBLICAS
export const listarCategoriasPublicas = asyncHandler(async (req, res) => {
  const categorias = await Categoria.find({
    ativo: true,
  }).sort({
    ordem: 1,
  });

  res.status(200).json(categorias);
});

// CRIAR CATEGORIA
export const criarCategoria = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.nome, {
    lower: true,
    strict: true,
  });

  const categoriaExistente = await Categoria.findOne({
    slug: req.body.slug,
  });

  if (categoriaExistente) {
    throw new AppError("Já existe uma categoria com esse nome.", 400);
  }

  const categoria = await Categoria.create(req.body);

  res.status(201).json({
    message: "Categoria criada com sucesso.",
    categoria,
  });
});

// ATUALIZAR CATEGORIA
export const atualizarCategoria = asyncHandler(async (req, res) => {
  if (req.body.nome) {
    req.body.slug = slugify(req.body.nome, {
      lower: true,
      strict: true,
    });
  }

  const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!categoria) {
    throw new AppError("Categoria não encontrada.", 404);
  }

  res.status(200).json({
    message: "Categoria atualizada com sucesso.",
    categoria,
  });
});

// DELETAR CATEGORIA
export const deletarCategoria = asyncHandler(async (req, res) => {
  const categoria = await Categoria.findByIdAndDelete(req.params.id);

  if (!categoria) {
    throw new AppError("Categoria não encontrada.", 404);
  }

  res.status(200).json({
    message: "Categoria removida com sucesso.",
  });
});
