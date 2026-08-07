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

    // NOVO: guarda o product_id da AliExpress quando o produto foi
    // importado por lá. Fica vazio/undefined pra produtos cadastrados
    // manualmente. "sparse: true" faz o índice único ignorar documentos
    // sem esse campo, em vez de dar erro de duplicata em todos eles.
    productIdExterno: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Produto", produtoSchema);
