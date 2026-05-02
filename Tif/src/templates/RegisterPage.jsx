import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRefCode = searchParams.get("ref") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    referredCode: initialRefCode,
  });
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // ✅ Save token (auto login)
      localStorage.setItem("token", data.token);
      localStorage.setItem("loginTime", Date.now());

      // 🚀 Redirect
      window.location.href = "/home";

    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-md p-8 relative overflow-hidden"
      >
        <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-purple-500/30 blur-3xl rounded-full pointer-events-none"></div>

        <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 glow-text">
          Create Account ✨
        </h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm mb-4 text-center bg-red-500/10 p-2 rounded"
          >
            {error}
          </motion.p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg glass-input"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg glass-input"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg glass-input"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <input
            type="text"
            placeholder="Referral Code (Optional)"
            value={form.referredCode}
            className="w-full px-4 py-3 rounded-lg glass-input text-orange-200 placeholder-orange-500/50"
            onChange={(e) => setForm({ ...form, referredCode: e.target.value })}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-orange-500/25 mt-4"
          >
            Register 🚀
          </motion.button>
        </div>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <span
            className="text-orange-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}