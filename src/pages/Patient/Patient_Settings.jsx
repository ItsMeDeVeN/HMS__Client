import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import profile from "../../components/profile.jpg"
import PatientDashboardlayout from "../../layouts/PatientDashboardlayout";
import axios from "axios";

const Patient_Settings = () => {
  const id = localStorage.getItem("User_Id");
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/getdetails", {
        id: id,
      });
      if (res.data && res.data.details) {
        setData(res.data.details);
      } else {
        console.error("Invalid response structure:", res.data);
      }
    } catch (e) {
      console.error("Error fetching doctor details:", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-slate-800 min-h-screen">
      <PatientDashboardlayout>
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-between items-center h-20 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 text-2xl font-bold px-6 shadow-lg">
          <span className="tracking-wide">Doctor Profile</span>
          <button
            onClick={() => {

            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Edit
          </button>
        </div>
        <div className="bg-gray-100 min-h-screen px-6 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:shadow-xl">
            <div className="px-8 py-6">
              <div className="flex flex-col md:flex-row items-center">
                <img
                  src={profile || "/placeholder.jpg"}
                  alt="Profile"
                  className="rounded-full h-40 w-40 object-cover shadow-lg border-4 border-white"
                />
                <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">
                    {data.name}
                  </h2>
                  <p className="text-gray-600 text-xl mb-1">
                    {data.email}
                  </p>
                  <p className="text-gray-600">{data.contact}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                  Personal Information
                </h3>
                <div className="mt-4 space-y-3">
                  <p className="text-gray-600 flex items-center">
                    <span className="font-semibold w-20">Gender:</span>
                    <span className="ml-6">{data.gender}</span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="font-semibold w-20">DOB:</span>
                    <span className="ml-6">
                      {new Date(data.dateofbirth).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="font-semibold w-20">Age:</span>
                    <span className="ml-6">{data.age}</span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="font-semibold w-20">BloodGroup:</span>
                    <span className="ml-6">{data.bloodgroup}</span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="font-semibold w-20">Medical History:</span>
                    <span className="ml-6">{data.medicalHistory}</span>
                  </p>
                </div>
              </div>

              <div className="mt-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                    Contact Information
                  </h3>
                  <div className="mt-4 space-y-3">
                    <p className="text-gray-600 flex items-center">
                      <span className="font-semibold w-20">Phone:</span>
                      <span className="ml-2">{data.contact}</span>
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="font-semibold w-20">Address:</span>
                      <span className="ml-2">{data.address}</span>
                    </p>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      </PatientDashboardlayout>
    </div>
  );
};

export default Patient_Settings;
