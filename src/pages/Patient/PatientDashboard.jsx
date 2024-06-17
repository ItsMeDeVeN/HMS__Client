import React from "react";
import PatientDashboardlayout from "../../layouts/PatientDashboardlayout";

const PatientDashboard = () => {
  const details = "John Doe";

  return (
    <div className="bg-slate-800">
      <PatientDashboardlayout>
        <div className="flex justify-center items-center h-16 bg-gray-800 text-2xl font-bold text-gray-300">
          Patient Dashboard
        </div>

        <div className="py-6 px-8 bg-cyan-900 text-yellow-200 text-3xl font-semibold rounded-md shadow-lg flex items-center justify-center my-4">
          Welcome to HMS {details}
        </div>
      </PatientDashboardlayout>
    </div>
  );
};

export default PatientDashboard;
