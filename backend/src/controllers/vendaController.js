import VendaMensal from "../models/VendaMensal.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

// CREATE
export const criarVenda = asyncHandler(async (req, res) => {
  const novaVendaMensal = await VendaMensal.create(req.body);

  res.status(201).json({
    message: "Venda mensal criada com sucesso.",
    venda: novaVendaMensal,
  });
});

// READ
export const listarVendas = asyncHandler(async (req, res) => {
  const vendasMensais = await VendaMensal.find();

  res.status(200).json(vendasMensais);
});

// UPDATE
export const atualizarVenda = asyncHandler(async (req, res) => {
  const vendaAtualizada = await VendaMensal.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!vendaAtualizada) {
    throw new AppError("Venda mensal não encontrada.", 404);
  }

  res.status(200).json({
    message: "Venda mensal atualizada com sucesso.",
    venda: vendaAtualizada,
  });
});

// DELETE
export const deletarVenda = asyncHandler(async (req, res) => {
  const vendaExcluida = await VendaMensal.findByIdAndDelete(req.params.id);

  if (!vendaExcluida) {
    throw new AppError("Venda mensal não encontrada.", 404);
  }

  res.status(200).json({
    message: "Venda mensal excluída com sucesso.",
  });
});
