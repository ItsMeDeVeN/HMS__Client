import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Dashboardlayout from "../../layouts/DOCDashboardlayout";

const DOC_DOCList = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/alldoctors`);
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data.doctors);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
      toast.error("Failed to fetch data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
      <Dashboardlayout>
      <div className="flex justify-center items-center h-16 bg-gray-800 text-2xl font-bold text-gray-300">
          DOCLIST
        </div>
        <div className="bg-gray-100 px-4 py-4">DOCList</div>
      </Dashboardlayout>
    </div>
  );
};

export default DOC_DOCList;
