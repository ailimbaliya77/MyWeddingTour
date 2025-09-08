import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

const plannerSchema = new mongoose.Schema(
  {
    gstNumber: { type: String },
    phoneNumber: { type: Number },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    userId: { type: ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

export const PlannerModule = mongoose.model("planners", plannerSchema);
