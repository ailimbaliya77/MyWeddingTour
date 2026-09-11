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

  const {
    bride,
    groom,
    _id = null,
    weddingStartDate,
    weddingEndDate,
    country,
    region,
    city,
    venueName,
    guestCapacity,
    pricePerPerson,
    religion,
  } = req.body;

  const wedding = await WeddingsModel.findOneAndUpdate(
    { _id: _id || new mongoose.Types.ObjectId(), isDeleted: false },
    {
      bride,
      groom,
      hostId: id,
      weddingStartDate,
      weddingEndDate,
      country,
      region,
      city,
      venueName,
      guestCapacity,
      pricePerPerson,
      religion,
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

  let result;
  try {
    result = await cloudinary.uploader.upload(file.path, {
      folder: "wedding-tour-couple-images",
    });
  } finally {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  }

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
      status: "pending"
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
    .select("bride groom weddingStartDate weddingEndDate listingPhotoURL city region country venueName guestCapacity pricePerPerson religion")
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

export const updateWedding = asyncHandler(async (req, res) => {
  const { weddingId } = req.params;
  const updateData = req.body;
  const { id: hostId } = req.user;

  // Prevent updating restricted fields
  delete updateData.hostId;
  delete updateData.completedSteps;
  delete updateData.status;

  const wedding = await WeddingsModel.findOneAndUpdate(
    { _id: weddingId, hostId, isDeleted: false },
    { $set: updateData },
    { new: true }
  ).lean();

  if (!wedding) throw createHttpError(404, "Wedding not found or you are not authorized to update it");

  res.json(
    getSuccessResponse({
      message: "Wedding updated successfully",
      status: 200,
      data: wedding,
    })
  );
});

export const deleteWedding = asyncHandler(async (req, res) => {
  const { weddingId } = req.params;
  const { id: hostId } = req.user;

  const wedding = await WeddingsModel.findOneAndUpdate(
    { _id: weddingId, hostId, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  ).lean();

  if (!wedding) throw createHttpError(404, "Wedding not found or you are not authorized to delete it");

  res.json(
    getSuccessResponse({
      message: "Wedding deleted successfully",
      status: 200,
    })
  );
});

export const createSingleWedding = asyncHandler(async (req, res) => {
  const { id } = req.user;

  // Make user a planner/host
  await UserModel.findByIdAndUpdate(id, { isPlanner: true });

  const {
    brideName,
    groomName,
    story,
    location,
    venueName,
    startDate,
    endDate,
    events,
    guestCapacity,
    pricePerGuest,
    specialInstructions,
    status
  } = req.body;

  // Map guestCapacity string to number if possible
  let capacity = 2; // Default
  if (guestCapacity) {
    const match = guestCapacity.match(/\d+/);
    if (match) capacity = parseInt(match[0], 10);
  }

  // Split names into first and last
  const [bFirst, ...bLastArr] = (brideName || "").split(" ");
  const bLast = bLastArr.length > 0 ? bLastArr.join(" ") : "-";

  const [gFirst, ...gLastArr] = (groomName || "").split(" ");
  const gLast = gLastArr.length > 0 ? gLastArr.join(" ") : "-";

  // Create wedding
  const wedding = await WeddingsModel.create({
    bride: { firstName: bFirst || "-", lastName: bLast },
    groom: { firstName: gFirst || "-", lastName: gLast },
    storyDescription: story,
    city: location,
    venueName,
    weddingStartDate: startDate,
    weddingEndDate: endDate,
    guestCapacity: capacity,
    pricePerPerson: pricePerGuest ? Number(pricePerGuest) : null,
    hostId: id,
    status: status || "pending",
    completedSteps: [1, 2, 3, 4, 5] // mark all steps completed since it's a single form
  });

  // Create events
  const eventIds = [];
  if (events && Array.isArray(events)) {
    // Determine a fallback country if none is provided. The simplified form only has `location` (city).
    // We can extract a fallback country if they typed "City, Country"
    const locationParts = (location || "").split(",");
    const fallbackCountry = locationParts.length > 1 ? locationParts[locationParts.length - 1].trim() : "India";
    const fallbackCity = locationParts[0]?.trim() || "Unknown City";

    for (let i = 0; i < events.length; i++) {
      const evt = events[i];
      const dbEvent = await EventsModel.create({
        name: evt, // evt is just the key like "mainWedding"
        date: new Date(startDate || Date.now()), // fallback to now if empty
        description: specialInstructions || "Traditional wedding celebration",
        day: i + 1,
        location: { 
          city: fallbackCity, 
          country: fallbackCountry 
        }
      });
      eventIds.push(dbEvent._id);
    }

    await WeddingsModel.findByIdAndUpdate(wedding._id, { events: eventIds });
  }

  res.json(
    getSuccessResponse({
      message: "Wedding listing created successfully",
      status: 201,
      data: wedding,
    })
  );
});

export const getMyWeddings = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const weddings = await WeddingsModel.find({ hostId: id, isDeleted: false })
    .select("bride groom weddingStartDate weddingEndDate listingPhotoURL city region country venueName guestCapacity pricePerPerson religion status")
    .lean()
    .sort("-_id");

  const { BookingModel } = await import("../models/booking.model.js");

  const weddingIds = weddings.map((w) => w._id);
  const bookings = await BookingModel.find({
    weddingId: { $in: weddingIds },
    status: "confirmed"
  }).lean();

  let totalEarnings = 0;

  const listings = weddings.map((w) => {
    const wBookings = bookings.filter(
      (b) => b.weddingId.toString() === w._id.toString()
    );
    const bookedCount = wBookings.reduce((sum, b) => sum + (b.seats || 1), 0);
    const earnings = bookedCount * (w.pricePerPerson || 0);

    totalEarnings += earnings;

    return {
      ...w,
      bookedCount,
      earnings,
    };
  });

  res.json(
    getSuccessResponse({
      message: "My weddings retrieved successfully",
      status: 200,
      data: {
        listings,
        totalEarnings,
      },
    })
  );
});