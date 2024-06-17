import React from "react";
import DOCNavbar from "../components/DOCNavbar";
import DOCSidebar from "../components/DOCSidebar";

const DOCDashboardlayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-300">
      <DOCSidebar />
      <div className="ml-60 flex-1 flex flex-col gap-5">
        <DOCNavbar />

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default DOCDashboardlayout;
