// // backend/controllers/authController.js
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";
// import generateToken from "../utils/generateToken.js";

// /**
//  * POST /api/auth/signup
//  * body: { name, email, password }
//  */
// export const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     const existing = await User.findOne({ email: email.toLowerCase() });
//     if (existing) {
//       return res.status(409).json({ message: "Email already registered" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       name: name || "",
//       email: email.toLowerCase(),
//       password: hashed,
//     });

//     const token = generateToken({ id: user._id });

//     res.status(201).json({
//       user: { id: user._id, name: user.name, email: user.email },
//       token,
//     });
//   } catch (err) {
//     console.error("signup error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /**
//  * POST /api/auth/login
//  * body: { email, password }
//  */
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ message: "Email and password are required" });

//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     const token = generateToken({ id: user._id });
//     res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
//   } catch (err) {
//     console.error("login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
