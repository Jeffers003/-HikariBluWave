import mongoose from "mongoose";

const aliExpressTokenSchema = new mongoose.Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },

    refreshToken: {
      type: String,
      required: true,
    },

    expireTime: {
      type: Number,
      required: true,
    },

    refreshExpireTime: {
      type: Number,
      required: true,
    },

    sellerId: String,

    userId: String,

    locale: String,

    sp: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("AliExpressToken", aliExpressTokenSchema);
