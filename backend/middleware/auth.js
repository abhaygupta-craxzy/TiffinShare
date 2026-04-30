const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("Authorization");

    if (!token) return res.status(401).send("No token");

    try {
        const decoded = jwt.verify(token, "secretkey");
        req.user = decoded;
        next();
    } catch {
        res.status(401).send("Invalid token");
    }
};
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

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


// ✅ LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.json({ token });
});

module.exports = router;
module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded; // contains user.id
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};