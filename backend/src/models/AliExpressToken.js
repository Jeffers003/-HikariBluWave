// src/models/AliExpressToken.js
import mongoose from "mongoose";

const aliExpressTokenSchema = new mongoose.Schema(
  {
    accessToken: { type: String, required: true },
    refreshToken: { type: String },
    expireTime: { type: String }, // vem como epoch ms em string na resposta da AliExpress
    refreshExpireTime: { type: String },
    sellerId: { type: String },
    userId: { type: String },
    locale: { type: String },
    sp: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("AliExpressToken", aliExpressTokenSchema);
