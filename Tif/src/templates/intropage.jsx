import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function IntroPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-purple-500/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* 🌟 HERO TEXT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-3xl z-10"
      >
        <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full glass-card border border-orange-500/30 text-orange-400 text-sm font-semibold tracking-wide uppercase">
          Say goodbye to boring mess food 🚀
        </motion.div>

        <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
          Craving <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 glow-text">Ghar Ka Khana?</span>
        </motion.h2>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
          Students around you are sharing fresh, homemade meals. 
          Discover tasty dishes, claim them instantly, and enjoy real food.
        </motion.p>

        {/* 🎯 CTA BUTTONS */}
        <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-col sm:flex-row">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/home")}
            className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-orange-500/40 transition-all text-white"
          >
            Explore Meals 🍽️
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (isLoggedIn ? navigate("/postmeals") : navigate("/login"))}
            className="glass-card border border-white/10 hover:border-orange-400/50 hover:bg-white/5 px-8 py-4 rounded-xl text-lg font-semibold transition-all text-white"
          >
            Share Your Tiffin 📦
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}