const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // plain text

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },

    otp: String, // OTP for login verification
    otpExpire: Date, // OTP expiry timestamp

    resetPasswordToken: String, // token for password reset
    resetPasswordExpire: Date, // expiry for reset token
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
