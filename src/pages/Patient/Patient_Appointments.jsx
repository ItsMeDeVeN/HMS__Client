import React, { useEffect, useState } from "react";
import axios from "axios";
import PatientDashboardlayout from "../../layouts/PatientDashboardlayout";

const Patient_Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
      const patientid = localStorage.getItem("User_Id");
      if (!patientid) {
        // throw new Error("Patient ID not found in local storage");
      }

      const res = await axios.post(
        "http://localhost:3000/api/getallpatientappointments",
        { patientid }
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
        <div className="flex justify-center items-center h-16 bg-gray-800 text-2xl font-bold text-gray-300">
          Appointments
        </div>
        <div className="bg-gray-800 text-gray-300 shadow-md rounded my-6 mx-4">
          <table className="min-w-full bg-white rounded">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="w-1/4 py-3 px-4 uppercase font-semibold text-xl border-b border-gray-700 text-center">
                  Doctor Name
                </th>
                <th className="w-1/4 py-3 px-4 uppercase font-semibold text-xl border-b border-gray-700 text-center">
                  Department
                </th>
                <th className="w-1/4 py-3 px-4 uppercase font-semibold text-xl border-b border-gray-700 text-center">
                  Date
                </th>
                <th className="w-1/4 py-3 px-4 uppercase font-semibold text-xl border-b border-gray-700 text-center">
                  Timings
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
                    <td className="w-1/4 py-3 px-4 font-semibold text-center">{appointment.docname}</td>
                    <td className="w-1/4 py-3 px-4 font-semibold text-center">department</td>
                    <td className="w-1/4 py-3 px-4 font-semibold text-center">{appointment.slot.day}</td>
                    <td className="w-1/4 py-3 px-4 font-semibold text-center">{appointment.slot.timeSlot}</td>
                    
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
