import React, { useEffect, useState } from "react";
import { logout } from "../utils/auth";
import { motion, AnimatePresence } from "framer-motion";
import RatingModal from "../components/RatingModal";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile"); // profile, posts, claims
  
  const [profile, setProfile] = useState({
    name: "", phone: "", bio: "", avatar: "", ratingAverage: 0, ratingCount: 0,
  });
  
  const [myPosts, setMyPosts] = useState([]);
  const [myClaims, setMyClaims] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const token = localStorage.getItem("token");

  // 📥 Load profile & meals
  useEffect(() => {
    // Load Profile
    fetch("http://localhost:5000/api/auth/profile", { headers: { Authorization: token } })
      .then(res => res.json())
      .then(data => { if(data && !data.message) setProfile(data); })
      .catch(err => console.error(err));

    // Load Posts
    fetch("http://localhost:5000/api/meals/my-posts", { headers: { Authorization: token } })
      .then(res => res.json())
      .then(data => setMyPosts(data || []))
      .catch(err => console.error(err));

    // Load Claims
    fetch("http://localhost:5000/api/meals/my-claims", { headers: { Authorization: token } })
      .then(res => res.json())
      .then(data => setMyClaims(data || []))
      .catch(err => console.error(err));
  }, [token]);

  // 💾 Save profile
  const saveProfile = async () => {
    setIsLoading(true);
    try {
      await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(profile),
      });
      alert("Profile updated ✅");
    } catch(err) {
      alert("Failed to update profile");
    }
    setIsLoading(false);
  };

  const handleReviewSubmit = async (rating, reviewText, mealId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/meals/${mealId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({ rating, reviewText }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed to submit review");
        return;
      }
      
      alert("Review submitted! Thank you! 🌟");
      
      // Refresh claims
      fetch("http://localhost:5000/api/meals/my-claims", { headers: { Authorization: token } })
        .then(res => res.json())
        .then(data => setMyClaims(data || []));
        
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const renderMealGrid = (meals, isClaimsTab) => {
    if(meals.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No meals found.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meals.map(meal => (
          <div key={meal._id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4">
            <img 
              src={meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800"} 
              className="w-20 h-20 rounded-lg object-cover" 
              alt={meal.dish} 
            />
            <div className="flex-grow">
              <h4 className="font-bold text-lg text-white leading-tight">{meal.dish}</h4>
              <p className="text-orange-400 text-sm font-semibold">₹{meal.priceMin} - ₹{meal.priceMax}</p>
              
              {isClaimsTab ? (
                <div>
                  <p className="text-xs text-gray-400 mt-2 mb-2">
                    Chef: <span className="text-gray-200">{meal.userId?.name || "Unknown"}</span>
                  </p>
                  {meal.rating ? (
                    <div className="bg-black/20 p-2 rounded border border-white/5 mt-2">
                      <div className="text-yellow-400 text-xs">{"★".repeat(meal.rating)}</div>
                      <p className="text-xs text-gray-300 italic mt-1">"{meal.reviewText}"</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedMeal(meal);
                        setRatingModalOpen(true);
                      }}
                      className="text-xs border border-orange-500/50 text-orange-400 hover:bg-orange-500/20 px-3 py-1.5 rounded-md transition-colors w-full mt-1"
                    >
                      Leave Review
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-xs mt-2">
                    Status: {meal.isClaimed ? (
                      <span className="text-green-400">Claimed by {meal.claimedBy?.name || "Someone"}</span>
                    ) : (
                      <span className="text-yellow-400">Available</span>
                    )}
                  </p>
                  {meal.isClaimed && meal.rating && (
                    <div className="bg-black/20 p-2 rounded border border-white/5 mt-2">
                      <div className="text-yellow-400 text-xs">{"★".repeat(meal.rating)}</div>
                      <p className="text-xs text-gray-300 italic mt-1">"{meal.reviewText}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex justify-center py-12 px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-3xl p-6 sm:p-8 relative overflow-hidden"
      >
        <div className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-purple-500/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2">
              Dashboard
            </h2>
            <div className="flex items-center space-x-1 bg-black/30 px-3 py-1.5 rounded-full border border-white/5 inline-flex">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="font-bold text-white">{profile.ratingAverage ? profile.ratingAverage.toFixed(1) : "New"}</span>
              <span className="text-xs text-gray-400 ml-1">({profile.ratingCount || 0} ratings)</span>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-semibold px-4 py-2 rounded-lg transition-all text-sm"
          >
            Logout 🚪
          </button>
        </div>

        {/* TABS */}
        <div className="flex space-x-2 mb-8 bg-black/20 p-1 rounded-lg border border-white/5">
          {["profile", "posts", "claims"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === tab 
                ? "bg-orange-500/20 text-orange-400 shadow-sm" 
                : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              {tab === "profile" && "Profile Data"}
              {tab === "posts" && "My Posts"}
              {tab === "claims" && "My Claims"}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
            >
              <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-orange-500/50 flex-shrink-0 bg-gray-800">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">👨‍🍳</div>
                  )}
                </div>
                
                <div className="flex-grow space-y-4 w-full">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <input
                      value={profile.name || ""}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg glass-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                    <input
                      placeholder="Phone Number"
                      value={profile.phone || ""}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg glass-input"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Avatar URL</label>
                  <input
                    placeholder="https://..."
                    value={profile.avatar || ""}
                    onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg glass-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                  <textarea
                    placeholder="Tell us about your cooking..."
                    value={profile.bio || ""}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg glass-input min-h-[100px]"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={saveProfile}
                disabled={isLoading}
                className="w-full mt-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-orange-500/25"
              >
                {isLoading ? "Saving..." : "Save Profile 💾"}
              </motion.button>
            </motion.div>
          )}

          {activeTab === "posts" && (
            <motion.div key="posts" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
              {renderMealGrid(myPosts, false)}
            </motion.div>
          )}

          {activeTab === "claims" && (
            <motion.div key="claims" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
              {renderMealGrid(myClaims, true)}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {selectedMeal && (
        <RatingModal
          isOpen={ratingModalOpen}
          onClose={() => {
            setRatingModalOpen(false);
            setTimeout(() => setSelectedMeal(null), 300);
          }}
          targetMeal={selectedMeal}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
}