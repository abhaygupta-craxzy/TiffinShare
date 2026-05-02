import React from "react";
import Button from "./Button";
import "../styles/theme.css";

export default function MealCard({ meal, onClaim, claimed }) {
  return (
    <div className="card">
      <img
        src={meal.image}
        className="card-img"
        onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
      />
      <h3>{meal.dish}</h3>
      <p>₹{meal.priceMin}–₹{meal.priceMax}</p>
      <p style={{ fontSize:"12px", color:"#9CA3AF" }}>
        ⏰ {meal.time} | 📍 {meal.location}
      </p>

      {claimed ? (
        <Button disabled>Claimed ❌</Button>
      ) : (
        <Button onClick={() => onClaim(meal)}>Claim ⚡</Button>
      )}
    </div>
  );
}