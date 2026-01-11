import { Router } from "express";
import {
  authGoogle,
  authLogin,
  issueAccessToken,
  logout,
  logoutAll,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import passport from "passport";

const FRONTEND_URL = process.env.FRONTEND_URL;

const authRouter = Router();

authRouter.get("/refresh", issueAccessToken);
authRouter.delete("/logout", authenticate, logout);
authRouter.delete("/logout-all", authenticate, logoutAll);
authRouter.post("/login", authLogin);
authRouter.post("/verify", verifyEmail);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${FRONTEND_URL}/MyWeddingTour/#/BecomeHost`,
    session: false,
  }),
  authGoogle
);

export default authRouter;
