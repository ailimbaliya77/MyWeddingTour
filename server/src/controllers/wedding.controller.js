import mongoose from "mongoose";
import { UserModel } from "../models/users.model.js";
import { WeddingsModel } from "../models/weddings.model.js";
import { asyncHandler } from "../utils/asynHandler.util.js";
import { getSuccessResponse } from "../utils/response.util.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import createHttpError from "http-errors";

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

  const wedding = await WeddingsModel.findOneAndUpdate(
    { _id: weddingId, hostId: req.user.id },
    {
      cloudinaryPublicId: result.public_id,
      listingPhotoURL: result.secure_url,
      storyDescription: storyDescription,
      step: 2
    }
  ).lean();

  if (!wedding) throw createHttpError(400, "Bad Request");

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

export const weddingInfoStep4 = asyncHandler(async (req, res) => {
  const {
    weddingId,
    guideFirstName,
    guideLastName,
    guideEmail,
    guidePhoneNumber,
    guideCoupleRelation,
    guideSpokenLanguages,
  } = req.body;

  const { id } = req.user;

  const ceremonyGuide = {
    firstName: guideFirstName,
    lastName: guideLastName,
    email: guideEmail,
    phoneNumber: guidePhoneNumber,
    guideCoupleRelation: guideCoupleRelation,
    spokenLanguages: guideSpokenLanguages,
  };

  const wedding = await WeddingsModel.findOneAndUpdate(
    { hostId: id, _id: weddingId },
    { ceremonyGuide, step: 4 },
    {
      new: true,
    }
  ).select("-__v");

  if (!wedding) throw createHttpError(400, "Bad Request");

  res.json(
    getSuccessResponse({
      message: "Wedding step-4 done successfully",
      status: 200,
      data: wedding,
    })
  );
});

export const allWeddings = asyncHandler(async (req, res) => {
  const weddings = await WeddingsModel.find({ isDeleted: false }).select("bride groom weddingStartDate weddingEndDate").lean();

  res.json(
    getSuccessResponse({
      message: "Weddings retrieved successfully",
      status: 200,
      data: weddings
    })
  )
})