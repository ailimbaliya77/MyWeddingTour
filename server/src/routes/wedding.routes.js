import express from "express";
import multer from "multer";
import { weddingInfoStep1, weddingInfoStep2, weddingInfoStep4 } from "../controllers/wedding.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const weddingRouter = express.Router();
const upload = multer({ dest: "uploads/" });

// weddingRouter.post("/upload-couple-photo");
weddingRouter.post("/step-1", authenticate, weddingInfoStep1);
weddingRouter.post("/step-2", authenticate, upload.single("couplePhoto"), weddingInfoStep2);
weddingRouter.post("/step-4", authenticate, weddingInfoStep4);

export default weddingRouter;
