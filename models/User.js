import { Schema, models, model } from "mongoose";
import { createHmac } from "crypto";
import { v4 as uuidv4 } from "uuid";
const { ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        maxLength: 20,
        required: true,
        trim: true,
      },
      last: {
        type: String,
        maxLength: 32,
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    phone: {
      type: Number,
      trim: true,
      match:
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
    },
    imageUrl: {
      type: String,
      match:
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    },
    address: {
      line: {
        type: String,
        required: true,
        trim: true,
      },
      landmark: String,
      city: {
        type: String,
        required: true,
        trim: true,
      },
      pincode: {
        type: Number,
        required: true,
        match: /^[0-9]{6}$/,
      },
      state: {
        type: String,
        required: true,
      },
    },
    account: {
      type: ObjectId,
      ref: "Account",
    },
    notifications: [
      {
        msgType: {
          type: String,
          enum: ["payment_request", "update", "friend_request"],
          default: "payment_request",
        },
        amount: Number,
        payTo: {
          type: ObjectId,
          ref: "User",
        },
        msg: String,
        friend: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    friends: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    groups: [
      {
        type: ObjectId,
        ref: "Group",
      },
    ],
  },
  { timestamps: true }
);

userSchema
  .virtual("fullName")
  .get(function () {
    return this.name.first + " " + this.name?.last;
  })
  .set(function (fullName) {
    this.name.first =
      fullName.indexOf(" ") !== -1
        ? fullName.trim().substr(0, fullName.indexOf(" "))
        : fullName;
    this.name.last =
      fullName.indexOf(" ") !== -1
        ? fullName.trim().substr(fullName.lastIndexOf(" ") + 1)
        : undefined;
  });

userSchema
  .virtual("password")
  .set(function (pass) {
    this._password = pass;
    this.salt = uuidv4();
    this.hashed_password = this.hashPassword(pass);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  hashPassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
  authenticate: function (plainPassword) {
    return this.hashPassword(plainPassword) === this.hashed_password;
  },
};

export default models.User || model("User", userSchema);
