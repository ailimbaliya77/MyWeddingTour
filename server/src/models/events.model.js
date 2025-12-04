import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    music: { type: Boolean, default: false },
    dance: { type: Boolean, default: false },
    dressCode: { type: String, default: null },
    date: { type: Date, required: true },
    day: { type: Number, required: true },
    ritualName: { type: String },
    foodType: { type: String },
    musicAvailable: { type: Boolean, default: false },
    specialPerformance: { type: String },
    extraNotes: { type: String },
    venueName: { type: String },
    location: {
      country: { type: String, required: true },
      region: { type: String },
      city: { type: String, required: true },
      postalCode: { type: String },
      street: { type: String },
      houseNumber: { type: String },
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const EventsModel = mongoose.model("events", eventsSchema);
