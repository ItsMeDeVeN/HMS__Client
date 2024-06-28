import React, { useEffect, useState } from "react";
import DOCDashboardlayout from "../../layouts/DOCDashboardlayout";
import axios from "axios";
import profile from "../../components/profile.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DOC_Settings = () => {
  const id = localStorage.getItem("User_Id");
  const [data, setData] = useState({
    name: "",
    department: "",
    email: "",
    gender: "",
    dateofbirth: "",
    age: "",
    consultingfee: "",
    availability: [],
    contact: "",
    address: "",
  });

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
    <DOCDashboardlayout>
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-between items-center h-20 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 text-2xl font-bold px-6 shadow-lg">
          <span className="tracking-wide">Doctor Profile</span>
          <button
            onClick={() => {
              console.log(data.availability);
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
                    {data.department}
                  </p>
                  <p className="text-gray-600">{data.email}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                  Personal Information
                </h3>
                <div className="mt-4 space-y-3">
                  <p className="text-gray-600 flex items-center">
                    <span className="font-semibold w-20">Gender:</span>
                    <span className="ml-2">{data.gender}</span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="font-semibold w-20">DOB:</span>
                    <span className="ml-2">
                      {new Date(data.dateofbirth).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="font-semibold w-20">Age:</span>
                    <span className="ml-2">{data.age}</span>
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                  Professional Information
                </h3>
                <div className="mt-4 space-y-3">
                  <p className="text-gray-600 flex items-center">
                    <span className="font-semibold w-40">Department:</span>
                    <span className="ml-2">{data.department}</span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="font-semibold w-40">Consulting Fee:</span>
                    <span className="ml-2">Rs.{data.consultingfee}</span>
                  </p>
                </div>
                <h2 className="text-gray-600 pt-2 flex items-center font-semibold w-40">
                  Availability:
                </h2>
                {data.availability && data.availability.length > 0 ? (
                  <div>
                    <div className="flex items-start mt-2">
                      <div className="w-1/3">
                        <h3 className="text-lg font-medium text-gray-700">
                          Day
                        </h3>
                      </div>
                      <div className="w-2/3">
                        <h3 className="text-lg font-medium text-gray-700">
                          Timing
                        </h3>
                      </div>
                    </div>
                    {data.availability.map((slot, index) => (
                      <div key={index} className="flex items-start mt-2">
                        <div className="w-1/3">
                          <p className="text-gray-600">{slot.day}</p>
                        </div>
                        <div className="w-2/3">
                          <p className="text-gray-600">{slot.timeSlot}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-600 flex items-center">
                  <span>No Data found</span>
                  </div>
                )}

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
      </div>
      <ToastContainer />
    </DOCDashboardlayout>
  );
};

export default DOC_Settings;
