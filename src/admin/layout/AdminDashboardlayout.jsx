import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
const AdminDashboardlayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-300">
      <Sidebar role='Admin'/>
      
      <div className="ml-60 flex-1 flex flex-col gap-5">
        {/* <AdminNavbar role='admin'/> */}
        <Navbar role='Admin'/>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default AdminDashboardlayout;