import React, { useEffect, useState } from "react";
import { logout } from "../utils/auth";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    bio: "",
    avatar: "",
  });

  const token = localStorage.getItem("token");

  // 📥 Load profile
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: token },
    })
      .then(res => res.json())
      .then(data => setProfile(data));
  }, []);

  // 💾 Save profile
  const saveProfile = async () => {
    await fetch("http://localhost:5000/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(profile),
    });

    alert("Profile updated ✅");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      <h2 className="text-2xl mb-6 text-orange-400">My Profile 👤</h2>

      {/* Avatar */}
      {profile.avatar && (
        <img
          src={profile.avatar}
          className="w-24 h-24 rounded-full mb-4"
        />
      )}

      <input
        placeholder="Name"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        className="block mb-3 p-2 bg-gray-800 w-full"
      />

      <input
        placeholder="Phone"
        value={profile.phone}
        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        className="block mb-3 p-2 bg-gray-800 w-full"
      />

      <input
        placeholder="Avatar URL"
        value={profile.avatar}
        onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
        className="block mb-3 p-2 bg-gray-800 w-full"
      />

      <textarea
        placeholder="Bio"
        value={profile.bio}
        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        className="block mb-3 p-2 bg-gray-800 w-full"
      />

      <button
        onClick={saveProfile}
        className="bg-orange-500 px-4 py-2 rounded"
      >
        Save Profile 💾
      </button>

      <button
        onClick={logout}
        className="ml-4 bg-red-500 px-4 py-2 rounded"
      >
        Logout 🚪
      </button>
    </div>
  );
}