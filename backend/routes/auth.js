const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ✅ REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);

  user = new User({
    name,
    email,
    password: hashed,
  });

  await user.save();

  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({ token });
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN:", email, password);

    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(400).json({ message: "User not found" });
    }

    console.log("HASH:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.json({ token });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const auth = require("../middleware/auth");

// ✅ GET PROFILE
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ UPDATE PROFILE
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, phone, bio, avatar } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ RATE USER
router.post("/rate/:id", auth, async (req, res) => {
  try {
    const { rating } = req.body; // 1 to 5
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating value" });
    }

    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.status(404).json({ message: "User not found" });

    // Simple moving average calculation for MVP
    const currentTotal = targetUser.ratingAverage * targetUser.ratingCount;
    const newCount = targetUser.ratingCount + 1;
    const newAverage = (currentTotal + rating) / newCount;

    targetUser.ratingAverage = newAverage;
    targetUser.ratingCount = newCount;
    await targetUser.save();

    res.json({ 
      message: "Rating saved successfully", 
      ratingAverage: targetUser.ratingAverage,
      ratingCount: targetUser.ratingCount
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;