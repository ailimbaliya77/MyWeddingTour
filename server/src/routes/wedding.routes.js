import express from "express";
import multer from "multer";
import {
  allWeddings,
  weddingInfoStep1,
  weddingInfoStep2,
  weddingInfoStep3,
  weddingInfoStep4,
} from "../controllers/wedding.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  weddingInfoStep3Schema,
  weddingInfoStep4Schema,
  weddingStep1Schema,
  weddingStep2Schema,
} from "../validations/wedding.validation.js";

const weddingRouter = express.Router();
const upload = multer({ dest: "uploads/" });

weddingRouter.get("/", allWeddings);
weddingRouter.post(
  "/step-1",
  authenticate,
  validate({ body: weddingStep1Schema }),
  weddingInfoStep1
);
weddingRouter.post(
  "/step-2",
  authenticate,
  upload.single("couplePhoto"),
  validate({ body: weddingStep2Schema }),
  weddingInfoStep2
);
weddingRouter.post(
  "/step-3",
  authenticate,
  validate({ body: weddingInfoStep3Schema }),
  weddingInfoStep3
);
weddingRouter.post(
  "/step-4",
  authenticate,
  validate({ body: weddingInfoStep4Schema }),
  weddingInfoStep4
);

export default weddingRouter;
