import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md h-20">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My Website</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/chatbot" className="hover:text-gray-300">ChatBot</Link>
          </li>
          <li>
            <Link to="/yield_form" className="hover:text-gray-300">Yield</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
