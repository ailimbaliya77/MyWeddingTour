import express from "express";
import plannerRouter from "./planner.routes.js";
import userRouter from "./user.routes.js";
import authRouter from "./auth.routes.js";
import weddingRouter from "./wedding.routes.js";

const indexRouter = express.Router();

indexRouter.use("/planner", plannerRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/auth", authRouter);
indexRouter.use("/wedding", weddingRouter);

export default indexRouter;