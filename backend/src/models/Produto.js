import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },

    // slug é gerado automaticamente a partir do nome (ver hook abaixo),
    // usado nas rotas públicas tipo /produtos/:slug
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },

    descricao: {
      type: String,
      required: true,
    },

    preco: {
      type: Number,
      required: true,
    },

    // preço "riscado" pra mostrar desconto no card (opcional)
    precoAntigo: {
      type: Number,
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

    // usado pelo card pra mostrar o selo (ex: "AliExpress"). Produtos
    // cadastrados manualmente podem deixar em branco.
    marketplace: {
      type: String,
      default: "proprio",
    },

    destaque: {
      type: Boolean,
      default: false,
    },

    avaliacao: {
      type: Number,
    },

    vendas: {
      type: Number,
    },

    // link externo (afiliado), quando aplicável — em produtos de
    // dropshipping próprio isso normalmente fica vazio, já que o cliente
    // compra dentro do próprio site.
    linkAfiliado: {
      type: String,
    },

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

function gerarSlugBase(nome) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

produtoSchema.pre("save", async function (next) {
  if (this.slug && !this.isModified("nome")) {
    return next();
  }

  const base = gerarSlugBase(this.nome);
  let slugCandidato = base;
  let contador = 1;

  // garante unicidade caso já exista produto com o mesmo nome
  const Produto = this.constructor;
  while (
    await Produto.exists({ slug: slugCandidato, _id: { $ne: this._id } })
  ) {
    contador += 1;
    slugCandidato = `${base}-${contador}`;
  }

  this.slug = slugCandidato;
  next();
});

export default mongoose.model("Produto", produtoSchema);
