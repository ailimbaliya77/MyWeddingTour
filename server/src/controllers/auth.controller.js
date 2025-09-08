import { UserModel } from "../models/users.model.js";
import { asyncHandler } from "../utils/asynHandler.util.js";
import createHttpError from "http-errors";
import { generateToken, verifyToken } from "../utils/jwt.util.js";
import { TokenModel } from "../models/token.model.js";
import { getSuccessResponse } from "../utils/response.util.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/mail.util.js";

const JWT_ACCESS_EXPIRE_TIME = process.env.JWT_ACCESS_EXPIRE_TIME;
const JWT_REFRESH_EXPIRE_TIME = process.env.JWT_REFRESH_EXPIRE_TIME;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const BASE_API_URL = process.env.BASE_API_URL;

export const authLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select(
    "_id password isPlanner isEmailVerified"
  );

  if (!user.isEmailVerified)
    throw createHttpError(401, "Please verify your email before logging in");

  if (!user) throw createHttpError(400, "Invalid credentials");

  const isMatch = await user.checkPassword(password);
  if (!isMatch) throw createHttpError(400, "Invalid credentials");

  const accessToken = generateToken(
    user,
    JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRE_TIME + "m"
  );
  const refreshToken = generateToken(
    user,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRE_TIME + "d"
  );

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  await TokenModel.create({
    userId: user._id,
    refreshToken: hashedRefreshToken,
    device: req.headers["user-agent"],
    ip: req.ip,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: false,
    secure: false,
    sameSite: "Strict",
    path: "localhost:3000/api/v1/auth/refresh",
    maxAge: JWT_REFRESH_EXPIRE_TIME * 24 * 60 * 60 * 1000,
  });

  res.json(
    getSuccessResponse({
      message: "Logged in successfully",
      data: {
        accessToken,
        refreshToken,
      },
    })
  );
});

export const issueAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) throw createHttpError(401, "No token provided");

  const decoded = verifyToken(refreshToken, JWT_REFRESH_SECRET);
  const userId = decoded.id;

  const tokenDocs = await TokenModel.find({ userId })
    .select("refreshToken")
    .lean();

  let matchedDoc = null;

  for (const doc of tokenDocs) {
    const isMatch = await bcrypt.compare(refreshToken, doc.refreshToken);

    if (isMatch) {
      matchedDoc = doc;
      break;
    }
  }

  if (!matchedDoc) throw createHttpError(403, "Invalid or expired refresh token");

  const newAccessToken = generateToken(
    { _id: userId },
    JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRE_TIME + "m"
  );

  res.json(
    getSuccessResponse({
      message: "Access token generated successfully",
      data: { accessToken: newAccessToken },
    })
  );
});

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) throw createHttpError(400, "No refresh token provided");

  const decoded = verifyToken(refreshToken, JWT_REFRESH_SECRET);
  const userId = decoded.id;

  const tokenDocs = await TokenModel.find({ userId }).select("refreshToken");

  let matchedDoc = null;

  for (const doc of tokenDocs) {
    const isMatch = await bcrypt.compare(refreshToken, doc.refreshToken);

    if (isMatch) {
      matchedDoc = doc;
      await doc.deleteOne();
      break;
    }
  }

  if (!matchedDoc) throw createHttpError(403, "Invalid or expired refresh token");

  res.json(getSuccessResponse({ message: "Logged out successfully" }));
});

export const logoutAll = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) throw createHttpError(400, "No refresh token provided");

  const decoded = verifyToken(refreshToken, JWT_REFRESH_SECRET);
  const userId = decoded.id;

  await TokenModel.deleteMany({ userId });

  res.json(getSuccessResponse({ message: "Logged out from all devices" }));
});

export const verifyEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.query;
  let decoded;

  try {
    decoded = verifyToken(token, JWT_ACCESS_SECRET);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      const decoded = jwt.decode(token);

      const user = await UserModel.findById(decoded.id)
        .select("isEmailVerified email firstName")
        .lean();

      if (!user) throw createHttpError(403, "Invalid or expired refresh token");

      if (user.isEmailVerified)
        throw createHttpError(400, "Email is already verified");

      const newToken = generateToken(
        user,
        JWT_ACCESS_SECRET,
        JWT_ACCESS_EXPIRE_TIME + "m"
      );

      const emailContent = `
          <h2>Hello ${user.firstName},</h2>
          <p>Click the link below to verify your email:</p>
          <a href="${BASE_API_URL}/api/v1/auth/verify?token=${newToken}">Verify Email</a>
        `;

      await sendVerificationEmail(
        user.email,
        "Verify Your Email",
        emailContent
      );

      return res.json(
        getSuccessResponse({
          message:
            "Verification link expired. A new link has been sent to your email.",
        })
      );
    }

    return next(error);
  }

  const userId = decoded.id;

  const user = await UserModel.findByIdAndUpdate(userId, {
    isEmailVerified: true,
  })
    .select("_id")
    .lean();

  if (!user) throw createHttpError(403, "Invalid or expired refresh token");

  res.json(getSuccessResponse({ message: "Account verfied successfully" }));
});
