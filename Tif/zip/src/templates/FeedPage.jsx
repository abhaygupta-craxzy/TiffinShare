import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FeedPage() {
  const navigate = useNavigate();

  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  // 🔄 FETCH MEALS
  const fetchMeals = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/meals");
      const data = await res.json();
      setMeals(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  // ⏳ AUTO REMOVE EXPIRED (extra safety)
  useEffect(() => {
    const interval = setInterval(() => {
      setMeals((prev) =>
        prev.filter((meal) => new Date(meal.expiresAt) > new Date())
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // 🔍 FILTER
  const filteredMeals = meals
    .filter((meal) => new Date(meal.expiresAt) > new Date())
    .filter((meal) =>
      meal?.dish?.toLowerCase().includes(search.toLowerCase())
    );

  // ⚡ CLAIM
  const confirmClaim = async () => {
    if (!selectedPrice) {
      alert("Select price");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/meals/${selectedMeal._id}/claim`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // update UI
      setMeals((prev) =>
        prev.map((m) => (m._id === selectedMeal._id ? data : m))
      );

      setSelectedMeal(null);
    } catch (err) {
      console.error(err);
    }
  };

  // ⏳ TIME LEFT
  const getTimeLeft = (expiresAt) => {
    const diff = new Date(expiresAt) - new Date();
    if (diff <= 0) return "Expired";

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${h}h ${m}m left`;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20 px-6">

      {/* 🔝 NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex justify-between items-center">

        <h1
          onClick={() => navigate("/")}
          className="text-orange-400 font-bold cursor-pointer"
        >
          TiffinShare 🍱
        </h1>

        {isLoggedIn ? (
          <button
            onClick={() => navigate("/profile")}
            className="bg-orange-500 px-4 py-2 rounded"
          >
            Profile 👤
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-orange-500 px-4 py-2 rounded"
          >
            Login 🔐
          </button>
        )}
      </nav>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search meals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 bg-gray-900 border border-gray-800 px-4 py-2 rounded"
      />

      {/* ❌ EMPTY */}
      {filteredMeals.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No meals available 😕
        </p>
      )}

      {/* 🍱 GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredMeals.map((meal) => (
          <div key={meal._id} className="bg-white/5 rounded-xl border border-gray-800">

            {meal.image && (
              <img
                src={meal.image}
                alt={meal.dish}
                className="w-full h-48 object-cover rounded-t-xl"
              />
            )}

            <div className="p-4">
              <h3 className="font-semibold">{meal.dish}</h3>

              <p className="text-orange-400">
                ₹{meal.priceMin}–₹{meal.priceMax}
              </p>

              <p className="text-sm text-gray-400">
                {meal.time} | {meal.location}
              </p>

              <p className="text-xs text-gray-500">
                ⏳ {getTimeLeft(meal.expiresAt)}
              </p>

              {meal.isClaimed ? (
                <button className="w-full mt-3 bg-gray-700 py-2 rounded">
                  Claimed ❌
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedMeal(meal);
                    setSelectedPrice(null);
                  }}
                  className="w-full mt-3 bg-orange-500 py-2 rounded"
                >
                  Claim ⚡
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🧾 CLAIM MODAL */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

          <div className="bg-gray-900 p-6 rounded text-center">

            <h3 className="mb-4">{selectedMeal.dish}</h3>

            {[selectedMeal.priceMin, selectedMeal.priceMax].map((price) => (
              <button
                key={price}
                onClick={() => setSelectedPrice(price)}
                className={`m-2 px-3 py-1 rounded ${
                  selectedPrice === price
                    ? "bg-orange-500"
                    : "bg-gray-800"
                }`}
              >
                ₹{price}
              </button>
            ))}

            <button
              onClick={confirmClaim}
              className="block w-full mt-3 bg-orange-500 py-2 rounded"
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