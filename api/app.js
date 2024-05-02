import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
dotenv.config();

const cookieConfig = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/test", (req, res) => {
  return res.json("Hola mundo");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user" });
  }
});

app.post("/login", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    return res.status(400).json({ message: "User already logged in" });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (passwordMatch) {
    jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      return res.cookie("token", token, cookieConfig).json({ user });
    });
  } else {
    return res.status(400).json({ message: "Invalid password" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const user = await User.findById(data.userId);
    return res.json({ user});
  });
});

app.post("/logout", (req, res) => {
  if (!req.cookies.token) {
    return res.status(400).json({ message: "User not logged in" });
  }
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});
