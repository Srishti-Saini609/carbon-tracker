import express from "express";
import Activity from "../models/activityModel.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ----------------------------
// Middleware to verify token
// ----------------------------
const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token failed or invalid" });
  }
};

// ----------------------------
// @route POST /api/activities
// Add new activity
// ----------------------------
router.post("/", protect, async (req, res) => {
  const { category, description, emissionValue } = req.body;

  if (!category || !emissionValue) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const activity = await Activity.create({
      user: req.user._id,
      category,
      description,
      emissionValue,
    });
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------
// @route GET /api/activities
// Get all activities for current user
// ----------------------------
router.get("/", protect, async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------
// @route DELETE /api/activities/:id
// Delete an activity
// ----------------------------
router.delete("/:id", protect, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (activity.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await activity.deleteOne();
    res.json({ message: "Activity removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
