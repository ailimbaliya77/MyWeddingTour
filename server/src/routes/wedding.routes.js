import express from "express";
import multer from "multer";
import {
  allWeddings,
  getWeddingById,
  weddingInfoStep1,
  weddingInfoStep2,
  weddingInfoStep3,
  weddingInfoStep4,
  weddingInfoStep5,
  updateWedding,
  deleteWedding,
  createSingleWedding,
  getMyWeddings
} from "../controllers/wedding.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  weddingInfoStep3Schema,
  weddingInfoStep4Schema,
  weddingInfoStep5Schema,
  weddingStep1Schema,
  weddingStep2Schema,
} from "../validations/wedding.validation.js";

const weddingRouter = express.Router();
const upload = multer({ dest: "uploads/" });

weddingRouter.get("/", allWeddings);
weddingRouter.get("/mine", authenticate, getMyWeddings);
weddingRouter.post(
  "/create-single",
  authenticate,
  upload.fields([
    { name: "bridePhoto", maxCount: 1 },
    { name: "groomPhoto", maxCount: 1 },
    { name: "invitationCard", maxCount: 1 },
    // One possible photo per ceremony type offered in the single-page listing form.
    { name: "eventPhoto_mainWedding", maxCount: 1 },
    { name: "eventPhoto_sangeet", maxCount: 1 },
    { name: "eventPhoto_haldi", maxCount: 1 },
    { name: "eventPhoto_mehndi", maxCount: 1 },
  ]),
  createSingleWedding
);
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
weddingRouter.post(
  "/step-5",
  authenticate,
  validate({ body: weddingInfoStep5Schema }),
  weddingInfoStep5
);

weddingRouter.get('/:weddingId', getWeddingById);
weddingRouter.patch('/:weddingId', authenticate, updateWedding);
weddingRouter.delete('/:weddingId', authenticate, deleteWedding);

export default weddingRouter;