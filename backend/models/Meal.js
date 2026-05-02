const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  dish: String,
  priceMin: Number,
  priceMax: Number,
  time: String,
  location: String,
  image: String,

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  isClaimed: { type: Boolean, default: false },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  rating: { type: Number, min: 1, max: 5 },
  reviewText: String,

  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
});

module.exports = mongoose.model("Meal", mealSchema);