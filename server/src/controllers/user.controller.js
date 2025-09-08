import { UserModel } from "../models/users.model.js";
import { getSuccessResponse } from "../utils/response.util.js";
import { asyncHandler } from "../utils/asynHandler.util.js";
import createHttpError from "http-errors";
import { sendVerificationEmail } from "../utils/mail.util.js";
import { generateToken } from "../utils/jwt.util.js";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_ACCESS_EXPIRE_TIME = process.env.JWT_ACCESS_EXPIRE_TIME;
const BASE_API_URL = process.env.BASE_API_URL;

export const userRegistration = asyncHandler(async (req, res) => {
  const { firstName, lastName, middleName, email, password } = req.body;

  const isUserExists = await UserModel.findOne({
    email,
    isDeleted: false,
  }).lean();

  if (isUserExists) {
    throw createHttpError(400, "Email already exists.");
  }

  const userData = new UserModel({
    firstName,
    lastName,
    middleName,
    email,
    password,
  });

  await userData.save();

  const verificationToken = generateToken(userData, JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRE_TIME + "m")

  const emailContent = `
    <h2>Hello ${firstName},</h2>
    <p>Click the link below to verify your email:</p>
    <a href="${BASE_API_URL}/auth/verify?token=${verificationToken}">Verify Email</a>
  `;

  await sendVerificationEmail(email, 'Verify Your Email', emailContent);

  res
    .status(200)
    .json(getSuccessResponse({ message: "User created successfully." }));
});

export const getUsers = asyncHandler(async (_req, res) => {
  const users = await UserModel.find({ isDeleted: false }).select(
    "-password -isDeleted -__v"
  );

  if (!users.length) throw createHttpError(404, "Don't have any users");

  res.json(
    getSuccessResponse({
      message: "Users retrieved successfully",
      data: { users },
    })
  );
});
