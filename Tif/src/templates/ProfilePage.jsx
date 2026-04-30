import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const [myPosts, setMyPosts] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/meals/my-posts", {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => setMyPosts(data));

    fetch("http://localhost:5000/api/meals/my-orders", {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => setMyOrders(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-20">

      <h2 className="text-3xl font-bold mb-8 text-orange-400">
        My Profile 👤
      </h2>

      {/* MY POSTS */}
      <section className="mb-12">
        <h3 className="text-xl mb-4">🍱 My Posts</h3>

        {myPosts.length === 0 ? (
          <p className="text-gray-400">No posts yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {myPosts.map((meal) => (
              <div
                key={meal._id}
                className="bg-white/5 p-4 rounded-xl border border-gray-800"
              >
                <h4 className="font-semibold">{meal.dish}</h4>

                <p className="text-orange-400">
                  ₹{meal.priceMin}–₹{meal.priceMax}
                </p>

                <p className="text-sm text-gray-400">
                  {meal.time} | {meal.location}
                </p>

                <p className="text-xs mt-2">
                  {meal.isClaimed ? "Claimed ❌" : "Available ⚡"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MY ORDERS */}
      <section>
        <h3 className="text-xl mb-4">📦 My Orders</h3>

        {myOrders.length === 0 ? (
          <p className="text-gray-400">No orders yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {myOrders.map((meal) => (
              <div
                key={meal._id}
                className="bg-white/5 p-4 rounded-xl border border-gray-800"
              >
                <h4 className="font-semibold">{meal.dish}</h4>

                <p className="text-orange-400">
                  ₹{meal.priceMin}–₹{meal.priceMax}
                </p>

                <p className="text-sm text-gray-400">
                  {meal.time} | {meal.location}
                </p>

                <p className="text-xs mt-2 text-green-400">
                  Claimed by you ✅
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}