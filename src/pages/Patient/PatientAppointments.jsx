import React, { useEffect, useState } from "react";
import axios from "axios";
import PatientDashboardlayout from "../../layouts/PatientDashboardlayout";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner"; // Import Loader from react-loader-spinner

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null);

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
      fetchAppointments(); // Fetch appointments after deletion
    } catch (error) {
      console.log("Error while deleting appointment", error);
      toast.error("Error while deleting appointment !!!");
    }
  };

  const fetchAppointments = async () => {
    try {
      const id = localStorage.getItem("User_Id");
      const role = localStorage.getItem("Role");
      if (!id) {
        // throw new Error("Patient ID not found in local storage");
      }

      const res = await axios.post(
        "http://localhost:3000/api/getallappointments",
        { id: id, role: role }
      );
      setAppointments(res.data.appointments);
      setLoading(false); // Set loading to false after appointments are fetched
    } catch (err) {
      setError(err.message);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    // Render loader when loading state is true
    return (
      <div className="flex justify-center items-center h-screen">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <PatientDashboardlayout>
        <table className="min-w-full bg-white rounded-3xl ">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-xl border-b border-gray-700 text-center">
                Doctor Name
              </th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-xl border-b border-gray-700 text-center">
                Department
              </th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-xl border-b border-gray-700 text-center">
                Date
              </th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-xl border-b border-gray-700 text-center">
                Timings
              </th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-xl border-b border-gray-700 text-left pl-12">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr
                  key={index}
                  className="text-base border-b border-gray-400 bg-white "
                >
                  <td className="w-1/5 py-3 px-4 font-semibold text-center">
                    {appointment.docname}
                  </td>
                  <td className="w-1/5 py-3 px-4 font-semibold text-center">
                    {appointment.docdepartment}
                  </td>
                  <td className="w-1/5 py-3 px-4 font-semibold text-center">
                    {appointment.slot.day}
                  </td>
                  <td className="w-1/5 py-3 px-4 font-semibold text-center">
                    {appointment.slot.timeSlot}
                  </td>
                  <td className="flex gap-16">
                    <td
                      className={`pl-10 px-2 py-2 w-28 text-center font-bold ${
                        appointment.appointmentstatus
                          ? "text-green-500"
                          : "text-red-500 "
                      }`}
                    >
                      {appointment.appointmentstatus ? "Approved" : "Pending"}
                    </td>
                    <button
                      className="bg-red-500 px-1 py-1 rounded-xl my-auto"
                      onClick={() => {
                        Swal.fire({
                          title:
                            "Are you sure you want to delete this appointment?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Delete",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteappointment(appointment._id);
                          }
                        });
                      }}
                    >
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
      </PatientDashboardlayout>
    </div>
  );
};

export default PatientAppointments;
