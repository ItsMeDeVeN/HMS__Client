import React from "react";
import PatientNavbar from "../components/PatientNavbar";

const PatientDashboardlayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-300">
      <div className=" flex-1 flex flex-col gap-5">
        <PatientNavbar />

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default PatientDashboardlayout;
