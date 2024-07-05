import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
const PatientDashboardlayout = ({ children }) => {
  return (
    <div className="flex min-h-screen max-h-full bg-slate-300">
      <ToastContainer />
      <Sidebar role="Patient" />
      <div className="ml-60 flex-1 flex flex-col gap-5">
        {/* <PatientNavbar role='patient'/> */}
        <Navbar role="Patient" />

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default PatientDashboardlayout;
