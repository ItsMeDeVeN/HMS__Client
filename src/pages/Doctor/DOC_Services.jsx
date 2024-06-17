import React from "react";
import Dashboardlayout from "../../layouts/DOCDashboardlayout";

const DOC_Services = () => {
  return (
    <div>
      <Dashboardlayout>
      <div className="flex justify-center items-center h-16 bg-gray-800 text-2xl font-bold text-gray-300">
          Services
        </div>
        <div className="bg-gray-100 px-4 py-4">Service details</div>
      </Dashboardlayout>
    </div>
  );
};

export default DOC_Services;
