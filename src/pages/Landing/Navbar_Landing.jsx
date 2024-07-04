import React from 'react'
import { useNavigate } from 'react-router-dom';


const Navbar_Landing = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("Role")

    if(role === "Doctor"){
      var link = '/Doctor/DashBoard';
    }
    else if(role === "Patient"){
      var link = '/Patient/DashBoard';
    }
    else if(role === "Admin"){
      var link = '/Admin/DashBoard';
    }
    else{
      var link = '/login';
    }

    return (
        <header className="bg-gradient-to-r from-blue-300 to-blue-500 text-white p-6 flex justify-between items-center shadow-xl">
          
          <nav className="flex space-x-8 justify-center text-slate-900 font-bold">
            <p className="hover:underline cursor-pointer pl-52 " onClick={() => navigate(link)}>
              Home
            </p>
            <p className="hover:underline cursor-pointer pl-20" onClick={() => navigate('/about')}>
              About Us
            </p>
            <p className="hover:underline cursor-pointer pl-20" onClick={() => navigate('/services')}>
              Services
            </p>
            <p className="hover:underline cursor-pointer px-20" onClick={() => navigate('/contact')}>
              Contact Us
            </p>
          </nav>
        </header>
      );
}

export default Navbar_Landing
