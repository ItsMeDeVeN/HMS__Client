import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../layouts/DOCDashboardlayout";
import axios from "axios";


const DoctorDashboard = () => {
  const [data, setData] = useState([]);
    
  
  const fetchData = async() => {
    try {
      const id = localStorage.getItem("User_Id")
      const res = await axios.post("http://localhost:3000/api/getdetails", {
        id: id,
      });
      setData(res.data.details);
    } catch (e) {
      console.error("Error fetching doctor details:", e);
    }
  }

useEffect(() => {
  fetchData()
},[])
  return (
    <div className="bg-slate-800">
      <Dashboardlayout>
        <div className="flex justify-center items-center h-16 bg-gray-800 text-2xl font-bold text-gray-300">
          DOC Dashboard
        </div>

        <div className="py-6 px-8 bg-cyan-900 text-yellow-200 text-3xl font-semibold rounded-md shadow-lg flex items-center justify-center my-4">
          Welcome to HMS {data.name}
        </div>

        
      </Dashboardlayout>
    </div>
  );
};

export default DoctorDashboard;
