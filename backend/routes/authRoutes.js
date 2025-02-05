const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

        res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Get User Profile
router.get("/profile", async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error("Profile Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
