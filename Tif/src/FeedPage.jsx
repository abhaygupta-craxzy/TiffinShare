import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyMeals = [
  {
    id: 1,
    dish: "Kadi Chawal 🍛",
    priceMin: 20,
    priceMax: 40,
    time: "12:30 PM",
    location: "Gate 2",
    user: "Aman",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1604908176997-431e3c8b47e9",
  },
  {
    id: 2,
    dish: "Paneer Butter Masala 🧀",
    priceMin: 40,
    priceMax: 70,
    time: "1:00 PM",
    location: "Hostel A",
    user: "Riya",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
  },
  {
    id: 3,
    dish: "Rajma Chawal 🍛",
    priceMin: 25,
    priceMax: 50,
    time: "12:45 PM",
    location: "Library Lawn",
    user: "Karan",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1626500154749-6c1a3e6a4b88",
  },
  {
    id: 4,
    dish: "Aloo Paratha 🫓",
    priceMin: 15,
    priceMax: 30,
    time: "11:30 AM",
    location: "Gate 1",
    user: "Neha",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1601050690117-8b2b2a1c5c65",
  },
  {
    id: 5,
    dish: "Chole Bhature 🍲",
    priceMin: 30,
    priceMax: 60,
    time: "1:15 PM",
    location: "Canteen Area",
    user: "Rahul",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1628294896516-1f47c1a7109a",
  },
  {
    id: 6,
    dish: "Veg Pulao 🍚",
    priceMin: 20,
    priceMax: 40,
    time: "12:20 PM",
    location: "Hostel B",
    user: "Simran",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1604908554168-9c91d5efb582",
  },
  {
    id: 7,
    dish: "Maggi 🍜",
    priceMin: 10,
    priceMax: 20,
    time: "5:00 PM",
    location: "Hostel Room",
    user: "Arjun",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1617196034731-2f8d2c6c5f7a",
  },
  {
    id: 8,
    dish: "Egg Fried Rice 🍳",
    priceMin: 30,
    priceMax: 50,
    time: "1:30 PM",
    location: "Gate 3",
    user: "Vikram",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1604908177225-d3bb0c6a0b5b",
  },
  {
    id: 9,
    dish: "Dal Tadka 🍲",
    priceMin: 20,
    priceMax: 35,
    time: "12:10 PM",
    location: "Hostel C",
    user: "Pooja",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1625944231200-51b8bba4d5b4",
  },
  {
    id: 10,
    dish: "Chicken Curry 🍗",
    priceMin: 50,
    priceMax: 80,
    time: "1:00 PM",
    location: "Sports Ground",
    user: "Sameer",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1604908177227-c0b38b7b7e2c",
  },
  {
    id: 11,
    dish: "Idli Sambhar 🥥",
    priceMin: 20,
    priceMax: 35,
    time: "10:30 AM",
    location: "South Block",
    user: "Ananya",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
  },
  {
    id: 12,
    dish: "Masala Dosa 🥞",
    priceMin: 30,
    priceMax: 50,
    time: "11:00 AM",
    location: "Canteen",
    user: "Rohit",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
  },
  {
    id: 13,
    dish: "Poha 🍋",
    priceMin: 10,
    priceMax: 20,
    time: "9:30 AM",
    location: "Hostel Mess",
    user: "Megha",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1604908177164-3c47d7d97c44",
  },
  {
    id: 14,
    dish: "Bread Omelette 🍞🍳",
    priceMin: 15,
    priceMax: 25,
    time: "8:30 AM",
    location: "Gate 2",
    user: "Deepak",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: 15,
    dish: "Samosa + Chutney 🥟",
    priceMin: 10,
    priceMax: 15,
    time: "4:00 PM",
    location: "Tea Stall",
    user: "Nikhil",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1604908177112-4d8d7f5b3d88",
  },
];

export default function FeedPage() {
  const navigate = useNavigate();

  // 🔥 FIXED STATES
  const [search, setSearch] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [claimedMeals, setClaimedMeals] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔍 Search Filter
  const filteredMeals = dummyMeals.filter((meal) =>
    meal.dish.toLowerCase().includes(search.toLowerCase())
  );

  const handleClaim = (meal) => {
    setSelectedMeal(meal);
    setSelectedPrice(null);
  };

  const confirmClaim = () => {
    if (!selectedPrice) {
      alert("Please select a price");
      return;
    }
    setClaimedMeals([...claimedMeals, selectedMeal.id]);
    setSelectedMeal(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20 px-6">

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md border-b border-gray-800 px-6 py-4 z-50 flex justify-between items-center">
        
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)}>☰</button>

          <h1
            onClick={() => navigate("/")}
            className="text-orange-400 font-bold cursor-pointer"
          >
            TiffinShare 🍱
          </h1>
        </div>

        <button className="bg-orange-500 px-4 py-2 rounded-lg">
          Post Meal
        </button>

      </nav>

      {/* ===== SIDEBAR ===== */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="text-orange-400 font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <div className="flex flex-col p-4 gap-4">
          <button onClick={() => navigate("/home")}>🏠 Home</button>
          <button>🍱 My Meals</button>
          <button>📦 My Orders</button>
          <button>⭐ Favorites</button>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== TITLE ===== */}
      <h2 className="text-2xl font-bold mb-4">Available Meals 🍽️</h2>

      {/* ===== SEARCH ===== */}
      <input
        type="text"
        placeholder="Search dishes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 bg-gray-900 border border-gray-800 px-4 py-2 rounded-xl"
      />

      {/* ===== MEAL GRID ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => {
            const isClaimed = claimedMeals.includes(meal.id);

            return (
              <div key={meal.id} className="bg-white/5 rounded-xl overflow-hidden border border-gray-800">

                <img
                  src={meal.image}
                  alt={meal.dish}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3>{meal.dish}</h3>
                  <p>₹{meal.priceMin}–₹{meal.priceMax}</p>
                  <p className="text-sm text-gray-400">
                    ⏰ {meal.time} | 📍 {meal.location}
                  </p>

                  {isClaimed ? (
                    <button className="w-full mt-3 bg-gray-700 py-2 rounded">
                      Claimed ❌
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClaim(meal)}
                      className="w-full mt-3 bg-orange-500 py-2 rounded"
                    >
                      Claim ⚡
                    </button>
                  )}
                </div>

              </div>
            );
          })
        ) : (
          <p>No meals found 😕</p>
        )}
      </div>

      {/* ===== MODAL ===== */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-xl w-80 text-center">

            <h3>{selectedMeal.dish}</h3>

            <div className="flex gap-2 my-4 justify-center">
              {[selectedMeal.priceMin,
                Math.floor((selectedMeal.priceMin + selectedMeal.priceMax) / 2),
                selectedMeal.priceMax].map((price) => (
                <button
                  key={price}
                  onClick={() => setSelectedPrice(price)}
                  className={`px-3 py-1 ${
                    selectedPrice === price ? "bg-orange-500" : "bg-gray-800"
                  }`}
                >
                  ₹{price}
                </button>
              ))}
            </div>

            <button
              onClick={confirmClaim}
              className="w-full bg-orange-500 py-2 rounded"
            >
              Confirm
            </button>

            <button
              onClick={() => setSelectedMeal(null)}
              className="mt-2 text-gray-400"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  );
}