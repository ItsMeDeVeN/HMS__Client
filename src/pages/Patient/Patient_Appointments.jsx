import React, { useEffect, useState } from "react";
import axios from "axios";
import PatientDashboardlayout from "../../layouts/PatientDashboardlayout";

const Patient_Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
      const id = localStorage.getItem("User_Id");
      const role = localStorage.getItem("Role");
      if (!id) {
        // throw new Error("Patient ID not found in local storage");
      }

      const res = await axios.post(
        "http://localhost:3000/api/getallappointments",
        { id: id, role: role}
      );
      setAppointments(res.data.appointments);
      console.log(res)
    } catch (err) {
      setError(err.message);
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
      <PatientDashboardlayout>
        <div className="bg-gray-800 text-gray-300 shadow-md rounded mb-6 mx-2">
          <table className="min-w-full bg-white rounded">
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
                <th className="w-1/5 py-3 px-4 uppercase font-semibold text-xl border-b border-gray-700 text-center">
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
                    <td className="w-1/5 py-3 px-4 font-semibold text-center">{appointment.docname}</td>
                    <td className="w-1/5 py-3 px-4 font-semibold text-center">{appointment.docdepartment}</td>
                    <td className="w-1/5 py-3 px-4 font-semibold text-center">{appointment.slot.day}</td>
                    <td className="w-1/5 py-3 px-4 font-semibold text-center">{appointment.slot.timeSlot}</td>
                    <td className={`px-2 py-2 text-center font-bold ${
                            appointment.appointmentstatus
                              ? "text-green-500"
                              : "text-red-500 "
                          }`}>{appointment.appointmentstatus ? "Approved" : "Pending"}</td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-xl font-bold py-6 text-gray-700">No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </PatientDashboardlayout>
    </div>
  );
};

export default Patient_Appointments;
