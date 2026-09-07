import express from "express";
import { getUsers, userRegistration, getUserProfile, updateUserProfile } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { userRegistrationSchema } from "../validations/user.validation.js";

const userRouter = express.Router();

userRouter.get("/", authenticate, getUsers);
userRouter.post("/register", validate(userRegistrationSchema), userRegistration);
userRouter.get("/me", authenticate, getUserProfile);
userRouter.patch("/me", authenticate, updateUserProfile);

export default userRouter;
