import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../layouts/DOCDashboardlayout";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import axios from "axios";
import Loader, { ColorRing } from "react-loader-spinner"; // Import Loader from react-loader-spinner

const DoctorDashboard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); // State to manage loading state
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
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchAppointmentStats();
  }, []);

  const chartData = [
    { name: "Approved", value: data.approvedappointment || 0 },
    { name: "Pending", value: data.pendingappointment || 0 },
  ];

  const COLORS = ["#096b00", "#eb280b"];

  return (
    <div className="bg-slate-800">
      <Dashboardlayout>
        <div className="py-6 px-8 bg-gray-800 text-yellow-200 text-3xl font-semibold rounded-md shadow-lg flex items-center justify-center">
          Welcome to HMS {name}
        </div>
        <div className="px-4 py-4 mt-4 flex">
          <div className="ml-48">
            <div className="bg-white rounded-3xl w-full p-6 mb-4">
              <div className="text-xl font-semibold mb-2">
                Total Appointments:
              </div>
              <div className="text-2xl">{data.totalappointment || 0}</div>
            </div>
            <div className="bg-white rounded-3xl p-6 w-full mb-4 text-green-700">
              <div className="text-xl font-semibold mb-2 ">
                Approved Appointments:
              </div>
              <div className="text-2xl">{data.approvedappointment || 0}</div>
            </div>
            <div className="bg-white rounded-3xl p-6 mb-4 w-full text-red-700">
              <div className="text-xl font-semibold mb-2 ">
                Pending Appointments:
              </div>
              <div className="text-2xl">{data.pendingappointment || 0}</div>
            </div>
          </div>

          <div className="flex justify-center items-center ml-52 bg-white rounded-3xl relative">
            {loading ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
              </div>
            ) : (
              <PieChart width={400} height={400}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
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
            )}
          </div>
        </div>
      </Dashboardlayout>
    </div>
  );
};

export default DoctorDashboard;
