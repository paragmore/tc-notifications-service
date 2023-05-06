import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    description: { type: String, required: true },
    segmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Segment",
      required: true,
    },
    imageUrl: { type: String },
    activeDuration: { type: Number },
    appUrl: { type: String },
    isDeleted: { type: Boolean },
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model(
  "Notification",
  NotificationSchema
);
