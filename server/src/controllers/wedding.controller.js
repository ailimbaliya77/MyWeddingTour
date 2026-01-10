import mongoose from "mongoose";
import { UserModel } from "../models/users.model.js";
import { WeddingsModel } from "../models/weddings.model.js";
import { asyncHandler } from "../utils/asynHandler.util.js";
import { getSuccessResponse } from "../utils/response.util.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import createHttpError from "http-errors";
import { EventsModel } from "../models/events.model.js";

// const { ObjectId } = mongoose.Types;

export const weddingInfoStep1 = asyncHandler(async (req, res) => {
  const { id } = req.user;

  console.log("id", id)

  const user = await UserModel.findByIdAndUpdate(
    id,
    { isPlanner: true },
    { new: true }
  )
    .select("_id")
    .lean();

  if (!user) {
    throw createHttpError(400, "User not found");
  }

  const { bride, groom, _id = null } = req.body;

  const wedding = await WeddingsModel.findOneAndUpdate(
    { _id: _id || new mongoose.Types.ObjectId(), isDeleted: false },
    {
      bride,
      groom,
      hostId: id,
      $addToSet: { completedSteps: 1 },
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
    { _id: weddingId, hostId: req.user.id, isDeleted: false },
    {
      cloudinaryPublicId: result.public_id,
      listingPhotoURL: result.secure_url,
      storyDescription: storyDescription,
      $addToSet: { completedSteps: 2 },
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

export const weddingInfoStep3 = asyncHandler(async (req, res) => {
  const { weddingId, totalWeddingDays, events } = req.body;

  const { id } = req.user;

  const wedding = await WeddingsModel.findOneAndUpdate(
    { hostId: id, _id: weddingId, isDeleted: false },
    { totalWeddingDays, $addToSet: { completedSteps: 3 } },
    { new: true }
  ).select("-__v");

  const eventIds = [];

  if (!wedding) throw createHttpError(400, "Bad Request");

  for (const event of events) {
    const eventDateTime = `${event.startDate}T${event.startTime}:00`;
    console.log("event date", eventDateTime)
    const eventObj = {
      name: event.eventName,
      date: new Date(eventDateTime),
      description: event.description,
      location: event.location,
      ritualName: event.ritualName,
      foodType: event.foodType,
      musicAvailable: event.musicAvailable,
      dressCode: event.dressCode,
      venueName: event.venueName,
      extraNotes: event.extraNotes,
      specialPerformance: event.specialPerformance,
      day: event.day,
      location: {
        country: event.location.country,
        region: event.location.region,
        city: event.location.city,
        postalCode: event.location.postalCode,
        street: event.location.street,
        houseNumber: event.location.houseNumber,
      },
    };

    const dbEvent = await EventsModel.findOneAndUpdate(
      { _id: event._id || new mongoose.Types.ObjectId(), isDeleted: false },
      { $set: eventObj },
      { upsert: true, new: true }
    );

    eventIds.push(dbEvent._id);
  }

  await wedding.updateOne({ $addToSet: { events: { $each: eventIds } } });

  return res.status(200).json(
    getSuccessResponse({
      message: "Wedding step-3 done successfully",
      status: 200,
      data: wedding,
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
    { hostId: id, _id: weddingId, isDeleted: false },
    { ceremonyGuide, $addToSet: { completedSteps: 4 } },
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

export const weddingInfoStep5 = asyncHandler(async (req, res) => {
  const {
    accountHolderName,
    ifcNumber,
    accountNumber,
    linkedBankModileNumber,
    weddingId,
  } = req.body;

  const { id } = req.user;

  const wedding = await WeddingsModel.findOneAndUpdate(
    { hostId: id, _id: weddingId, isDeleted: false },
    {
      bankDetails: {
        accountHolderName,
        ifcNumber,
        accountNumber,
        linkedBankModileNumber,
      },
      $addToSet: { completedSteps: 5 },
    },
    {
      new: true,
    }
  ).select("-__v");

  if (!wedding) throw createHttpError(400, "Bad Request");

  res.json(
    getSuccessResponse({
      message: "Wedding step-5 done successfully",
      status: 200,
      data: wedding,
    })
  );
});

export const allWeddings = asyncHandler(async (req, res) => {
  const weddings = await WeddingsModel.find({ isDeleted: false, status: "pending"  })
    .select("bride groom weddingStartDate weddingEndDate listingPhotoURL")
    .lean()
    .sort("-_id");

  res.json(
    getSuccessResponse({
      message: "Weddings retrieved successfully",
      status: 200,
      data: weddings,
    })
  );
});



export const getWeddingById = async (req, res, next) => {
  const { weddingId } = req.params;
  const wedding = await WeddingsModel.findOne({
    _id: weddingId,
    isDeleted: false,
  })
    .populate({
      path: "events",
      select:
        "name description music dance date day ritualName foodType musicAvailable specialPerformance",
    })
    .select(
      "-location -isDeleted -deletedAt -wEmail -cloudinaryPublicId -postalCode -ceremonyGuide -hostId -status -completedSteps -phoneNumbe0r -__v"
    )
    .lean();

  if (!wedding) throw createHttpError(400, "Bad Request");

  res.json(
    getSuccessResponse({
      message: "Wedding retrieved successfully",
      status: 200,
      data: wedding,
    })
  );
};
