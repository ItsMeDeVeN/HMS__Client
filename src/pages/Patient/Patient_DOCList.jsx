import React from "react";
import PatientDashboardlayout from "../../layouts/PatientDashboardlayout";
const data = [
  { doctorName: "Dr. Smith", department:"General", time: "9 - 11 AM"},
  { doctorName: "Dr. Johnson", department:"Orthopedia", time: "11 AM - 1 PM" },
  { doctorName: "Dr. Lee", department:"Psychiatrist", time: "4 - 6 PM" },
];
const Patient_DOCList = () => {
  return (
    <div>
      <PatientDashboardlayout>
      <div className="flex justify-center items-center h-16 bg-gray-800 text-2xl font-bold text-gray-300">
          Doctor List
        </div>

        <div className="bg-gray-800 text-gray-300 shadow-md rounded my-6 mx-4">
          <h2 className="text-2xl font-bold py-4 flex justify-center items-center border-b border-gray-700">
            Available Slots Today
          </h2>
          <table className="min-w-full bg-white rounded">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm border-b border-gray-700">
                  Doctor Name
                </th>
                <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm border-b border-gray-700">
                  Department
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
                  <td className="w-1/3 py-3 px-4">{patient.doctorName}</td>
                  <td className="w-1/3 py-3 px-4">{patient.department}</td>
                  <td className="w-1/3 py-3 px-4">{patient.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PatientDashboardlayout>
      <h1>Patient Profile</h1>
    </div>
  );
};

export default Patient_DOCList;
