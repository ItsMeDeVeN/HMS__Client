import React from "react";
import { useNavigate } from "react-router-dom";

const NavbarLanding = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("Role");

  if (role === "Doctor") {
    var link = "/doctor/dashboard";
  } else if (role === "Patient") {
    var link = "/patient/dashboard";
  } else if (role === "Admin") {
    var link = "/admin/dashboard";
  } else {
    var link = "/login";
  }

  return (
    <header className="bg-gradient-to-r from-blue-300 to-blue-500 text-white p-6 flex justify-between items-center shadow-xl">
      <nav className="flex space-x-8 justify-center text-slate-900 font-bold">
        <p
          className="hover:underline cursor-pointer pl-52 "
          onClick={() => navigate(link)}
        >
          Home
        </p>
        <p
          onClick={() => {
            document
              .getElementById("about-us")
              .scrollIntoView({ behavior: "smooth" });
          }}
          className="hover:underline cursor-pointer pl-20"
        >
          About Us
        </p>
        <p
          onClick={() => {
            document
              .getElementById("about-us")
              .scrollIntoView({ behavior: "smooth" });
          }}
          className="hover:underline cursor-pointer pl-20"
        >
          Services
        </p>
        <p
          onClick={() => {
            document
              .getElementById("about-us")
              .scrollIntoView({ behavior: "smooth" });
          }}
          className="hover:underline cursor-pointer px-20"
        >
          Contact Us
        </p>
      </nav>
    </header>
  );
};

export default NavbarLanding;
