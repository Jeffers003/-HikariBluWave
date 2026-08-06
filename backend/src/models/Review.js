import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },

    cargo: {
      type: String,
      default: "",
      trim: true,
    },

    comentario: {
      type: String,
      required: true,
      trim: true,
    },

    nota: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },

    avatar: {
      type: String,
      default: null,
    },

    ativo: {
      type: Boolean,
      default: true,
    },

    destaque: {
      type: Boolean,
      default: false,
    },

    ordem: {
      type: Number,
      default: 0,
    },
    origem: {
      type: String,
      enum: ["manual", "cliente"],
      default: "manual",
    },

    aprovado: {
      type: Boolean,
      default: true, // reviews do admin já nascem aprovados
    },

    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      default: null,
    },

    pedido: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pedido",
      default: null,
    },

    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produto",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Review", reviewSchema);
