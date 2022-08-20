const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your full name"],
    },
    email: {
      type: String,
      required: [true, "Enter Your Email!"],
      unique: [true, "Email Exist"],
    },

    password: {
      type: String,
      required: [true, "Enter a strong password!"],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
