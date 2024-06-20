import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
const PatientDashboardlayout = ({ children }) => {
  return (
    <div className="flex h-full bg-slate-300">

      <Sidebar role='Patient'/>
      <div className="ml-60 flex-1 flex flex-col gap-5">
        {/* <PatientNavbar role='patient'/> */}
        <Navbar role='Patient'/>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default PatientDashboardlayout;
