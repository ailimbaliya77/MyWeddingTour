import { z } from "zod";
import { zfd } from "zod-form-data";
import { objectIdSchema } from "../helper/helper.js";

export const weddingStep1Schema = z.object({
  bride: z.object(
    {
      firstName: z
        .string({
          invalid_type_error: "Bride first name must be string",
          required_error: "Bride first name is required",
        })
        .nonempty({ message: "Bride first name cannot be empty" }),
      lastName: z
        .string({
          invalid_type_error: "Bride last name must be string",
          required_error: "Bride last name is required",
        })
        .nonempty({ message: "Bride last name cannot be empty" }),
    },
    { required_error: "Bride data is required" }
  ),
  groom: z.object(
    {
      firstName: z
        .string({
          invalid_type_error: "Groom first name must be string",
          required_error: "Groom first name is required",
        })
        .nonempty({ message: "Groom first name cannot be empty" }),
      lastName: z
        .string({
          invalid_type_error: "Groom last name must be string",
          required_error: "Groom last name is required",
        })
        .nonempty({ message: "Groom last name cannot be empty" }),
    },
    { required_error: "Groom data is required" }
  ),
  weddingEmail: z
    .string({
      invalid_type_error: "Email must be string",
      required_error: "Email is required",
    })
    .email({ message: "Invalid email format" }),
  phone: z.string({
    invalid_type_error: "Phone number must be string",
    required_error: "Phone number is required",
  }),
});

export const weddingStep2Schema = zfd.formData({
  storyDescription: zfd.text().transform((val) => z.string().min(1).parse(val)),

  weddingId: zfd.text().transform((val) => {
    return objectIdSchema.parse(val);
  }),
});

export const weddingInfoStep3Schema = z.object({
  weddingId: objectIdSchema,

  totalWeddingDays: z
    .number({
      required_error: "totalWeddingDays is required",
      invalid_type_error: "totalWeddingDays must be a number",
    })
    .min(1, "Must be at least 1"),

  events: z
    .array(
      z.object({
        _id: objectIdSchema.optional(),

        eventName: z.string().min(1, "Event name is required"),

        date: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),

        time: z.string().regex(/^\d{2}:\d{2}$/, "Time must be HH:mm"),

        description: z.string().optional(),

        location: z.string().optional(),

        day: z.number().min(1),
      })
    )
    .min(1, "At least one event is required"),
});

export const weddingInfoStep4Schema = z.object({
  weddingId: objectIdSchema,

  guideFirstName: z.string().min(1, "Guide first name is required"),

  guideLastName: z.string().min(1, "Guide last name is required"),

  guideEmail: z.string().email("Invalid email address"),

  guidePhoneNumber: z
    .string()
    .min(5, "Phone number is too short")
    .max(20, "Phone number is too long"),

  guideCoupleRelation: z.string().min(1, "Relation with couple is required"),

  guideSpokenLanguages: z
    .array(z.string().min(1))
    .min(1, "At least one spoken language is required"),
});
