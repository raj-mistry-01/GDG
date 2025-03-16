import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-900 p-4 text-white shadow-md h-16">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold pl-20">GDG</h1>
        <ul className="flex space-x-4 pr-10">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/chatbot" className="hover:text-gray-300">ChatBot</Link>
          </li>
          <li>
            <Link to="/yield_form" className="hover:text-gray-300">Yield</Link>
          </li>
          <li>
            <Link to="/cnn" className="hover:text-gray-300">Cnn</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
