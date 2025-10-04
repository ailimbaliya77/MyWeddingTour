import mongoose from "mongoose";
import { UserModel } from "../models/users.model.js";
import { WeddingsModel } from "../models/weddings.model.js";
import { asyncHandler } from "../utils/asynHandler.util.js";
import { getSuccessResponse } from "../utils/response.util.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const weddingInfoStep1 = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const user = await UserModel.findByIdAndUpdate(
    id,
    { isPlanner: true },
    { new: true }
  );

  if (!user) {
    throw createHttpError(400, "User not found");
  }

  const { bride, groom, weddingEmail, phone, _id = null } = req.body;

  const wedding = await WeddingsModel.findOneAndUpdate(
    { _id: _id || new mongoose.Types.ObjectId() },
    {
      bride,
      groom,
      weddingEmail,
      phoneNumber: phone,
    },
    { upsert: true, new: true }
  ).lean();

  return res.status(200).json(
    getSuccessResponse({
      message: "New wedding is created successfully",
      status: 200,
      data: {
        _id: wedding._id,
        bride: wedding.bride,
        groom: wedding.groom,
        weddingEmail: wedding.email,
        phoneNumber: wedding.phoneNumber,
      },
    })
  );
});

export const weddingInfoStep2 = asyncHandler(async (req, res) => {
  const file = req.file;
  const { storyDescription, weddingId } = req.body;

  const result = await cloudinary.uploader.upload(file.path, {
    folder: "wedding-tour-couple-images",
  });

  fs.unlinkSync(req.file.path);

  const wedding = await WeddingsModel.findByIdAndUpdate(weddingId, {
    cloudinaryPublicId: result.public_id,
    listingPhotoURL: result.secure_url,
    storyDescription: storyDescription,
  }).lean();

  return res.status(200).json(
    getSuccessResponse({
      message: "Wedding step-2 done successfully",
      status: 200,
      data: {
        _id: wedding._id,
        bride: wedding.bride,
        groom: wedding.groom,
        weddingEmail: wedding.email,
        phoneNumber: wedding.phoneNumber,
        storyDescription: wedding.storyDescription,
        coupleImage: wedding.listingPhotoURL,
      },
    })
  );
});
