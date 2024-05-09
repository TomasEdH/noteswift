import "dotenv/config";
import express, { query } from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/user.js";
import Note from "./models/note.model.js";
import auth from "./middlewares/auth.middleware.js";
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
    origin: 'https://noteswift-client.onrender.com',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
dotenv.config();

const cookieConfig = {
  httpOnly: false,
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

  if(!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

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
    return res.json({ user });
  });
});

app.post("/logout", (req, res) => {
  if (!req.cookies.token) {
    return res.status(400).json({ message: "User not logged in" });
  }
  res.cookie("token", "", { expires: new Date(0) });
  res.json({ message: "Logged out" });
});

app.post("/new-note", auth, async (req, res) => {
  const { title, content, tags } = req.body;
  const userData = req.userId;

  const note = new Note({
    userId: userData,
    title,
    content,
    tags,
  });
  await note.save();
  return res.json({ message: "Note created" });
});

app.get("/notes", auth, async (req, res) => {
  const userData = req.userId;
  try {
    const notes = await Note.find({ userId: userData });
    return res.json({ notes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.put("/edit/:id", auth, async (req, res) => {
  const { title, content, tags } = req.body;
  const { id } = req.params;
  const userData = req.userId;

  if (!title && !content && !tags) {
    return res.status(400).json({ message: "No changes to make" });
  }

  const note = await Note.findOne({ _id: id });
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  if (note.userId.toString() !== userData) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  note.set({
    title: title || note.title,
    content: content || note.content,
    tags: tags || note.tags,
  });
  await note.save();
  return res.json({ message: "Note updated" });
});

app.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  const userData = req.userId;

  Note.findByIdAndDelete({ _id: id, userId: userData })
    .then((note) => {
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      return res.json({ message: "Note deleted" });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

app.get("/notes/search", auth, async (req, res) => {
  const { searchTerm } = req.query;
  const userId = req.userId;

  try {
    // Crear una expresión regular para buscar coincidencias en título, contenido y tags
    const searchRegex = new RegExp(searchTerm, "i");

    // Consulta para buscar notas que coincidan con el término de búsqueda
    const notes = await Note.find({
      userId,
      $or: [
        { title: { $regex: searchRegex } },
        { tags: { $elemMatch: { $regex: searchRegex } } },
      ],
    });

    res.json({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/pin/:noteId", auth, async (req, res) => {
  const { noteId } = req.params;
  const { isPinned } = req.body;
  const userData = req.userId;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId: userData },
      { isPinned },
      { new: true }
    );

    if (!note) {
      return res.status(400).json({ message: "No notes to pin" });
    }

    return res.json({ message: "Note pinned", note });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
