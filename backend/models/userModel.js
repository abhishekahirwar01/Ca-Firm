const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["admin", "ca", "staff", "client"],
      required: true,
    },
    name: { type: String, required: true }, // sab roles ke liye
    clientBusinessName: {
      type: String,
      required: function () {
        return this.role === "client";
      },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    panNumber: {
      type: String,
      required: function () {
        return this.role !== "client"; // Client ke alawa PAN must
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
