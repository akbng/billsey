import { Schema, models, model } from "mongoose";
const { ObjectId } = Schema.Types;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trime: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: [{ type: String }],
    creator: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    transactions: [
      {
        type: ObjectId,
        ref: "Transaction",
      },
    ],
    bills: [
      {
        name: {
          type: String,
          required: true,
        },
        totalAmount: {
          type: Number,
          required: true,
        },
        members: [{ type: ObjectId, ref: "User" }],
        splitAmount: Number,
      },
    ],
  },
  { timestamps: true }
);

export default models.Group || model("Group", groupSchema);
