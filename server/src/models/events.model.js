import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  music: { type: Boolean, default: false },
  dance: { type: Boolean, default: false },
  dressCode: { type: String, default: null },
});

export const EventsModel = mongoose.model("events", eventsSchema);
