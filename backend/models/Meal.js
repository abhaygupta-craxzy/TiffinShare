const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    // 🍛 BASIC INFO
    dish: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String, // store URL (Cloudinary/S3)
      default: "",
    },

    // 💸 PRICING
    priceMin: {
      type: Number,
      required: true,
      min: 0,
    },

    priceMax: {
      type: Number,
      required: true,
      min: 0,
    },

    // 📍 DETAILS
    time: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    // 👤 OWNER
    userId: {
      type: String,
      required: true,
    },

    // ⚡ CLAIM SYSTEM
    isClaimed: {
      type: Boolean,
      default: false,
    },

    claimedBy: {
      type: String,
      default: null,
    },

    // ⏱ TIME SYSTEM
    createdAt: {
      type: Date,
      default: Date.now,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // adds updatedAt automatically
  }
);


// 🚀 INDEXES (performance)
mealSchema.index({ createdAt: -1 });
mealSchema.index({ expiresAt: 1 });


// 🔥 AUTO DELETE AFTER EXPIRY (MongoDB TTL)
mealSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


// 🧠 OPTIONAL: Prevent invalid pricing
mealSchema.pre("save", function (next) {
  if (this.priceMax < this.priceMin) {
    return next(new Error("priceMax must be >= priceMin"));
  }
  next();
});


module.exports = mongoose.model("Meal", mealSchema);