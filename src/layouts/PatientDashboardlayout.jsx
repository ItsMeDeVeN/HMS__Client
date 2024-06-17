import React from "react";
import PatientNavbar from "../components/PatientNavbar";
import PatientSidebar from "../components/PatientSidebar";

const PatientDashboardlayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-300">
      <PatientSidebar />
      <div className="ml-60 flex-1 flex flex-col gap-5">
        <PatientNavbar />

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default PatientDashboardlayout;
