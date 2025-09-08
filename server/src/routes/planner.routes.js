import express from "express";
import { plannerRegistration } from "../controllers/planner.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { PlannerRegistrationSchema } from "../validations/planner.validation.js";

const plannerRouter = express.Router();

plannerRouter.post(
  "/register",
  validate(PlannerRegistrationSchema),
  plannerRegistration
);

export default plannerRouter;
