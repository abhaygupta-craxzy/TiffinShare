import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative flex flex-col">
      {/* Background Orbs for deep glassmorphic effect */}
      <div className="bg-gradient-orb bg-orange-600/30 w-[40vw] h-[40vw] top-[-10vw] left-[-10vw]"></div>
      <div className="bg-gradient-orb bg-purple-600/20 w-[30vw] h-[30vw] bottom-[-5vw] right-[-5vw]"></div>
      <div className="bg-gradient-orb bg-indigo-600/20 w-[20vw] h-[20vw] top-[40%] left-[20%]"></div>

      <Navbar />
      <main className="flex-grow z-10 w-full">
        {children}
      </main>
    </div>
  );
}
