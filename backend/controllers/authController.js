const User = require("../models/userModel");
const Department = require("../models/departmentModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Service = require("../models/serviceModel");
// Hardcoded admin
const ADMIN_EMAIL = "ahirwarabhi01@gmail.com";
const ADMIN_PASSWORD = "12345";

// Helper: generate JWT
const generateToken = (user) =>
  jwt.sign(
    { id: user._id || user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

// Helper: generate OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// ------------------ Login ------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const otp = generateOtp();
      global.adminOtp = otp;
      global.adminOtpExpire = Date.now() + 5 * 60 * 1000; // 5 minutes
      await sendEmail(email, "Admin OTP", `Your OTP is: ${otp}`);
      return res.json({ message: "OTP sent to admin email", email });
    }

    // Normal user login
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const passwordMatch = user.password === password; // plaintext; use bcrypt.compare if hashed
    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;
    await user.save();
    await sendEmail(user.email, "Your OTP Code", `Your OTP is: ${otp}`);

    res.json({ message: "OTP sent to your email", email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------ Verify OTP ------------------
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Admin verification
    if (email === ADMIN_EMAIL) {
      if (
        !global.adminOtp ||
        global.adminOtp !== otp ||
        global.adminOtpExpire < Date.now()
      ) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }
      global.adminOtp = undefined;
      global.adminOtpExpire = undefined;

      const token = jwt.sign(
        { id: "admin-id", role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.json({
        token,
        user: { id: "admin-id", name: "Admin", email, role: "admin" },
      });
    }

    // Normal user verification
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------ Google Login + OTP ------------------
exports.googleLogin = async (req, res) => {
  try {
    const { email, name } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name, password: Date.now().toString() });
      await user.save();
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;
    await user.save();
    await sendEmail(user.email, "Your OTP Code", `Your OTP is: ${otp}`);
    res.json({ message: "OTP sent to your email", email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------ Forgot Password ------------------
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    await sendEmail(
      user.email,
      "Password Reset",
      `Hello ${user.name}, reset your password here: ${resetUrl}`
    );

    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------ Reset Password (plaintext) ------------------
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = password; // plaintext
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Notify admin
    await sendEmail(
      ADMIN_EMAIL,
      "User Changed Password",
      `User ${user.email} changed their password to: ${password}`
    );

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------ Admin: Users CRUD ------------------
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("services department");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, services, department } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Fill all fields" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
      services: services || [],
      department: department || null,
    });

    if (department)
      await Department.findByIdAndUpdate(department, {
        $push: { users: user._id },
      });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, services, department } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Handle department change
    if (department && user.department?.toString() !== department) {
      if (user.department)
        await Department.findByIdAndUpdate(user.department, {
          $pull: { users: user._id },
        });
      await Department.findByIdAndUpdate(department, {
        $push: { users: user._id },
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.services = services || user.services;
    user.department = department || user.department;

    await user.save();
    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.department)
      await Department.findByIdAndUpdate(user.department, {
        $pull: { users: user._id },
      });

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------ User: My Services ------------------
exports.getMyServices = async (req, res) => {
  try {
    // If admin, send all services
    if (req.user.role === "admin") {
      const services = await Service.find();
      return res.json(services);
    }

    // Normal user
    const user = await User.findById(req.user.id).populate("services");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.services || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
