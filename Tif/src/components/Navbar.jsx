import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkSession } from "../utils/CheckSession";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token") && checkSession();

  // Don't show navbar on IntroPage
  if (location.pathname === "/") return null;

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4 bg-black/40 backdrop-blur-md border-b border-gray-800 flex justify-between items-center">
      <h1
        onClick={() => navigate("/")}
        className="text-orange-400 font-bold text-xl cursor-pointer hover:text-orange-300 transition"
      >
        TiffinShare 🍱
      </h1>

      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate("/home")}
          className={`text-sm font-medium hover:text-orange-400 transition ${location.pathname === "/home" ? "text-orange-400" : "text-gray-300"}`}
        >
          Explore
        </button>
        <button
          onClick={() => navigate("/leaderboard")}
          className={`text-sm font-medium hover:text-orange-400 transition flex items-center ${location.pathname === "/leaderboard" ? "text-orange-400" : "text-gray-300"}`}
        >
          <span className="mr-1">🏆</span> Leaderboard
        </button>
        
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/postmeals")}
              className={`text-sm font-medium hover:text-orange-400 transition ${location.pathname === "/postmeals" ? "text-orange-400" : "text-gray-300"}`}
            >
              Post Meal
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
            >
              Profile 👤
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
          >
            Login 🔐
          </button>
        )}
      </div>
    </nav>
  );
}