import React from "react";
import Dashboardlayout from "../../layouts/DOCDashboardlayout";

const details = "Dr. Random Generated :)";

const DoctorDashboard = () => {
  return (
    <div className="bg-slate-800">
      <Dashboardlayout>
        <div className="flex justify-center items-center h-16 bg-gray-800 text-2xl font-bold text-gray-300">
          DOC Dashboard
        </div>

        <div className="py-6 px-8 bg-cyan-900 text-yellow-200 text-3xl font-semibold rounded-md shadow-lg flex items-center justify-center my-4">
          Welcome to HMS {details}
        </div>

        
      </Dashboardlayout>
    </div>
  );
};

export default DoctorDashboard;
