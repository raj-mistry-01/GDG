import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-green-900 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold pl-7">
          <i>NeuralAgri</i>
        </h1>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <ul className="hidden md:flex space-x-4 pr-10">
          <li>
            <Link
              to="/"
              className="text-white px-4 py-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            >
              <i><b>Home</b></i>
            </Link>
          </li>
          <li>
            <Link
              to="/chatbot"
              className="text-white px-4 py-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            >
              <i><b>ChatBot</b></i>
            </Link>
          </li>
          <li>
            <Link
              to="/yield_form"
              className="text-white px-4 py-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            >
              <i><b>Yield</b></i>
            </Link>
          </li>
          <li>
            <Link
              to="/cnn"
              className="text-white px-4 py-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            >
              <i><b>Plant Disease Detector</b></i>
            </Link>
          </li>
          <li>
            <Link
              to="/crop_advice"
              className="text-white px-4 py-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            >
              <i><b>Crop Advisory</b></i>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="text-white px-4 py-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            >
              <i><b>Dashboard</b></i>
            </Link>
          </li>
        </ul>
      </div>

      <ul
        className={`md:hidden mt-4 space-y-2 px-4 overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <li>
          <Link
            to="/"
            className="block text-white px-4 py-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i><b>Home</b></i>
          </Link>
        </li>
        <li>
          <Link
            to="/chatbot"
            className="block text-white px-4 py-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i><b>ChatBot</b></i>
          </Link>
        </li>
        <li>
          <Link
            to="/yield_form"
            className="block text-white px-4 py-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i><b>Yield</b></i>
          </Link>
        </li>
        <li>
          <Link
            to="/cnn"
            className="block text-white px-4 py-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i><b>Plant Disease Detector</b></i>
          </Link>
        </li>
        <li>
          <Link
            to="/crop_advice"
            className="block text-white px-4 py-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i><b>Crop Advisory</b></i>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className="block text-white px-4 py-2 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i><b>Dashboard</b></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;