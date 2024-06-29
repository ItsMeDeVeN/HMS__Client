import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS for react-toastify

const DoctorList = ({
  data,
  onVerify,
  onDelete,
  onEdit,
  onSearch,
  onPageChange,
  currentPage,
  totalPages,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="flex justify-center bg-gray-200 max-w-full mx-3">
      <div className="bg-white rounded-lg mt-10 shadow-xl w-full">
        {selectedDoctor ? (
          <div className=" pl-6 pr-10 py-10">
            <button
              onClick={() => {
                setSelectedDoctor(null);
              }}
              className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-700 mb-4 inline-block"
            >
              Back
            </button>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 pb-4">
              Doctor Details
            </h1>
            <div className="space-y-4 text-xl">
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
                    Address:
                  </h2>
                </div>
                <div className="w-2/3">
                  <p className="text-gray-600">{selectedDoctor.address}</p>
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
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Availability:
                </h2>
                <div className="flex items-start mt-2">
                  <div className="w-1/3">
                    <h3 className="text-lg font-medium text-gray-700">Day</h3>
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
              <div className="flex items-start">
                <div className="w-1/3">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Verification Status:
                  </h2>
                </div>
                <div className="w-2/3">
                  <p
                    className={`text-gray-600 ${
                      selectedDoctor.verified
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedDoctor.verified ? "Verified" : "Unverified"}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-1/3">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Activation Status:
                  </h2>
                </div>
                <div className="w-2/3">
                  <p
                    className={`text-gray-600 ${
                      selectedDoctor.activation_status
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {selectedDoctor.activation_status ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center bg-gray-200 max-w-full">
            <div className="bg-white pl-6 pr-10 py-10 rounded-lg shadow-xl w-full">
              <div className="mb-6 flex justify-between items-center">
                <button
                  onClick={() => {
                    window.open(
                      "/signup/doctor",
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                  className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 transition"
                >
                  + Create
                </button>
                <div className="relative w-96">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaSearch className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Doctors... "
                    className="w-full bg-gray-100 p-2 pl-10 border border-gray-300 rounded"
                    onChange={(e) => {
                      onSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
            
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="text-xl">
                    <th className="py-3 px-4 border-b text-left">Name</th>
                    <th className="py-3 px-4 border-b text-left">Email</th>
                    <th className="py-3 px-4 border-b text-left">Contact</th>
                    <th className="py-3 px-4 border-b text-left">Department</th>
                    <th className="py-3 px-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data && Array.isArray(data) && data.length > 0 ? (
                    data.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b font-semibold cursor-pointer" onClick={() => {setSelectedDoctor(user)}}>{user.name}</td>
                        <td className="py-2 px-4 border-b">{user.email}</td>
                        <td className="py-2 px-4 border-b">{user.contact}</td>
                        <td className="py-2 px-4 border-b">{user.department}</td>
                        <td className="py-2 px-4 border-b flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedDoctor(user);
                            }}
                            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              const confirmationMessage = user.verified
                                ? "Are you sure you want to unverify this user?"
                                : "Are you sure you want to verify this user?";
                              Swal.fire({
                                title: confirmationMessage,
                                showCancelButton: true,
                                confirmButtonText: "Yes",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  Swal.fire(
                                    "Changed Succesfully",
                                    "",
                                    "success"
                                  );
                                  onVerify(user._id);
                                }
                              });
                            }}
                            className={`py-1 px-3 rounded ${
                              user.verified
                                ? "bg-green-500 hover:bg-green-700 w-24"
                                : "bg-red-500 hover:bg-red-700"
                            } text-white transition`}
                          >
                            {user.verified ? "Verified" : "Unverified"}
                          </button>
                          <button
                            onClick={() => onEdit(user._id)}
                            className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-700 transition"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => {
                              Swal.fire({
                                title:
                                  "Are you sure you want to delete the Doctor?",
                                showCancelButton: true,
                                confirmButtonText: "Yes",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  Swal.fire(
                                    "Deleted Succesfully",
                                    "",
                                    "success"
                                  );
                                  onDelete(user._id);
                                }
                              });
                            }}
                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                          >
                            <RiDeleteBinLine />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-4 px-4 text-center text-gray-500"
                      >
                        NO DATA FOUND
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="flex justify-end mt-6 mr-5">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  className={`px-3 py-1 mx-1 border rounded ${
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
                  className={`px-3 py-1 mx-1 border rounded ${
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
            <ToastContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
