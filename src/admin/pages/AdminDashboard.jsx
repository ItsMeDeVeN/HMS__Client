import React, { useEffect, useState } from "react";
import AdminDashboardlayout from "../layout/AdminDashboardlayout";
import axios from "axios";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { ColorRing } from "react-loader-spinner";

// const details = "Admin  :)";
const name = localStorage.getItem("Name");

const AdminDashboard = () => {
  const [data, setData] = useState({});

  const fetchallstats = async () => {
    const res = await axios.get("http://localhost:3000/api/getallstats");
    if (res.status === 200) {
      setData(res.data);
    }
  };

  useEffect(() => {
    fetchallstats();
  }, []);

  const chartData = [
    { name: "Approved", value: data.approvedappointments || 0 },
    { name: "Pending", value: data.pendingappointments || 0 },
  ];

  const chartData2 = [
    { name: "Active", value: data.activepatients || 0 },
    { name: "Inactive", value: data.inactivepatients || 0 },
  ];
  const chartData3_1 = [
    { name: "Verified", value: data.verifiedocs || 0 },
    { name: "Unverified", value: data.unverifiedocs || 0 },
  ];
  const chartData3_2 = [
    { name: "Active", value: data.activedocs || 0 },
    { name: "Inactive", value: data.inactivedocs || 0 },
  ];

  const COLORS = ["#096b00", "#eb280b"];
  const COLORS2 = ["#28a745", "#6c757d"];
  const COLORS3 = ["#ff7f0e", "#8c564b"];
  console.log(data);
  return (
    <div className="bg-slate-800">
      <AdminDashboardlayout>
        <div className="py-6 px-8 bg-cyan-900 text-yellow-200 text-3xl font-semibold rounded-md shadow-lg flex items-center justify-center">
          Welcome to HMS {name}
        </div>

        <div className="grid grid-cols-6 gap-10 mt-20">
          <div className="w-fit ml-5">
            <div className="bg-white rounded-lg w-fit p-6 mb-4 col-span-1">
              <div className="text-xl font-semibold mb-2">Patients:</div>
              <div className="text-2xl">{data.allpatients || 0}</div>
            </div>
            <div className="bg-white rounded-lg p-6 w-full mb-4 text-green-700">
              <div className="text-xl font-semibold mb-2">Active:</div>
              <div className="text-2xl">{data.activepatients || 0}</div>
            </div>
            <div className="bg-white rounded-lg p-6 mb-4 w-full text-red-700">
              <div className="text-xl font-semibold mb-2">Inactive:</div>
              <div className="text-2xl">{data.inactivepatients || 0}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl w-fit h-fit col-span-1">
            {Object.keys(data).length > 0 ? (
              <PieChart width={350} height={380}>
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
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            )}
          </div>

          <div className="w-fit ml-48">
            <div className="bg-white rounded-lg w-fit p-6 mb-4 col-span-1">
              <div className="text-xl font-semibold mb-2">Appointments:</div>
              <div className="text-2xl">{data.allappointments || 0}</div>
            </div>
            <div className="bg-white rounded-lg p-6 w-full text-green-600 mb-4 ">
              <div className="text-xl font-semibold mb-2 ">Approved:</div>
              <div className="text-2xl">{data.approvedappointments || 0}</div>
            </div>
            <div className="bg-white rounded-lg p-6 mb-4 w-full text-red-600">
              <div className="text-xl font-semibold mb-2">Pending:</div>
              <div className="text-2xl">{data.pendingappointments || 0}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl w-fit h-fit col-span-1 ml-52">
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
        </div>

        <div className="grid grid-cols-6 gap-10 mt-40">
          <div className="w-fit ml-5">
            <div className="bg-white rounded-lg w-full p-6 mb-4 col-span-1">
              <div className="text-xl font-semibold mb-2">Doctors:</div>
              <div className="text-2xl">{data.alldocs || 0}</div>
            </div>
            <div className="bg-white rounded-lg p-6 w-full mb-4 text-yellow-600 ">
              <div className="text-xl font-semibold mb-2">Verified:</div>
              <div className="text-2xl">{data.verifiedocs || 0}</div>
            </div>
            <div className="bg-white rounded-lg p-6 mb-4 w-fit text-amber-900">
              <div className="text-xl font-semibold mb-2">Unverified:</div>
              <div className="text-2xl">{data.unverifiedocs || 0}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl w-fit h-fit col-span-1 ml-5">
            {Object.keys(data).length > 0 ? (
              <PieChart width={350} height={380}>
                <Pie
                  data={chartData3_1}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  label
                >
                  {chartData3_1.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS3[index % COLORS3.length]}
                    />
                  ))}
                </Pie>
                <Pie
                  data={chartData3_2}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={120}
                  label
                >
                  {chartData3_2.map((entry, index) => (
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
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            )}
          </div>
        </div>
      </AdminDashboardlayout>
    </div>
  );
};

export default AdminDashboard;
