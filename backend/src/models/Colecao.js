import mongoose from "mongoose";

const colecaoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    descricao: {
      type: String,
    },

    imagem: {
      type: String,
      default: null,
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

export default mongoose.model("Colecao", colecaoSchema);
