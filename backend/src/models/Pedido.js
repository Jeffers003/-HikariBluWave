import mongoose from "mongoose";

const itemVendaSchema = new mongoose.Schema(
  {
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produto",
      required: true,
    },

    quantidade: {
      type: Number,
      required: true,
      min: 1,
    },

    precoUnitario: {
      type: Number,
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const vendaSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    itens: {
      type: [itemVendaSchema],
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pendente", "pago", "enviado", "entregue", "cancelado"],
      default: "pendente",
    },

    formaPagamento: {
      type: String,
      enum: ["pix", "cartao", "boleto"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Venda", vendaSchema);
