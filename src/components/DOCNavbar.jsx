import React, { useState } from "react";
import profile from "./profile.jpg";
import { Link } from 'react-router-dom';
const DOCNavbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  // var heading = "DOC Dashboard";
  return (
    <div className="flex justify-between p-4 h-28  px-6 bg-gray-300">
      <h1 className="text-4xl mt-4 font-bold text-indigo-900">HMS</h1>
      <div className="relative" onClick={toggleDropdown}>
        <img
          src={profile}
          alt="Doctor Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer hover:shadow-md scale-105"

        />
        {dropdownVisible && (
           <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
           <Link to="/DoctorDashBoard/Settings" className="block py-4 px-4 hover:bg-slate-200 rounded transition">
             Profile Settings
           </Link>
           <div className="block py-4 px-4 hover:bg-slate-200 rounded cursor-pointer">
             Logout
           </div>
         </div>
        )}
      </div>
    </div>
  );
};

export default DOCNavbar;
