import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function IntroPage() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* 🔝 NAVBAR */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-md border-b border-gray-800">
        
        <h1
          onClick={() => navigate("/")}
          className="text-orange-400 font-bold text-lg cursor-pointer"
        >
          TiffinShare 🍱
        </h1>

        {isLoggedIn ? (
          <button
            onClick={() => navigate("/profile")}
            className="bg-orange-500 px-4 py-2 rounded-lg"
          >
            Profile 👤
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-orange-500 px-4 py-2 rounded-lg"
          >
            Login 🔐
          </button>
        )}
      </nav>

      {/* 🌟 HERO TEXT */}
      <div className="text-center max-w-2xl">

        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Tired of mess food? 😩 <br />
          <span className="text-orange-400">
            Grab ghar ka khana 🍛
          </span>
        </h2>

        <p className="text-gray-400 mb-8">
          Students around you are sharing fresh homemade meals.  
          Find something tasty, claim it, and enjoy 😋
        </p>

        {/* 🎯 CTA BUTTONS */}
        <div className="flex gap-6 justify-center flex-wrap">

          <button
            onClick={() => navigate("/home")}
            className="bg-orange-500 px-6 py-3 rounded-xl text-lg hover:scale-105 transition"
          >
            Explore Meals 🍽️
          </button>

          <button
            onClick={() =>
              isLoggedIn ? navigate("/postmeals") : navigate("/login")
            }
            className="border border-orange-400 text-orange-400 px-6 py-3 rounded-xl text-lg hover:scale-105 transition"
          >
            Share Your Tiffin 📦
          </button>

        </div>
      </div>

      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400/20 blur-3xl rounded-full"></div>

    </div>
  );
}