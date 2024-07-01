import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUserMd, FaMedkit, FaCog, FaHeart, FaCalendarAlt, FaListAlt } from 'react-icons/fa';
import profile from './profile.jpg'; // Assuming the image is imported similarly

const Sidebar = ({ role }) => {
  const doctorLinks = [
    { to: "/Doctor/DashBoard", icon: <FaTachometerAlt className="mr-3" />, label: "Dashboard" },
    { to: "/Doctor/Appointments", icon: <FaUserMd className="mr-3" />, label: "Appointments" },
    { to: "/Doctor/Doctors", icon: <FaMedkit className="mr-3" />, label: "Doctors" },
    { to: "/Doctor/Settings", icon: <FaCog className="mr-3" />, label: "Settings" }
  ];

  const patientLinks = [
    { to: "/Patient/DashBoard", icon: <FaTachometerAlt className="mr-3" />, label: "Dashboard" },
    { to: "/Patient/Appointments", icon: <FaCalendarAlt className="mr-3" />, label: "Appointments" },
    { to: "/Patient/Doctors", icon: <FaHeart className="mr-3" />, label: "Doctors" },
    { to: "/Patient/Settings", icon: <FaCog className="mr-3" />, label: "Settings" }
  ];

  const adminLinks = [
    { to: "/Admin/DashBoard", icon: <FaTachometerAlt className="mr-3" />, label: "AdminDashboard" },
    { to: "/Admin/Patient_List", icon: <FaListAlt className="mr-3" />, label: "Patients" },
    { to: "/Admin/DOC_List", icon: <FaListAlt className="mr-3" />, label: "Doctors" },
    { to: "/Admin/Settings", icon: <FaCog className="mr-3" />, label: "Settings" }
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
    <div className="w-60 h-screen bg-gray-300 text-black fixed top-0 left-0 flex flex-col p-4">
      <div className="mb-6 text-center bg-gray-300">
        <p className='py-2'>_________________________</p>
        {/* <img src={profile} className='mt-10 hover:bg-gray-400 rounded transition transform hover:scale-105'></img> */}
        <h1 className="text-2xl font-bold">APP LOGO</h1>
        <p className='px-2'>_________________________</p>
      </div>
      <nav className="flex flex-col space-y-2 my-16 text-l">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center py-8 px-4 rounded transition transform hover:scale-105 ${
                isActive ? 'bg-gray-400' : 'hover:bg-gray-400'
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
