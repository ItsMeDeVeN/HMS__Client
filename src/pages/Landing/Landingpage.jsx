import React from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import Navbar_Landing from './Navbar_Landing';
import { ToastContainer } from 'react-toastify';

const Landingpage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Navbar_Landing />
      <ToastContainer/>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 text-gray-800">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Hospital Management System</h2>
        <div className="flex space-x-4 mb-8">
        </div>
        <p className="text-lg mb-8">Manage your hospital efficiently with our comprehensive system.</p>
        <div className="flex space-x-4">
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Learn More
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Contact Us
          </button>
        </div>
      </div>
    </>
  );
};

export default Landingpage;
