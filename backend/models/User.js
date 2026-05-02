const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  phone: String,
  bio: String,
  avatar: String,

  ratingAverage: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },

  referralCode: { type: String, unique: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  points: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", userSchema);