import React, { useEffect, useState } from "react";
import PatientDashboardlayout from "../../layouts/PatientDashboardlayout";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import axios from "axios";

const PatientDashboard = () => {
  const [data, setData] = useState({});
  const name = localStorage.getItem("Name");
  const id = localStorage.getItem("User_Id");
  const role = localStorage.getItem("Role");

  
  const fetchAppointmentStats = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/allappointmentsdetails",
        {
          id: id,
          role: role,
        }
      );
      setData(res.data);
      console.log(res.data)
    } catch (e) {
      console.error("Error fetching appointment details:", e);
    }
  };

  useEffect(() => {
    fetchAppointmentStats();
  }, []);


  const chartData = [
    { name: "Approved", value: data.approvedappointment || 0 },
    { name: "Pending", value: data.pendingappointment || 0 },
  ];

  const chartData2 = [
    { name: "Cardiology", value: data.caridologydoc || 0 },
    { name: "Dermatology", value: data.dermatologydoc || 0 },
    { name: "Neurology", value: data.neurologydoc || 0 },
    { name: "Oncology", value: data.oncologydoc || 0 },
    { name: "Pediactrics", value: data.pediatricdoc || 0 },
    { name: "Radiology", value: data.radiologydoc || 0 },
    { name: "Surgery", value: data.surgerydoc || 0 },
    { name: "General Medicine", value: data.gmdoc || 0 },
  ];

  const COLORS = ["#096b00", "#eb280b"];
  const COLORS2 = ["#1f77b4","#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22","#17becf"];
  


  return (
    <div className="bg-slate-800">
      <PatientDashboardlayout>

        <div className="bg-gray-800 text-yellow-200 text-3xl font-semibold rounded-md shadow-lg py-4 text-center">
          Welcome to HMS {name}
        </div>
        <h1 className="font-bold text-4xl px-4 py-4 text-black flex justify-center underline decoration-solid ">Appointments</h1>
        <div className="px-4 py-4 mt-4 flex ">
          <div className="ml-52">
            
            <div className="bg-white rounded-3xl w-full p-6 mb-4">
              <div className="text-xl font-semibold mb-2">
                Your Appointments:
              </div>
              <div className="text-2xl">{data.totalappointment || 0}</div>
            </div>
            <div className="bg-white rounded-3xl p-6 w-full mb-4 ">
              <div className="text-xl font-semibold mb-2 ">
                Approved Appointments:
              </div>
              <div className="text-2xl">{data.approvedappointment || 0}</div>
            </div>
            <div className="bg-white rounded-3xl p-6 mb-4 w-full">
              <div className="text-xl font-semibold mb-2 ">
                Pending Appointments:
              </div>
              <div className="text-2xl">{data.pendingappointment || 0}</div>
            </div>
          </div>

          <div className="flex justify-enditems-center ml-52 bg-white rounded-3xl">
            {Object.keys(data).length > 0 ? (
              <PieChart width={400} height={400}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="45%"
                  outerRadius={120}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>

        <h1 className="font-bold text-5xl px-4 py-4 text-black flex justify-center underline decoration-solid mt-7">Doctors</h1>
        <div className="px-4 py-4 mt-4 flex">
          <div className="ml-52">
            <div className="bg-white rounded-3xl  p-6 mb-4">
              <div className="text-xl font-semibold w-60 mb-2">
                Total Departments:
              </div>
              <div className="text-2xl">8</div>
            </div>
            <div className="bg-white rounded-3xl p-6 w-full mb-4 ">
              <div className="text-xl font-semibold mb-2 ">
               Total Doctors:
              </div>
              <div className="text-2xl">{data.totaldoctors || 0}</div>
            </div>
            
          </div>

          <div className="flex justify-end items-center ml-52 bg-white rounded-3xl">
            {Object.keys(data).length > 0 ? (
                <PieChart width={400} height={400}>
                  <Pie
                    data={chartData2}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  >
                    {chartData2.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS2[index % COLORS2.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </PatientDashboardlayout>
    </div>
  );
};

export default PatientDashboard;
