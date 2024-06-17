import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaCalendarCheck, FaUserMd, FaCog } from 'react-icons/fa';

const PatientSidebar = () => {
  return (
    <div className="w-60 h-screen bg-gray-300 text-blue-900 fixed top-0 left-0 flex flex-col p-4">
      <div className="mb-6 text-center">
        <p className='py-2'>_________________________</p>
        <h1 className="text-2xl font-bold">APP LOGO</h1>
        <p className='px-2'>_________________________</p>
      </div>
      <nav className="flex flex-col space-y-2 my-14 text-l">
        <Link to="/PatientDashBoard" className="flex items-center py-8 px-4 hover:bg-gray-400 rounded transition">
          <FaTachometerAlt className="mr-3" />
          <span>Dashboard</span>
        </Link>
        <Link to="/PatientDashBoard/Appointments" className="flex items-center py-8 px-4 hover:bg-gray-400 rounded transition">
          <FaCalendarCheck className="mr-3" />
          <span>Appointments</span>
        </Link>
        <Link to="/PatientDashBoard/Patient_DOCList" className="flex items-center py-8 px-4 hover:bg-gray-400 rounded transition">
        <FaUserMd className="mr-3" />
          <span>Doc List</span>
        </Link>
        <Link to="/PatientDashBoard/Settings" className="flex items-center py-8 px-4 hover:bg-gray-400 rounded transition">
          <FaCog className="mr-3" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default PatientSidebar;
