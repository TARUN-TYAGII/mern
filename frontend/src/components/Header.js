import React from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo / Title */}
        <div className="text-2xl font-semibold">
          <Link to="/" className="hover:text-gray-400 transition duration-300">
            Goal Setter
          </Link>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          <ul className="flex items-center space-x-6">
            <li className="flex items-center">
              <Link
                to="/login"
                className="flex items-center space-x-1 hover:text-gray-400 transition duration-300"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to="/register"
                className="flex items-center space-x-1 hover:text-gray-400 transition duration-300"
              >
                <FaUser />
                <span>Register</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
