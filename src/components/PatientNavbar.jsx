import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profile from './profile.jpg'; // Assuming the image is imported similarly
import { FaTachometerAlt, FaCalendarCheck, FaUserMd, FaCog } from 'react-icons/fa';

const PatientNavbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="flex justify-between items-center p-4 h-20 bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg">
      <h1 className="text-3xl font-bold text-black">HMS</h1>
      <nav className="flex space-x-8 text-black">
        <Link to="/PatientDashBoard" className="flex items-center py-2 px-4 hover:bg-teal-500 rounded transition transform hover:scale-105">
          <FaTachometerAlt className="mr-2" />
          <span>Dashboard</span>
        </Link>
        <Link to="/PatientDashBoard/Appointments" className="flex items-center py-2 px-4 hover:bg-teal-500 rounded transition transform hover:scale-105">
          <FaCalendarCheck className="mr-2" />
          <span>Appointments</span>
        </Link>
        <Link to="/PatientDashBoard/Patient_DOCList" className="flex items-center py-2 px-4 hover:bg-teal-500 rounded transition transform hover:scale-105">
          <FaUserMd className="mr-2" />
          <span>Doc List</span>
        </Link>
        <Link to="/PatientDashBoard/Settings" className="flex items-center py-2 px-4 hover:bg-teal-500 rounded transition transform hover:scale-105">
          <FaCog className="mr-2" />
          <span>Settings</span>
        </Link>
      </nav>
      <div className="relative">
        <img
          src={profile}
          alt="Patient Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer hover:shadow-md transform hover:scale-105 transition"
          onClick={toggleDropdown}
        />
        {dropdownVisible && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <Link to="/PatientDashBoard/Settings" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded transition">
              Profile Settings
            </Link>
            <div className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded cursor-pointer">
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientNavbar;
