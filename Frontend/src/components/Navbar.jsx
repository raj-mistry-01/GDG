import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-900 p-4 text-white shadow-md h-16">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold pl-7"><i>NeuralAgri</i></h1>
        <ul className="flex space-x-4 pr-10">
          <li>
            <Link to="/" className="text-white px-4 py-2 rounded-md hover:bg-lime-500 transition duration-300"><i><b>Home</b></i></Link>
          </li>
          <li>
            <Link to="/chatbot" className="text-white px-4 py-2 rounded-md hover:bg-lime-500 transition duration-300"><i><b>ChatBot</b></i></Link>
          </li>
          <li>
            <Link to="/yield_form" className="text-white px-4 py-2 rounded-md hover:bg-lime-500 transition duration-300"><i><b>Yield</b></i></Link>
          </li>
          <li>
            <Link to="/cnn" className="text-white px-4 py-2 rounded-md hover:bg-lime-500 transition duration-300"><i><b>Cnn</b></i></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;