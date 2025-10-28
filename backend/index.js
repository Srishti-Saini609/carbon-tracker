// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import session from "express-session";
// import passport from "./config/passport.js";


dotenv.config();
connectDB();

const app = express();
app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());

// health
app.get("/", (req, res) => res.send("EcoTracker API"));

// auth
// app.use("/api/auth", authRoutes);

// example protected route
import { protect } from "./middleware/authMiddleware.js";
app.get("/api/me", protect, (req, res) => {
  res.json({ user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
