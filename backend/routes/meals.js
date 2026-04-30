const express = require("express");
const router = express.Router();
const Meal = require("../models/Meal");
const auth = require("../middleware/auth");

// ✅ POST MEAL (protected)
router.post("/", auth, async (req, res) => {
  const createdAt = new Date();

  const meal = new Meal({
    ...req.body,
    userId: req.user.id,
    createdAt,
    expiresAt: new Date(createdAt.getTime() + 24 * 60 * 60 * 1000),
  });

  await meal.save();
  res.json(meal);
});

// ✅ GET MEALS (only active)
router.get("/", async (req, res) => {
  const meals = await Meal.find({
    expiresAt: { $gt: new Date() }
  }).sort({ createdAt: -1 });

  res.json(meals);
});

// 🔥 CLAIM MEAL (safe)
router.patch("/:id/claim", auth, async (req, res) => {
  try {
    const meal = await Meal.findOneAndUpdate(
      {
        _id: req.params.id,
        isClaimed: false,                // ❗ ensures only one user wins
        expiresAt: { $gt: new Date() }   // ❗ cannot claim expired meal
      },
      {
        isClaimed: true,
        claimedBy: req.user.id
      },
      { new: true }
    );

    if (!meal) {
      return res.status(400).json({
        message: "Meal already claimed or expired"
      });
    }

    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET MY POSTS
router.get("/my-posts", auth, async (req, res) => {
  const meals = await Meal.find({
    userId: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(meals);
});

// ✅ GET MY ORDERS
router.get("/my-orders", auth, async (req, res) => {
  const meals = await Meal.find({
    claimedBy: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(meals);
});
module.exports = router;

