import React from "react";
import AdminDashboardlayout from "../layout/AdminDashboardlayout"


const details = "Admin  :)";

const AdminDashboard = () => {
  return (
    <div className="bg-slate-800">
      <AdminDashboardlayout>
        <div className="flex justify-center items-center h-16 bg-gray-800 text-2xl font-bold text-gray-300">
          Admin Dashboard
        </div>

        <div className="py-6 px-8 bg-cyan-900 text-yellow-200 text-3xl font-semibold rounded-md shadow-lg flex items-center justify-center my-4">
          Welcome to HMS {details}
        </div>
        
        </AdminDashboardlayout>
        
    </div>
  );
};

export default AdminDashboard;
