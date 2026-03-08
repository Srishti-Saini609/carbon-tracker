const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// TEMP STORAGE (for testing)
let activities = [];

// POST Activity
app.post("/activity", (req, res) => {
  const { type, distance } = req.body;

  const activity = {
    type,
    distance,
  };

  activities.push(activity);

  res.json({ message: "Activity added", activity });
});

// GET Activities
app.get("/activities", (req, res) => {
  res.json(activities);
});

app.delete("/activity/:index", (req, res) => {
  const index = req.params.index;
  activities.splice(index, 1);
  res.json({ message: "Activity deleted" });
});
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);