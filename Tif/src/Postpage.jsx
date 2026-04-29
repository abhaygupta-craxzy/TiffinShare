import React, { useState, useContext } from "react";
import { MealContext } from "./Mealcontext";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function PostPage() {
  const { meals, setMeals } = useContext(MealContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    dish: "",
    description: "",
    priceMin: "",
    priceMax: "",
    time: "",
    location: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (!form.dish || !form.priceMin || !form.time) {
      alert("Fill required fields ⚠️");
      return;
    }

    const newMeal = {
      id: Date.now(),
      ...form,
      image: preview,
      rating: 4.5,
    };

    setMeals([newMeal, ...meals]);
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* Center Card */}
      <div className="flex justify-center items-center pt-28 px-4">
        
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-gray-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Post Your Meal 🍱
          </h2>

          {/* Image Upload */}
          <label className="block mb-2 text-sm text-gray-400">
            Upload Food Image
          </label>

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="mb-4"
          />

          {preview && (
            <img
              src={preview}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
          )}

          {/* Dish */}
          <input
            name="dish"
            placeholder="Dish Name"
            onChange={handleChange}
            className="input mb-3"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Food Description"
            onChange={handleChange}
            className="input mb-3"
          />

          {/* Price Row */}
          <div className="flex gap-3 mb-3">
            <input
              name="priceMin"
              type="number"
              placeholder="Min ₹"
              onChange={handleChange}
              className="input"
            />
            <input
              name="priceMax"
              type="number"
              placeholder="Max ₹"
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Time */}
          <input
            name="time"
            type="time"
            onChange={handleChange}
            className="input mb-3"
          />

          {/* Location */}
          <input
            name="location"
            placeholder="Pickup Location"
            onChange={handleChange}
            className="input mb-5"
          />

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 py-3 rounded-xl text-lg hover:scale-105 transition"
          >
            Post Meal 🚀
          </button>

        </div>
      </div>
    </div>
  );
}