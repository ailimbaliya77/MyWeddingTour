import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";
import mongoose from "mongoose";
export const validatePhoneNumber = (value) => {
  try {
    const phone = parsePhoneNumberFromString(value);
    return phone?.isValid() ?? false;
  } catch {
    return false;
  }
};

export const objectIdSchema = z
  .string()
  .refine((v) => mongoose.isObjectIdOrHexString(v), {
    message: "Invalid ObjectId",
  });
