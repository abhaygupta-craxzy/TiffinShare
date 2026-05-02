import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
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
        alert(data.message || "Registration failed");
        return;
      }

      // ✅ Save token (auto login)
      localStorage.setItem("token", data.token);

      // 🚀 Redirect
      window.location.href = "/home";

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">

      <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-gray-800 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 text-orange-400">
          Create Account ✨
        </h2>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-2 rounded bg-gray-900 border border-gray-700"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 rounded bg-gray-900 border border-gray-700"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 rounded bg-gray-900 border border-gray-700"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full bg-orange-500 py-2 rounded hover:scale-105 transition"
        >
          Register 🚀
        </button>

        {/* SWITCH */}
        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-orange-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}