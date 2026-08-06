import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },

    descricao: {
      type: String,
      required: true,
    },

    preco: {
      type: Number,
      required: true,
    },

    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
    },

    imagem: {
      type: String,
      required: true,
    },

    estoque: {
      type: Number,
      default: 0,
    },

    ativo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Produto", produtoSchema);
