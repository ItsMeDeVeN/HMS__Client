import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PatientDashboardlayout from "../../layouts/PatientDashboardlayout";

const Patient_DOCList = () => {
  const [data, setData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

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
      <PatientDashboardlayout>
        {selectedDoctor ? (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mb-6"
            >
              Back
            </button>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 pb-4 border-b-2 border-gray-300">
              Doctor Details
            </h1>
            <div className="space-y-6 text-lg">
              <div className="flex items-start">
                <div className="w-1/3">
                  <h2 className="text-xl font-semibold text-gray-700">Name:</h2>
                </div>
                <div className="w-2/3">
                  <p className="text-gray-600">{selectedDoctor.name}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-1/3">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Email:
                  </h2>
                </div>
                <div className="w-2/3">
                  <p className="text-gray-600">{selectedDoctor.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-1/3">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Contact:
                  </h2>
                </div>
                <div className="w-2/3">
                  <p className="text-gray-600">{selectedDoctor.contact}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-1/3">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Gender:
                  </h2>
                </div>
                <div className="w-2/3">
                  <p className="text-gray-600">{selectedDoctor.gender}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-1/3">
                  <h2 className="text-xl font-semibold text-gray-700">Age:</h2>
                </div>
                <div className="w-2/3">
                  <p className="text-gray-600">{selectedDoctor.age}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-1/3">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Department:
                  </h2>
                </div>
                <div className="w-2/3">
                  <p className="text-gray-600">{selectedDoctor.department}</p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-700">
                  Availability:
                </h2>
                {selectedDoctor.availability.length > 0 ? (
                  <>
                    <div className="flex items-start mt-4">
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
                    {selectedDoctor.availability.map((slot, index) => (
                      <div key={index} className="flex items-start mt-2">
                        <div className="w-1/3">
                          <p className="text-gray-600">{slot.day}</p>
                        </div>
                        <div className="w-2/3">
                          <p className="text-gray-600">{slot.timeSlot}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-gray-600">No Data available</p>
                )}
              </div>

              <div className="flex items-start">
                <div className="w-1/3">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Consulting Fees:
                  </h2>
                </div>
                <div className="w-2/3">
                  <p className="text-gray-600">
                    Rs.{selectedDoctor.consultingfee}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-300 shadow-md rounded mb-6 mx-4 ">
            <div className="flex justify-center items-center h-16 bg-gray-800 text-2xl font-bold text-gray-300">
              Doctor List
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
              {data.map((user, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between cursor-pointer hover:bg-gray-200 hover:shadow-lg transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <div>
                    <h3 className="text-xl underline decoration-solid *: text-center mb-4 text-black font-bold">
                      {user.name}
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <strong>Department:</strong> {user.department}
                    </p>
                    <p className="text-gray-700 mb-4">
                      <strong>Contact:</strong> {user.contact}
                    </p>
                    <div className="mt-4">
                      <h2 className="font-bold text-gray-700">Availability:</h2>
                      {user.availability.length > 0 ? (
                        <>
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
                          {user.availability.map((slot, index) => (
                            <div key={index} className="flex items-start mt-2">
                              <div className="w-1/3">
                                <p className="text-gray-600">{slot.day}</p>
                              </div>
                              <div className="w-2/3">
                                <p className="text-gray-600">{slot.timeSlot}</p>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="text-gray-600 mt-2">
                          No data available
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => {
                        setSelectedDoctor(user);
                      }}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      View
                    </button>
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </PatientDashboardlayout>
    </div>
  );
};

export default Patient_DOCList;
