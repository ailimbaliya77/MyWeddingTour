import { z } from "zod/v3";

export const PlannerRegistrationSchema = z.object(
  {
    firstName: z
      .string({
        invalid_type_error: "First name must be string",
        required_error: "First name is required",
      })
      .nonempty({ message: "First name cannot be empty" }),
    lastName: z
      .string({
        invalid_type_error: "Last name must be string",
        required_error: "Last name is required",
      })
      .nonempty({ message: "Last name cannot be empty" }),
    middleName: z.string().optional(),
    email: z
      .string({
        invalid_type_error: "Email must be string",
        required_error: "Email is required",
      })
      .email({ message: "Invalid email format" }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, { message: "Password must be at least 6 characters" }),
    address: z.string({
      invalid_type_error: "Address must be string",
      required_error: "Address is required",
    }),
    phoneNumber: z.number({
      invalid_type_error: "Phone number must be integer",
      required_error: "Phone number is required",
    }),
    gstNumber: z.string({
      invalid_type_error: "GST number must be string",
      required_error: "GST number is required",
    }).length(15, "GST number must be 15 characters long"),
    companyName: z.string({
      invalid_type_error: "Company name must be string",
      required_error: "Company name is required",
    }),
  },
  { required_error: "User info is required" }
);
