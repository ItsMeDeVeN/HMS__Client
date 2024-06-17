import React from "react";
import Dashboardlayout from "../../layouts/DOCDashboardlayout";

const data = [
  { name: "Deven", date: "2024-06-17", time: "10AM" },
  { name: "Alice", date: "2024-06-17", time: "11AM" },
  { name: "Bob", date: "2024-06-17", time: "12PM" },
];
const DOC_Appointments = () => {
  return (
    <div>
      <Dashboardlayout>
      <div className="flex justify-center items-center h-16 bg-gray-800 text-gray-300 text-2xl font-bold">
          Appointments
        </div>
        <div className="bg-gray-800 text-gray-300 shadow-md rounded my-6 mx-4">
          <table className="min-w-full bg-white rounded">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm border-b border-gray-700">
                  Patient Name
                </th>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm border-b border-gray-700">
                  Date
                </th>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm border-b border-gray-700">
                  Timings
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {data.map((patient, index) => (
                <tr
                  key={index}
                  className={`text-base border-b border-gray-400  bg-gray-300`}
                >
                  <td className="w-1/3 py-3 px-4">{patient.name}</td>
                  <td className="w-1/3 py-3 px-4">{patient.date}</td>
                  <td className="w-1/3 py-3 px-4">{patient.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dashboardlayout>
    </div>
  );
};

export default DOC_Appointments;
