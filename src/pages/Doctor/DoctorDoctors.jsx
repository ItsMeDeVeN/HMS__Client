import React, { useState } from "react";
import Dashboardlayout from "../../layouts/DOCDashboardlayout";
import { FaSearch } from "react-icons/fa";
import profile from "../../components/profile.jpg"

const DoctorDoctors = ({
  data = [],
  onSearch,
  onPageChange,
  currentPage,
  totalPages,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  console.log("Rendering DOC_DOCList with data:", data); // Log the data passed to DOC_DOCList

  return (
    <div>
      <Dashboardlayout>
        {selectedDoctor ? (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mb-6"
            >
              Back
            </button>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 pb-4 border-b-2 border-gray-300">
            {selectedDoctor.name}
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
                  <h2 className="text-xl font-semibold text-gray-700">
                    Date of Birth:
                  </h2>
                </div>
                <div className="w-2/3">
                  <p className="text-gray-600">{selectedDoctor.dateofbirth}</p>
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
              <div className="flex items-start">
                <div className="w-1/3">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Address:
                  </h2>
                </div>
                <div className="w-2/3">
                  <p className="text-gray-600">{selectedDoctor.address}</p>
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
          <div className="text-gray-300 bg-slate-400 shadow-md rounded  mb-6 mx-4 ">
            <div className="flex justify-end">
            <div className="relative w-96 mt-5 mr-7">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search Patients... "
                  className="w-full bg-gray-100 p-2 pl-10 border text-black border-gray-300 rounded"
                  onChange={(e) => {
                    onSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            {data.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 m-6 ">
                {data.map((doctor) => (
              <div
                key={doctor._id}
                className="p-6 bg-white cursor-pointer rounded-lg shadow-md flex flex-col justify-between hover:bg-gray-200 hover:shadow-lg transition-transform transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3
                        onClick={() => setSelectedDoctor(doctor)}
                        className="text-xl underline font-bold text-gray-800 cursor-pointer"
                      >
                        {doctor.name}
                      </h3>
                      <p className="text-gray-600 pt-2">{doctor.email}</p>
                      <p className="text-gray-600">{doctor.contact}</p>
                      <p className="text-gray-600">{doctor.department}</p>
                    </div>
                    <div className="w-28 h-28 overflow-hidden rounded-full">
                      <img src={profile} alt="Profile" className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <button
                      onClick={() => setSelectedDoctor(doctor)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
              </div>
            ) : (
              <div className="text-gray-600 p-6">No doctors found.</div>
            )}
            <div className=" bg-slate-400 text-black flex justify-center mt-4 pb-4">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                className={`px-3 py-1 bg-slate-500 mx-1 border rounded ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => onPageChange(index + 1)}
                  className={`px-3 py-1 mx-1 border rounded ${
                    index + 1 === currentPage ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => onPageChange(currentPage + 1)}
                className={`px-3 py-1 mx-1 bg-slate-500 border rounded ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </Dashboardlayout>
    </div>
  );
};

export default DoctorDoctors;
