import express from "express";
import plannerRouter from "./planner.routes.js";
import userRouter from "./user.routes.js";
import { AuthRouter } from "./auth.routes.js";

const indexRouter = express.Router();

indexRouter.use("/planner", plannerRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/auth", AuthRouter);

export default indexRouter;