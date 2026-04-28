import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow">

      {/* LOGO */}
      <h2 className="text-xl font-bold">
        NewsClassifier AI
      </h2>

      {/* LINKS */}
      <div className="flex gap-6 items-center">

        <Link 
          to="/" 
          className="hover:text-green-400 transition"
        >
          Home
        </Link>

        <Link 
          to="/classifier"   // ✅ FIXED
          className="hover:text-green-400 transition"
        >
          Classify
        </Link>

        <Link 
          to="/about" 
          className="hover:text-green-400 transition"
        >
          About
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;