import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../layouts/DOCDashboardlayout";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const DOC_Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const deleteappointment = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/deleteappointment",
        { id }
      );
      if (res.status === 200) {
        Swal.fire({
          title: "Deleted!",
          text: "Appointment has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.log("Error while deleting appointment", error);
      toast.error("Error while deleting appointment !!!");
    }
    fetchAppointments();
  };

  const approveappointment = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/updateappointmentstatus",
        { id }
      );
      if (res.status === 200) {
        Swal.fire({
          title: "Approved!",
          text: "Appointment has been approved.",
          icon: "success",
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Appointment is already approved !!!");
        } else {
          toast.error(
            error.response.data.message || "An error approving appointment."
          );
        }
      } else {
        console.error("Error approving appointment:", error);
        toast.error(
          "Failed to verify the appointment. Please try again later."
        );
      }
    }
    fetchAppointments();
  };

  const fetchAppointments = async () => {
    try {
      const id = localStorage.getItem("User_Id");
      const role = localStorage.getItem("Role");
      const res = await axios.post(
        "http://localhost:3000/api/getallappointments",
        { id: id, role: role }
      );
      setAppointments(res.data.appointments);
      console.log(res);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchPatientDetails = async (id) => {
    try {
      const res = await axios.post("http://localhost:3000/api/getdetails", {
        id: id,
      });
      console.log(res.data.details);
      setSelectedPatient(res.data.details); // Assuming response contains patient details
    } catch (error) {
      console.log("Error while fetching patient details", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Dashboardlayout>
        <div className="bg-slate-100 text-gray-300 shadow-md rounded mb-6 mx-4">
          {selectedPatient ? (
            <div className="bg-slate-100 max-h-full rounded-3xl">
              <div className="max-w-full mx-auto bg-white rounded-xl shadow-2xl overflow-hidden transition duration-300 ease-in-out transform hover:shadow-xl">
                <div className="px-8 py-6">
                  <div className="text-center">
                    <button
                      onClick={() => setSelectedPatient(null)}
                      className="flex justify-between bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Back
                    </button>
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                      {selectedPatient.name}
                    </h2>

                    <p className="text-gray-600 text-xl mb-1">
                      <strong>Email:</strong> {selectedPatient.email}
                    </p>
                    {/* Add more details as needed */}
                  </div>
                  <div className="mt-10">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                      Personal Information
                    </h3>
                    <div className="mt-4 space-y-3">
                      <p className="text-gray-700 flex items-center">
                        <span className="font-bold w-20">Gender:</span>
                        <span className="ml-6">{selectedPatient.gender}</span>
                      </p>
                      <p className="text-gray-700 flex items-center">
                        <span className="font-bold w-20">DOB:</span>
                        <span className="ml-6">
                          {new Date(
                            selectedPatient.dateofbirth
                          ).toLocaleDateString()}
                        </span>
                      </p>
                      <p className="text-gray-700 flex items-center">
                        <span className="font-bold w-20">Age:</span>
                        <span className="ml-6">{selectedPatient.age}</span>
                      </p>
                      <p className="text-gray-700 flex items-center">
                        <span className="font-bold w-20">Blood Group:</span>
                        <span className="ml-6">
                          {selectedPatient.bloodgroup}
                        </span>
                      </p>
                      <p className="text-gray-700 flex items-center">
                        <span className="font-bold w-20">Medical History:</span>
                        <span className="ml-6">
                          {selectedPatient.medicalHistory}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-10">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                      Contact Information
                    </h3>
                    <div className="mt-4 space-y-3">
                      <p className="text-gray-700 flex items-center">
                        <span className="font-bold w-20">Phone:</span>
                        <span className="ml-2">{selectedPatient.contact}</span>
                      </p>
                      <p className="text-gray-700 flex items-center">
                        <span className="font-bold w-20">Address:</span>
                        <span className="ml-2">{selectedPatient.address}</span>
                      </p>
                    </div>
                  </div>
                  {/* Add more sections as needed */}
                </div>
              </div>
            </div>
          ) : (
            <table className="min-w-full bg-white rounded">
              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  <th className="w-1/4 py-3 px-4 uppercase font-semibold text-xl border-b border-gray-700 text-center">
                    Patient Name
                  </th>
                  <th className="w-1/4 py-3 px-4 uppercase font-semibold text-xl border-b border-gray-700 text-center">
                    Date
                  </th>
                  <th className="w-1/4 py-3 px-4 uppercase font-semibold text-xl border-b border-gray-700 text-center">
                    Timings
                  </th>
                  <th className="w-1/4 py-3 px-4 uppercase font-semibold text-xl border-b border-gray-700 text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {appointments.length > 0 ? (
                  appointments.map((appointment, index) => (
                    <tr
                      key={index}
                      className="text-base border-b border-gray-400 bg-gray-300"
                    >
                      <td
                        onClick={() => {
                          fetchPatientDetails(appointment.patientid);
                          setSelectedPatient(appointment);
                        }}
                        className="w-1/4 py-3 px-4 font-bold text-center cursor-pointer"
                      >
                        {appointment.patientname}
                      </td>
                      <td className="w-1/4 py-3 px-4 font-semibold text-center">
                        {appointment.slot.day}
                      </td>
                      <td className="w-1/4 py-3 px-4 font-semibold text-center">
                        {appointment.slot.timeSlot}
                      </td>
                      <td className="w-1/4 flex justify-start gap-28 py-3 px-4 font-semibold text-center">
                        <td className="">
                          <button
                            onClick={() => {
                              Swal.fire({
                                title:
                                  "Are you sure you want to verify this appointment?",
                                text: "You won't be able to revert this!",
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, approve it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  approveappointment(appointment._id);
                                }
                              });
                            }}
                            className={`px-2 py-2 rounded-xl ${
                              appointment.appointmentstatus
                                ? "bg-green-500 text-black"
                                : "bg-red-500 text-black "
                            }`}
                          >
                            {appointment.appointmentstatus
                              ? "Approved"
                              : "Pending..."}
                          </button>
                        </td>
                        <button 
                        onClick={() => {
                          Swal.fire({
                            title:
                              "Are you sure you want to delete this appointment?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Delete!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteappointment(appointment._id);
                            }
                          });
                        }}
                        className="mx-auto my-auto bg-red-700 text-black px-2 py-2  rounded-xl">
                          <MdDeleteForever />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center text-xl font-bold py-6 text-gray-700"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Dashboardlayout>
    </div>
  );
};

export default DOC_Appointments;
