import React, { useEffect, useState } from "react";
import PatientDashboardlayout from "../../layouts/PatientDashboardlayout";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

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
    { name: "Pediatrics", value: data.pediatricdoc || 0 },
    { name: "Radiology", value: data.radiologydoc || 0 },
    { name: "Surgery", value: data.surgerydoc || 0 },
    { name: "General Medicine", value: data.gmdoc || 0 },
  ];

  const COLORS = ["#096b00", "#eb280b"];
  const COLORS2 = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
  ];

  return (
    <div className="bg-slate-800">
      <PatientDashboardlayout>
        <div className="bg-gray-800 text-yellow-200 text-3xl font-semibold rounded-md shadow-lg py-4 text-center">
          Welcome to HMS {name}
        </div>

        <div className="grid grid-cols-6 mt-20">
          <div className="w-fit ml-5">
            <div className="bg-white rounded-lg w-fit p-6 mb-4 col-span-1">
              <div className="text-xl font-semibold mb-2">Appointments:</div>
              <div className="text-2xl">{data.totalappointment || 0}</div>
            </div>
            <div className="bg-white rounded-lg p-6 w-full mb-4 text-green-700">
              <div className="text-xl font-semibold mb-2 ">Approved :</div>
              <div className="text-2xl">{data.approvedappointment || 0}</div>
            </div>
            <div className="bg-white rounded-lg p-6 mb-4 w-full text-red-700">
              <div className="text-xl font-semibold mb-2 ">Pending:</div>
              <div className="text-2xl">{data.pendingappointment || 0}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl w-fit h-fit col-span-1 ml-5">
            {Object.keys(data).length > 0 ? (
              <PieChart width={350} height={380}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
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
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            )}
          </div>

          <div className="ml-64 w-fit">
            <div className="bg-white rounded-lg p-6 w-full mb-4 col-span-1">
              <div className="text-xl font-semibold mb-2 ">Doctors:</div>
              <div className="text-2xl">{data.totaldoctors || 0}</div>
            </div>
            <div className="bg-white rounded-lg p-6 mb-4">
              <div className="text-xl font-semibold w-fit mb-2">
                Departments:
              </div>
              <div className="text-2xl">8</div>
            </div>
          </div>

          <div className="ml-40">
            <div className="bg-white rounded-xl w-fit h-fit col-span-2 ml-20">
              {Object.keys(data).length > 0 ? (
                <PieChart width={380} height={380}>
                  <Pie
                    data={chartData2}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
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
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              )}
            </div>
          </div>
        </div>
      </PatientDashboardlayout>
    </div>
  );
};

export default PatientDashboard;
