import { z } from "zod/v3";

export const userRegistrationSchema = z.object(
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
  },
  { required_error: "User info is required" }
);
