const express = require("express");
const router = express.Router();
const Meal = require("../models/Meal");
const User = require("../models/User");
const auth = require("../middleware/auth");

// ✅ POST MEAL
router.post("/", auth, async (req, res) => {
  try {
    const createdAt = new Date();

    const meal = new Meal({
      ...req.body,
      userId: req.user.id,
      createdAt,
      expiresAt: new Date(createdAt.getTime() + 24 * 60 * 60 * 1000),
    });

    await meal.save();

    res.json(meal);
  } catch (err) {
    console.error("POST MEAL ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET MEALS (Available only)
router.get("/", async (req, res) => {
  try {
    const meals = await Meal.find({
      expiresAt: { $gt: new Date() },
      isClaimed: false, // Only show unclaimed meals in feed
    })
    .populate("userId", "name avatar ratingAverage ratingCount")
    .sort({ createdAt: -1 });

    res.json(meals);
  } catch (err) {
    console.error("GET MEALS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET MY POSTS (Meals created by the user)
router.get("/my-posts", auth, async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.user.id })
      .populate("claimedBy", "name avatar phone") // So chef knows who claimed it
      .sort({ createdAt: -1 });

    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET MY CLAIMS (Meals claimed by the user)
router.get("/my-claims", auth, async (req, res) => {
  try {
    const meals = await Meal.find({ claimedBy: req.user.id })
      .populate("userId", "name avatar phone ratingAverage ratingCount") // So user knows chef details
      .sort({ createdAt: -1 });

    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ CLAIM A MEAL
router.post("/:id/claim", auth, async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) return res.status(404).json({ message: "Meal not found" });
    if (meal.isClaimed) return res.status(400).json({ message: "Meal already claimed" });
    if (meal.userId.toString() === req.user.id) return res.status(400).json({ message: "Cannot claim your own meal" });

    meal.isClaimed = true;
    meal.claimedBy = req.user.id;
    await meal.save();

    res.json({ message: "Meal claimed successfully", meal });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ ADD REVIEW AND RATING TO MEAL
router.post("/:id/review", auth, async (req, res) => {
  try {
    const { rating, reviewText } = req.body; // rating from 1 to 5

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating value" });
    }

    const meal = await Meal.findById(req.params.id);

    if (!meal) return res.status(404).json({ message: "Meal not found" });
    if (!meal.isClaimed || meal.claimedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the user who claimed this meal can review it" });
    }
    if (meal.rating) {
      return res.status(400).json({ message: "You have already reviewed this meal" });
    }

    // Save review to Meal
    meal.rating = rating;
    meal.reviewText = reviewText;
    await meal.save();

    // Update the Chef's overall rating
    const chef = await User.findById(meal.userId);
    if (chef) {
      const currentTotal = (chef.ratingAverage || 0) * (chef.ratingCount || 0);
      const newCount = (chef.ratingCount || 0) + 1;
      const newAverage = (currentTotal + rating) / newCount;

      chef.ratingAverage = newAverage;
      chef.ratingCount = newCount;
      await chef.save();
    }

    res.json({ message: "Review saved successfully", meal });
  } catch (err) {
    console.error("REVIEW ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;