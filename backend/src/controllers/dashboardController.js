import Produto from "../models/Produto.js";
import Categoria from "../models/Categoria.js";
import Usuario from "../models/Usuario.js";
import Pedido from "../models/Pedido.js";
import asyncHandler from "../utils/asyncHandler.js";

// DASHBOARD GERAL
export const obterDashboard = asyncHandler(async (req, res) => {
  const totalProdutos = await Produto.countDocuments();

  const totalCategorias = await Categoria.countDocuments();

  const totalUsuarios = await Usuario.countDocuments();

  const totalPedidos = await Pedido.countDocuments();

  const pedidosPendentes = await Pedido.countDocuments({
    status: "pendente",
  });

  const produtosEstoqueBaixo = await Produto.find({
    estoque: { $lte: 5 },
  })
    .select("nome estoque imagem")
    .sort({ estoque: 1 });

  const pedidosPagos = await Pedido.find({
    status: {
      $in: ["pago", "enviado", "entregue"],
    },
  });

  const faturamentoTotal = pedidosPagos.reduce(
    (total, pedido) => total + pedido.total,
    0,
  );

  const ultimosPedidos = await Pedido.find()
    .sort({
      createdAt: -1,
    })
    .limit(5)
    .populate("cliente", "nome email");

  const produtosMaisVendidos = await Pedido.aggregate([
    {
      $match: {
        status: {
          $in: ["pago", "enviado", "entregue"],
        },
      },
    },

    {
      $unwind: "$itens",
    },

    {
      $group: {
        _id: "$itens.produto",

        quantidadeVendida: {
          $sum: "$itens.quantidade",
        },
      },
    },

    {
      $sort: {
        quantidadeVendida: -1,
      },
    },

    {
      $limit: 5,
    },

    {
      $lookup: {
        from: "produtos",
        localField: "_id",
        foreignField: "_id",
        as: "produto",
      },
    },

    {
      $unwind: "$produto",
    },

    {
      $project: {
        _id: 0,
        nome: "$produto.nome",
        imagem: "$produto.imagem",
        quantidadeVendida: 1,
      },
    },
  ]);

  res.status(200).json({
    resumo: {
      totalProdutos,
      totalCategorias,
      totalUsuarios,
      totalPedidos,
      pedidosPendentes,
      faturamentoTotal,
    },

    ultimosPedidos,

    produtosEstoqueBaixo,

    produtosMaisVendidos,
  });
});

// VENDAS MENSAIS
export const obterVendasMensais = asyncHandler(async (req, res) => {
  const vendasMensais = await Pedido.aggregate([
    {
      $match: {
        status: {
          $in: ["pago", "enviado", "entregue"],
        },
      },
    },

    {
      $group: {
        _id: {
          ano: {
            $year: "$createdAt",
          },

          mes: {
            $month: "$createdAt",
          },
        },

        total: {
          $sum: "$total",
        },

        pedidos: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        "_id.ano": 1,

        "_id.mes": 1,
      },
    },
  ]);

  res.status(200).json(vendasMensais);
});

// STATUS DOS PEDIDOS
export const obterStatusPedidos = asyncHandler(async (req, res) => {
  const statusPedidos = await Pedido.aggregate([
    {
      $group: {
        _id: "$status",

        quantidade: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        quantidade: -1,
      },
    },
  ]);

  res.status(200).json(statusPedidos);
});

// FORMAS DE PAGAMENTO
export const obterFormasPagamento = asyncHandler(async (req, res) => {
  const formasPagamento = await Pedido.aggregate([
    {
      $group: {
        _id: "$formaPagamento",

        quantidade: {
          $sum: 1,
        },

        total: {
          $sum: "$total",
        },
      },
    },

    {
      $sort: {
        quantidade: -1,
      },
    },
  ]);

  res.status(200).json(formasPagamento);
});
