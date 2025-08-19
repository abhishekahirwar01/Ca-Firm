const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const serviceRoutes = require("./routes/serviceRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running on http://localhost:3000");
});
