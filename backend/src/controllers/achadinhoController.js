import Achadinho from "../models/Achadinho.js";
import asyncHandler from "../utils/asyncHandler.js";

// LISTAR
export const listarAchadinhos = asyncHandler(async (req, res) => {
  const { categoria } = req.query;

  const filtro = {};
  if (categoria) {
    filtro.categoria = categoria;
  }

  const achadinhos = await Achadinho.find(filtro)
    .populate("categoria", "nome")
    .sort({ createdAt: -1 });

  res.status(200).json(achadinhos);
});

// BUSCAR POR ID
export const buscarAchadinho = asyncHandler(async (req, res) => {
  const achadinho = await Achadinho.findById(req.params.id).populate(
    "categoria",
    "nome",
  );

  if (!achadinho) {
    return res.status(404).json({
      mensagem: "Achadinho não encontrado.",
    });
  }

  res.status(200).json(achadinho);
});
// Listar po colecao
export const listarPorColecao = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const produtos = await Achadinho.find({
    ativo: true,
    colecoes: slug,
  }).populate("categoria", "nome");

  res.status(200).json(produtos);
});
// CRIAR
export const criarAchadinho = asyncHandler(async (req, res) => {
  const {
    titulo,
    descricao,
    preco,
    precoAntigo,
    marketplace,
    linkAfiliado,
    categoria,
    destaque,
    ativo,
  } = req.body;

  const imagem = req.file ? `/uploads/${req.file.filename}` : null;
  const tags = req.body.tags ? JSON.parse(req.body.tags) : [];

  const colecoes = req.body.colecoes ? JSON.parse(req.body.colecoes) : [];
  const novoAchadinho = await Achadinho.create({
    titulo,
    descricao,
    preco,
    precoAntigo,
    marketplace,
    linkAfiliado,
    categoria,
    tags,
    colecoes,
    destaque,
    ativo,
    imagem,
  });

  res.status(201).json(novoAchadinho);
});

// ATUALIZAR
export const atualizarAchadinho = asyncHandler(async (req, res) => {
  const dados = {
    ...req.body,
  };

  if (req.body.tags) {
    dados.tags = JSON.parse(req.body.tags);
  }

  if (req.body.colecoes) {
    dados.colecoes = JSON.parse(req.body.colecoes);
  }

  if (req.file) {
    dados.imagem = `/uploads/${req.file.filename}`;
  }

  const achadinho = await Achadinho.findByIdAndUpdate(req.params.id, dados, {
    new: true,
    runValidators: true,
  });

  if (!achadinho) {
    return res.status(404).json({
      mensagem: "Achadinho não encontrado.",
    });
  }

  res.status(200).json(achadinho);
});

// EXCLUIR
export const excluirAchadinho = asyncHandler(async (req, res) => {
  const achadinho = await Achadinho.findById(req.params.id);

  if (!achadinho) {
    return res.status(404).json({
      mensagem: "Achadinho não encontrado.",
    });
  }

  await achadinho.deleteOne();

  res.status(200).json({
    mensagem: "Achadinho excluído com sucesso.",
  });
});
