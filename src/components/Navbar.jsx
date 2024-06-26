import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profile from './profile.jpg'; // Assuming the image is imported similarly

const Navbar = ({ role }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const patientLinks = [
    { to: "/PatientDashBoard/Settings", label: "Profile Settings" },
    { to: "#", label: "Logout", action: () => { /* Add logout functionality here */ } }
  ];

  const doctorLinks = [
    { to: "/DoctorDashBoard/Settings", label: "Profile Settings" },
    { to: "#", label: "Logout", action: () => { /* Add logout functionality here */ } }
  ];

  const adminLinks = [
    { to: "/AdminDashBoard/Settings", label: "Admin Settings" },
    { to: "#", label: "Logout", action: () => { /* Add logout functionality here */ } }
  ];

  let links;
  if (role === 'Admin') {
    links = adminLinks;
  } else if (role === 'Doctor') {
    links = doctorLinks;
  } else if (role === 'Patient') {
    links = patientLinks;
  } 

  return (
    <div className="flex justify-between items-center p-4 h-20 ml-0 bg-gray-300 text-white shadow-lg">
      <h1 className="text-3xl font-bold text-black">HMS</h1>
      <div className="relative">
        <img
          src={profile}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer hover:shadow-md transform hover:scale-105 transition"
          onClick={toggleDropdown}
        />
        {dropdownVisible && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            {links.map(link => (
              link.action ? (
                <div
                  key={link.label}
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded cursor-pointer"
                  onClick={link.action}
                >
                  {link.label}
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded transition"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
