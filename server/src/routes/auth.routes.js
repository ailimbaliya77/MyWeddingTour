import { Router } from "express";
import {
  authLogin,
  issueAccessToken,
  logout,
  logoutAll,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.get("/refresh", issueAccessToken);
authRouter.delete("/logout", authenticate, logout);
authRouter.delete("/logout-all", authenticate, logoutAll);
authRouter.post("/login", authLogin);
authRouter.post("/verify", verifyEmail);

export const AuthRouter = authRouter;
