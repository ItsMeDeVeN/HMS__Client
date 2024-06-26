import React, { useState } from "react";
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS for react-toastify

const DoctorList = ({ data, onVerify, onDelete, onEdit, onSearch }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;

  const handleView = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleBack = () => {
    setSelectedDoctor(null);
  };

  const handleVerify = (id, verified) => {
    const confirmationMessage = verified
      ? "Are you sure you want to unverify this user?"
      : "Are you sure you want to verify this user?";

    if (window.confirm(confirmationMessage)) {
      onVerify(id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      onDelete(id);
    }
  };

  const handleCreate = () => {
    window.open("/signup/doctor", "_blank", "noopener,noreferrer");
  };

  const handleEdit = (id) => {
    onEdit(id); // Call the onEdit function passed as a prop
  };

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = data.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const totalPages = Math.ceil(data.length / doctorsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex justify-center bg-gray-200 max-w-full mx-3">
      <div className="bg-white pl-6 pr-10 py-10 rounded-lg mt-10 shadow-xl w-full">
        {selectedDoctor ? (
          <div className="">
            <button
              onClick={handleBack}
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
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <input
                type="text"
                placeholder="Search doctors..."
                className="w-96 bg-gray-100 p-2 border border-gray-300 rounded"
                onChange={(e) => {handleSearch(e)}}
              />
              <button
                onClick={handleCreate}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 transition"
              >
                + Create
              </button>
            </div>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Doctors
            </h1>
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
                {currentDoctors.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.contact}</td>
                    <td className="py-2 px-4 border-b">{user.department}</td>
                    <td className="py-2 px-4 border-b flex space-x-2">
                      <button
                        onClick={() => handleView(user)}
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleVerify(user._id, user.verified)}
                        className={`py-1 px-3 rounded ${
                          user.verified
                            ? "bg-green-500 hover:bg-green-700 w-24"
                            : "bg-red-500 hover:bg-red-700"
                        } text-white transition`}
                      >
                        {user.verified ? "Verified" : "Unverified"}
                      </button>
                      <button
                        onClick={() => handleEdit(user._id)}
                        className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-700 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(user._id);
                        }}
                        
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                      >
                        <RiDeleteBinLine />
                      </button>
                      <ToastContainer />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 mx-1 border rounded"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 mx-1 border rounded ${
                    index + 1 === currentPage ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 mx-1 border rounded"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
