import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// REGISTER
export const register = async (req, res) => {
  try {
    const { rollNo, name, email, phone, department, committees, password } =
      req.body;

    // 🔍 1. VALIDATION (backend safety)
    const missingFields = [];

    if (!rollNo) missingFields.push("rollNo");
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!phone) missingFields.push("phone");
    if (!department) missingFields.push("department");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        fields: missingFields,
      });
    }

    // 🔍 2. COMMITTEE VALIDATION
    if (committees && committees.length > 2) {
      return res.status(400).json({
        message: "Max 2 committees allowed",
      });
    }

    // 🔍 3. CHECK EXISTING USER
    const existingUser = await User.findOne({
      $or: [{ email }, { rollNo }],
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.email === email
            ? "Email already exists"
            : "Roll number already exists",
      });
    }

    // 🔐 4. HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧾 5. CREATE USER
    const user = await User.create({
      rollNo,
      name,
      email,
      phone,
      department,
      committees,
      password: hashedPassword,
      // role will default to "member"
    });

    // 🎯 6. RESPONSE (don’t send password)
    const userResponse = {
      _id: user._id,
      rollNo: user.rollNo,
      name: user.name,
      email: user.email,
      phone: user.phone,
      department: user.department,
      committees: user.committees,
      role: user.role,
    };

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (err) {
    console.error(err);

    // ⚠️ HANDLE MONGOOSE UNIQUE ERRORS
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({
        message: `${field} already exists`,
      });
    }

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};
// LOGIN
export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      user: user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
