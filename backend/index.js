import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { protect } from "./middleware/authMiddleware.js";  

dotenv.config();

const app = express();
app.use(express.json()); 


app.get("/", (req, res) => {
  res.send("Carbon Tracker API is running...");
});


app.get("/api/me", protect, (req, res) => {
  res.json({
    message: "Secure user data",
    user: req.user,
  });
});


const port = process.env.PORT || 5000;
app.listen(port, async () => {
  await connectDb();
  console.log(`Server running on port ${port}`);
});
