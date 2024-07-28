const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(400).json({ message: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
    console.log("User registered successfully");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error("Error during registration:", error);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userId = user._id;
    const username = user.username;

    res
      .status(200)
      .json({ message: "Login successful", token, userId, username });
    console.log(`${email} logged in, token: ${token}`);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error("Error during login:", error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("employees"); // Correct model name
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error("Error during login:", error);
  }
};
module.exports = { userRegister, userLogin, getAllUsers };
