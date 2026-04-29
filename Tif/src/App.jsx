import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import IntroPage from "./IntroPage.jsx";
import FeedPage from "./FeedPage.jsx";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import PostPage from "./PostPage.jsx";
import { MealProvider } from "./MealContext";
export default function App() {
  return (
    <MealProvider>
    <Router>
      
        <Routes>
          {/* Landing Page */}
        <Route path="/" element={<IntroPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        {/* Home / Feed Page */}
        <Route path="/home" element={<FeedPage />} />
        
        <Route path="/postmeals" element={<PostPage />} />
      </Routes>
    </Router>
      </MealProvider>
  );
}