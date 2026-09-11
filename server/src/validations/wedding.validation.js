import { z } from "zod";
import { zfd } from "zod-form-data";
import { objectIdSchema } from "../helper/helper.js";

export const weddingStep1Schema = z.object({
  bride: z.object({
    firstName: z.string().min(1, "Bride first name cannot be empty"),
    lastName: z.string().min(1, "Bride last name cannot be empty"),
  }),
  groom: z.object({
    firstName: z.string().min(1, "Groom first name cannot be empty"),
    lastName: z.string().min(1, "Groom last name cannot be empty"),
  }),
  _id: objectIdSchema.optional().nullable(),
  weddingStartDate: z.string().optional().nullable(),
  weddingEndDate: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  region: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  venueName: z.string().optional().nullable(),
  guestCapacity: z.coerce.number().optional().nullable(),
  pricePerPerson: z.coerce.number().optional().nullable(),
  religion: z.string().optional().nullable(),
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

        startDate: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),

        startTime: z.string().regex(/^\d{2}:\d{2}$/, "Time must be HH:mm"),

        description: z.string().optional(),

        location: z.object({
          city: z.string().optional().nullable(),
          country: z.string().optional().nullable(),
          houseNumber: z.string().optional().nullable(),
          postalCode: z.string().optional().nullable(),
          region: z.string().optional().nullable(),
          street: z.string().optional().nullable(),
        }),

        day: z.number().min(1),
        dressCode: z.string().optional().nullable(),
        extraNotes: z.string().optional().nullable(),
        foodType: z.string().optional().nullable(),
        musicAvailable: z.boolean().optional(),
        ritualName: z.string().optional().nullable(),
        specialPerformance: z.string().optional().nullable(),
        venueName: z.string().optional().nullable(),
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

export const weddingInfoStep5Schema = z.object({
  weddingId: objectIdSchema,
  accountHolderName: z.string().min(1, "Account holder name is required"),
  ifcNumber: z.string().min(1, "IFC number is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  linkedBankModileNumber: z.string().min(1, "Linked mobile number is required"),
});
