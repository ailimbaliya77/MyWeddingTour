import mongoose from "mongoose";
import createHttpError from "http-errors";
import { BookingModel } from "../models/booking.model.js";
import { WeddingsModel } from "../models/weddings.model.js";
import { asyncHandler } from "../utils/asynHandler.util.js";
import { getSuccessResponse } from "../utils/response.util.js";

const getBookedSeats = async (weddingId) => {
  const result = await BookingModel.aggregate([
    {
      $match: {
        weddingId: new mongoose.Types.ObjectId(weddingId),
        status: "confirmed",
      },
    },
    { $group: { _id: null, total: { $sum: "$seats" } } },
  ]);
  return result[0]?.total || 0;
};

export const createBooking = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { weddingId, seats, guestName, guestEmail, guestPhone, message } =
    req.body;

  if (!weddingId || !guestName || !guestEmail) {
    throw createHttpError(400, "Missing required booking details");
  }

  const seatCount = Number(seats) || 1;
  if (seatCount < 1) throw createHttpError(400, "Seats must be at least 1");

  const wedding = await WeddingsModel.findOne({
    _id: weddingId,
    isDeleted: false,
  }).lean();

  if (!wedding) throw createHttpError(404, "Wedding not found");

  if (wedding.guestCapacity) {
    const booked = await getBookedSeats(weddingId);
    const remaining = wedding.guestCapacity - booked;
    if (seatCount > remaining) {
      throw createHttpError(
        400,
        remaining > 0
          ? `Only ${remaining} seat(s) left for this wedding`
          : "This wedding is fully booked"
      );
    }
  }

  const booking = await BookingModel.create({
    weddingId,
    guestId: id,
    seats: seatCount,
    guestName,
    guestEmail,
    guestPhone,
    message,
  });

  return res.status(201).json(
    getSuccessResponse({
      message: "Seat reserved successfully",
      status: 201,
      data: booking,
    })
  );
});

export const getWeddingAvailability = asyncHandler(async (req, res) => {
  const { weddingId } = req.params;

  const wedding = await WeddingsModel.findOne({
    _id: weddingId,
    isDeleted: false,
  })
    .select("guestCapacity")
    .lean();

  if (!wedding) throw createHttpError(404, "Wedding not found");

  const booked = await getBookedSeats(weddingId);
  const spotsLeft =
    wedding.guestCapacity != null
      ? Math.max(wedding.guestCapacity - booked, 0)
      : null;

  return res.json(
    getSuccessResponse({
      message: "Availability retrieved successfully",
      status: 200,
      data: {
        guestCapacity: wedding.guestCapacity,
        spotsBooked: booked,
        spotsLeft,
      },
    })
  );
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const bookings = await BookingModel.find({ guestId: id })
    .populate({
      path: "weddingId",
      select: "bride groom weddingStartDate weddingEndDate listingPhotoURL city region",
    })
    .sort("-createdAt")
    .lean();

  return res.json(
    getSuccessResponse({
      message: "Bookings retrieved successfully",
      status: 200,
      data: bookings,
    })
  );
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { bookingId } = req.params;

  const booking = await BookingModel.findOneAndUpdate(
    { _id: bookingId, guestId: id },
    { status: "cancelled" },
    { new: true }
  );

  if (!booking) throw createHttpError(404, "Booking not found");

  return res.json(
    getSuccessResponse({
      message: "Booking cancelled successfully",
      status: 200,
      data: booking,
    })
  );
});