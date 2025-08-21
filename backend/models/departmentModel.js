const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ✅ add this
});

module.exports = mongoose.model("Department", DepartmentSchema);
