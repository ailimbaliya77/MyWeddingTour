import mongoose from "mongoose";
import { UserModel } from "../models/users.model.js";
import { WeddingsModel } from "../models/weddings.model.js";
import { asyncHandler } from "../utils/asynHandler.util.js";
import { getSuccessResponse } from "../utils/response.util.js";
import { bucket } from "../config/firebaseAdmin.js";

export const weddingInfoStep1 = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const user = await UserModel.findByIdAndUpdate(
    id,
    { isPlanner: true },
    { new: true }
  );

  if (!user) {
    throw createHttpError(400, "User not found");
  }

  const { bride, groom, weddingEmail, phone, _id = null } = req.body;

  const wedding = await WeddingsModel.findOneAndUpdate(
    { _id: _id || new mongoose.Types.ObjectId() },
    {
      bride,
      groom,
      weddingEmail,
      phoneNumber: phone,
    },
    { upsert: true, new: true }
  );

  return res.status(200).json(
    getSuccessResponse({
      message: "New wedding is created successfully",
      status: 200,
      data: {
        _id: wedding._id,
        bride: wedding.bride,
        groom: wedding.groom,
        weddingEmail: wedding.email,
        phoneNumber: wedding.phoneNumber,
      },
    })
  );
});

// export const weddingInfoStep2 = asyncHandler(async (req, res) => {
//   const file = req.file;
//   const { storyDescription, _id: weddingId } = req.body;

//   const fileName = Date.now() + "-" + file.originalname;
//   const blob = bucket.file(`uploads/${fileName}`);

//   const blobStream = blob.createWriteStream({
//     metadata: { contentType: file.mimetype },
//   });

//   blobStream.on("error", (err) => {
//     console.log(err);
//     res.status(500).json(getSuccessResponse({ message: "Upload failed" }));
//   });

//   blobStream.on("finish", async () => {
//     const wedding = await WeddingsModel.findByIdAndUpdate(
//       weddingId,
//       {
//         listingPhotoURL: `uploads/${fileName}`,
//         storyDescription,
//       },
//       { new: true }
//     );

//     if (!wedding) {
//       throw createHttpError(400, "Wedding not found");
//     }

//     const data = {
//       _id: wedding._id,
//       bride: wedding.bride,
//       groom: wedding.groom,
//       weddingEmail: wedding.email,
//       phoneNumber: wedding.phoneNumber,
//       storyDescription,
//     };

//     res.json(
//       getSuccessResponse({
//         message: "Wedding step 2 successfully completed",
//         status: 200,
//         data,
//       })
//     );
//   });

//   blobStream.end(file.buffer);
// });
