import express from "express";
import {
  createBooking,
  getWeddingAvailability,
  getMyBookings,
  cancelBooking,
} from "../controllers/booking.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/", authenticate, createBooking);
bookingRouter.get("/mine", authenticate, getMyBookings);
bookingRouter.get("/availability/:weddingId", getWeddingAvailability);
bookingRouter.patch("/:bookingId/cancel", authenticate, cancelBooking);

export default bookingRouter;