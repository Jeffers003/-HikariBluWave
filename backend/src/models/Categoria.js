import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    descricao: {
      type: String,
      default: "",
      trim: true,
    },

    imagem: {
      type: String,
      default: "",
    },

    ordem: {
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

export default mongoose.model("Categoria", categoriaSchema);
