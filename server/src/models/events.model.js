import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    music: { type: Boolean, default: false },
    dance: { type: Boolean, default: false },
    dressCode: { type: String, default: null },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    day: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const EventsModel = mongoose.model("events", eventsSchema);
