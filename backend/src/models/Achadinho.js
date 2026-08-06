import mongoose from "mongoose";

const achadinhoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },

    descricao: {
      type: String,
      required: true,
      trim: true,
    },

    imagem: {
      type: String,
      default: null,
    },

    preco: {
      type: Number,
      required: true,
    },

    precoAntigo: {
      type: Number,
      default: null,
    },

    marketplace: {
      type: String,
      enum: ["Mercado Livre", "Shopee", "Amazon", "Outro"],
      required: true,
    },

    linkAfiliado: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    colecoes: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },

    destaque: {
      type: Boolean,
      default: false,
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

export default mongoose.model("Achadinho", achadinhoSchema);
