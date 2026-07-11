import express from "express";
import cors from "cors";
import passport from "passport";
import indexRouter from "./routes/index.routes.js";
import {
  errorHandler,
  jwtHandler,
  notFoundHandler,
  validationHandler,
} from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import './config/passport.js';

const app = express();

app.use(passport.initialize());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS fixed: explicit allowed origins + credentials support
// Wildcard "*" cannot be combined with credentials: "include" on the frontend —
// browsers block it. We must list exact origins instead.
const allowedOrigins = [
  "http://localhost:5173",              // local dev (Vite)
  "https://myweddingtour.onrender.com", // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (e.g. curl, Postman, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

app.use("/api/v1", indexRouter);

app.use(validationHandler);
app.use(jwtHandler);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;