import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { ObjectId } = mongoose.Types;

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: false },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: false },
    isAdmin: { type: Boolean, default: false },
    isPlanner: { type: Boolean, default: false },
    plannerId: { type: ObjectId, ref: "planner" },
    isEmailVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    provider: [{ type: String }],
    googleId: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.password) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model("users", userSchema);
