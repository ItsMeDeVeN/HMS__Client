import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUserMd, FaMedkit, FaCog } from 'react-icons/fa';

const DOCSidebar = () => {
  return (
    <div className="w-60 h-screen bg-gray-300 text-blue-900 fixed top-0 left-0 flex flex-col p-4">
      <div className="mb-6 text-center bg-gray-300">
      <p className='py-2'>_________________________</p>
        <h1 className="text-2xl font-bold">APP LOGO</h1>
      <p className='px-2'>_________________________</p>
      </div>
      <nav className="flex flex-col space-y-2 my-14 text-l">
        <Link to="/DoctorDashBoard" className="flex items-center py-8 px-4 hover:bg-gray-400 rounded transition">
          <FaTachometerAlt className="mr-3" />
          <span>Dashboard</span>
        </Link>
        <Link to="/DoctorDashBoard/Appointments" className="flex items-center py-8 px-4 hover:bg-gray-400 rounded transition">
          <FaUserMd className="mr-3" />
          <span>Appointments</span>
        </Link>
        <Link to="/DoctorDashBoard/Services" className="flex items-center py-8 px-4 hover:bg-gray-400 rounded transition">
          <FaMedkit className="mr-3" />
          <span>Services</span>
        </Link>
        <Link to="/DoctorDashBoard/Settings" className="flex items-center py-8 px-4 hover:bg-gray-400 rounded transition">
          <FaCog className="mr-3" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default DOCSidebar;
