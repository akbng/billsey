const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
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
      type: ObjectId,
      ref: "Address",
    },
    account: {
      type: ObjectId,
      ref: "Account",
    },
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
      return crypto
        .createHmac("sha256", this.salt)
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

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
