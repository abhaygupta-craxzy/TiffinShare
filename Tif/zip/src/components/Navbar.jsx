import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <h2 style={{ color:"#FF7A00", cursor:"pointer" }} onClick={() => navigate("/")}>
        TiffinShare 🍱
      </h2>
      <div>
        <button className="btn-secondary" onClick={() => navigate("/home")}>
          Explore
        </button>
      </div>
    </div>
  );
}