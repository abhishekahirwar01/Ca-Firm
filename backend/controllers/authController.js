const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, services } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      services: services || [],
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        services: newUser.services,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        services: user.services,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { email, name } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      const randomPassword = await bcrypt.hash(Date.now().toString(), 10);
      user = new User({ email, name, password: randomPassword });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        services: user.services,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User with this email not found" });

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpire = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const message = `Hello ${user.name},\n\nPlease reset your password using this link:\n${resetUrl}`;

    await sendEmail(user.email, "Password Reset Request", message);

    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, services } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role, services }, // services is array of IDs
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = (await User.find().populate("services")) || [];
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getuser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("services"); 
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.services); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, password, services } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Fill all fields" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      services: services || [],
      role: "user",
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
