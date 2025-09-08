import { PlannerModule } from "../models/planner.model.js";
import { UserModel } from "../models/users.model.js";
import { asyncHandler } from "../utils/asynHandler.util.js";
import { getSuccessResponse } from "../utils/response.util.js";
import createHttpError from "http-errors";

export const plannerRegistration = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    middleName,
    email,
    password,
    address,
    phoneNumber,
    gstNumber,
    companyName,
  } = req.body;

  const isUserExists = await UserModel.findOne({
    email,
    isDeleted: false,
  }).lean();

  if (isUserExists) {
    throw createHttpError(400, "Email already exists.");
  }

  const userData = {
    email,
    firstName,
    lastName,
    middleName,
    password,
    isPlanner: true,
  };

  const plannerData = new PlannerModule({
    phoneNumber,
    gstNumber,
    companyName,
    address,
  });

  const newPlanner = await plannerData.save();
  userData.plannerId = newPlanner._id;

  await UserModel.create(userData);

  res
    .status(200)
    .json(getSuccessResponse({ message: "Planner created successfully." }));
});
