import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserMd,
  FaMedkit,
  FaCog,
  FaHeart,
  FaCalendarAlt,
  FaListAlt,
} from "react-icons/fa";
import logo from "./Logo.jpg"; // Assuming the image is imported similarly

const Sidebar = ({ role }) => {
  const doctorLinks = [
    {
      to: "/doctor/dashboard",
      icon: <FaTachometerAlt className="mr-3" />,
      label: "Dashboard",
    },
    {
      to: "/doctor/appointments",
      icon: <FaUserMd className="mr-3" />,
      label: "Appointments",
    },
    {
      to: "/doctor/doctors",
      icon: <FaMedkit className="mr-3" />,
      label: "Doctors",
    },
    {
      to: "/doctor/settings",
      icon: <FaCog className="mr-3" />,
      label: "Settings",
    },
  ];

  const patientLinks = [
    {
      to: "/patient/dashboard",
      icon: <FaTachometerAlt className="mr-3" />,
      label: "Dashboard",
    },
    {
      to: "/patient/appointments",
      icon: <FaCalendarAlt className="mr-3" />,
      label: "Appointments",
    },
    {
      to: "/patient/doctors",
      icon: <FaHeart className="mr-3" />,
      label: "Doctors",
    },
    {
      to: "/patient/settings",
      icon: <FaCog className="mr-3" />,
      label: "Settings",
    },
  ];

  const adminLinks = [
    {
      to: "/admin/dashboard",
      icon: <FaTachometerAlt className="mr-3" />,
      label: "AdminDashboard",
    },
    {
      to: "/admin/patients",
      icon: <FaListAlt className="mr-3" />,
      label: "Patients",
    },
    {
      to: "/admin/doctors",
      icon: <FaListAlt className="mr-3" />,
      label: "Doctors",
    },
  ];

  let links;
  if (role === "Admin") {
    links = adminLinks;
  } else if (role === "Doctor") {
    links = doctorLinks;
  } else if (role === "Patient") {
    links = patientLinks;
  }

  return (
    <div className="w-60 h-screen bg-gray-300 text-black fixed top-0 left-0 flex flex-col p-4 shadow-lg">
      <div className="mb-6 text-center bg-gray-300">
        <img
          src={logo}
          className="mt-10 ml-10 w-32 h-32 cursor-pointer hover:bg-gray-400 rounded-full transition transform hover:scale-105"
        ></img>
      </div>
      <nav className="flex flex-col space-y-2 gap-4 my-16 text-l">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center py-6 px-4 rounded transition transform hover:scale-105 ${
                isActive ? "bg-gray-400" : "hover:bg-gray-400"
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
