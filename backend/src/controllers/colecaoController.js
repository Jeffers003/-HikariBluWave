import Colecao from "../models/Colecao.js";
import asyncHandler from "../utils/asyncHandler.js";

// LISTAR
export const listarColecoes = asyncHandler(async (req, res) => {
  const colecoes = await Colecao.find().sort({ createdAt: -1 });

  res.status(200).json(colecoes);
});

// BUSCAR POR ID
export const buscarColecao = asyncHandler(async (req, res) => {
  const colecao = await Colecao.findById(req.params.id);

  if (!colecao) {
    return res.status(404).json({
      mensagem: "Coleção não encontrada.",
    });
  }

  res.status(200).json(colecao);
});

// CRIAR
export const criarColecao = asyncHandler(async (req, res) => {
  const { nome, slug, descricao, ativo } = req.body;

  const imagem = req.file ? `/uploads/${req.file.filename}` : null;

  const novaColecao = await Colecao.create({
    nome,
    slug,
    descricao,
    ativo,
    imagem,
  });

  res.status(201).json(novaColecao);
});

// ATUALIZAR
export const atualizarColecao = asyncHandler(async (req, res) => {
  const dados = {
    ...req.body,
  };

  if (req.file) {
    dados.imagem = `/uploads/${req.file.filename}`;
  }

  const colecao = await Colecao.findByIdAndUpdate(req.params.id, dados, {
    new: true,
    runValidators: true,
  });

  if (!colecao) {
    return res.status(404).json({
      mensagem: "Coleção não encontrada.",
    });
  }

  res.status(200).json(colecao);
});

// EXCLUIR
export const excluirColecao = asyncHandler(async (req, res) => {
  const colecao = await Colecao.findById(req.params.id);

  if (!colecao) {
    return res.status(404).json({
      mensagem: "Coleção não encontrada.",
    });
  }

  await colecao.deleteOne();

  res.status(200).json({
    mensagem: "Coleção excluída com sucesso.",
  });
});
