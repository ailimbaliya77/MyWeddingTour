import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

const bookingSchema = new mongoose.Schema(
  {
    weddingId: { type: ObjectId, required: true, ref: "weddings" },
    guestId: { type: ObjectId, required: true, ref: "users" },
    seats: { type: Number, required: true, min: 1, default: 1 },
    guestName: { type: String, required: true },
    guestEmail: { type: String, required: true },
    guestPhone: { type: String, default: null },
    message: { type: String, default: null },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  }
);

export const BookingModel = mongoose.model("bookings", bookingSchema);