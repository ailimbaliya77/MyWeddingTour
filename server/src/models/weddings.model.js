import mongoose from "mongoose";
import { validatePhoneNumber } from "../helper/helper.js";

const { ObjectId } = mongoose.Types;

const weddingsSchema = new mongoose.Schema(
  {
    bride: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: false },
      phoneNumber: {
        type: String,
        required: false,
        validate: [validatePhoneNumber, "Invalid phone number"],
      },
    },
    groom: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: false },
      phoneNumber: {
        type: String,
        required: false,
        validate: [validatePhoneNumber, "Invalid phone number"],
      },
    },
    weddingEmail: { type: String, required: false },
    listingPhotoURL: { type: String, default: null },
    cloudinaryPublicId: { type: String, default: null },
    storyDescription: { type: String, default: null },
    videoLink: { type: String, default: null },
    totalWeddingDays: { type: Number, default: 1 },
    foodType: { type: String, enum: ["Veg", "Non-Veg", "Both"], default: null },
    isAlcoholAvailable: { type: Boolean, default: false },
    mainLanguagesOfWedding: [{ type: String }],
    weddingStartDate: { type: Date, default: null },
    weddingEndDate: { type: Date, default: null },
    country: { type: String, default: null },
    region: { type: String, default: null },
    city: { type: String, default: null },
    postalCode: { type: String, default: null },
    venueName: { type: String, default: null },
    events: [{ type: ObjectId, ref: "events" }],
    ceremonyGuide: {
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      phoneNumber: { type: String },
      guideCoupleRelation: { type: String },
      spokenLanguages: [{ type: String }],
    },
    hostId: { type: ObjectId, required: true, ref: "users" },
    status: { type: String, default: "draft" },
    completedSteps: [{ type: Number }],
    bankDetails: {
      accountHolderName: { type: String, default: null },
      ifcNumber: { type: String, default: null },
      accountNumber: { type: String, default: null },
      linkedBankModileNumber: { type: String, default: null },
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export const WeddingsModel = mongoose.model("weddings", weddingsSchema);
