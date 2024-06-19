import React from "react";
import DOCNavbar from "../components/DOCNavbar";
const DOCDashboardlayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-300">
      <div className="flex-1 flex flex-col gap-5">
        <DOCNavbar />

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default DOCDashboardlayout;
