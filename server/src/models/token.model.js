import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  refreshToken: { type: String, required: true },
  device: { type: String },
  ip: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const TokenModel = mongoose.model("Token", tokenSchema);
