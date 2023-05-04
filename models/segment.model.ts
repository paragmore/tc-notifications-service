import mongoose from "mongoose";

const SegmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    customers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
  },
  { timestamps: true }
);

export const SegmentModel = mongoose.model("Segment", SegmentSchema);
