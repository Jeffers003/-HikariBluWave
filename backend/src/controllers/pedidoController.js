import mongoose from "mongoose";
import Pedido from "../models/Pedido.js";
import Produto from "../models/Produto.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

// LISTAR PEDIDOS
export const listarPedidos = asyncHandler(async (req, res) => {
  const usuario = req.usuario;

  let pedidos;

  if (usuario.cargo === "admin") {
    pedidos = await Pedido.find()
      .populate("cliente", "-senha")
      .populate("itens.produto");
  } else {
    pedidos = await Pedido.find({
      cliente: usuario.id,
    }).populate("itens.produto");
  }

  res.status(200).json(pedidos);
});

// CRIAR PEDIDO
export const criarPedido = asyncHandler(async (req, res) => {
  const { itens, formaPagamento } = req.body;

  const cliente = req.usuario.id;

  if (!itens || itens.length === 0) {
    throw new AppError("O pedido precisa ter produtos.", 400);
  }

  let itensPedido = [];
  let total = 0;

  for (const item of itens) {
    if (!mongoose.Types.ObjectId.isValid(item.produto)) {
      throw new AppError("ID do produto inválido.", 400);
    }

    if (!item.quantidade || item.quantidade < 1) {
      throw new AppError("Quantidade inválida.", 400);
    }

    const produto = await Produto.findById(item.produto);

    if (!produto) {
      throw new AppError("Produto não encontrado.", 404);
    }

    if (produto.estoque < item.quantidade) {
      throw new AppError(
        `Estoque insuficiente para ${produto.nome}. Estoque disponível: ${produto.estoque}`,
        400,
      );
    }

    const subtotal = produto.preco * item.quantidade;

    itensPedido.push({
      produto: produto._id,
      quantidade: item.quantidade,
      precoUnitario: produto.preco,
      subtotal,
    });

    total += subtotal;

    produto.estoque -= item.quantidade;

    await produto.save();
  }

  const pedido = await Pedido.create({
    cliente,
    itens: itensPedido,
    total,
    formaPagamento,
  });

  res.status(201).json({
    message: "Pedido criado com sucesso.",
    pedido,
  });
});

// BUSCAR PEDIDO POR ID
export const buscarPedidoPorId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("ID do pedido inválido.", 400);
  }

  const pedido = await Pedido.findById(id)
    .populate("cliente", "-senha")
    .populate("itens.produto");

  if (!pedido) {
    throw new AppError("Pedido não encontrado.", 404);
  }

  if (
    req.usuario.cargo !== "admin" &&
    pedido.cliente._id.toString() !== req.usuario.id
  ) {
    throw new AppError("Você não tem permissão para acessar este pedido.", 403);
  }

  res.status(200).json(pedido);
});

// ATUALIZAR STATUS DO PEDIDO
export const atualizarStatusPedido = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const statusPermitidos = [
    "pendente",
    "pago",
    "enviado",
    "entregue",
    "cancelado",
  ];

  if (!statusPermitidos.includes(status)) {
    throw new AppError("Status inválido.", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("ID do pedido inválido.", 400);
  }

  const pedido = await Pedido.findById(id);

  if (!pedido) {
    throw new AppError("Pedido não encontrado.", 404);
  }

  // devolve estoque caso seja cancelado
  if (status === "cancelado" && pedido.status !== "cancelado") {
    for (const item of pedido.itens) {
      const produto = await Produto.findById(item.produto);

      if (produto) {
        produto.estoque += item.quantidade;

        await produto.save();
      }
    }
  }

  pedido.status = status;

  await pedido.save();

  res.status(200).json({
    message: "Status atualizado com sucesso.",
    pedido,
  });
});
