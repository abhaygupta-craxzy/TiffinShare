import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import IntroPage from "./templates/intropage.jsx";
import FeedPage from "./templates/FeedPage.jsx";
import PostPage from "./templates/Postpage.jsx";
import LoginPage from "./templates/loginpage.jsx";
import ProfilePage from "./templates/ProfilePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RegisterPage from "./templates/RegisterPage.jsx";
import { MealProvider } from "./templates/MealContext.jsx";

export default function App() {
  return (
    <MealProvider>
      <Router>
        <Routes>

          {/* 🌐 PUBLIC ROUTES */}
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* 🔐 PROTECTED ROUTES */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <FeedPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/postmeals"
            element={
              <ProtectedRoute>
                <PostPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </MealProvider>
  );
}