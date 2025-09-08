import express from "express";
import { getUsers, userRegistration } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { userRegistrationSchema } from "../validations/user.validation.js";

const userRouter = express.Router();

userRouter.get("/", authenticate, getUsers);
userRouter.post("/register", validate(userRegistrationSchema), userRegistration);

export default userRouter;
