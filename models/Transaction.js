import { Schema, models, model } from "mongoose";
const { ObjectId } = Schema.Types;

const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    from: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    purpose: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    referenceId: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Transaction || model("Transaction", transactionSchema);
