import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    senha: {
      type: String,
      required: true,
      minlength: 6,
    },

    cargo: {
      type: String,
      enum: ["admin", "cliente"],
      default: "cliente",
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

export default mongoose.model("Usuario", usuarioSchema);
