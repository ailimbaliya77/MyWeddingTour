import createHttpError from "http-errors";
import { verifyToken } from "../utils/jwt.util.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw createHttpError(401, "No token provided");

  const accessToken = authHeader.split(" ");

  const token = accessToken[1];

  try {
    const decoded = verifyToken(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      err.status = 401;
      err.message = "Token expired";
    } else if (err.name === "JsonWebTokenError") {
      err.status = 403;
      err.message = "Invalid token";
    }
    next(err);
  }
};
