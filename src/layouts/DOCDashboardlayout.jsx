import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
const DOCDashboardlayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-300">
      <ToastContainer />
      <Sidebar role='Doctor'/>
      
      <div className="ml-60 flex-1 flex flex-col gap-5">
        {/* <DOCNavbar role='doctor'/> */}
        <Navbar role='Doctor'/>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default DOCDashboardlayout;
