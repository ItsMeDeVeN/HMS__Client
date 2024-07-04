import React, { useEffect, useState } from "react";
import AdminDashboardlayout from "../layout/AdminDashboardlayout";
import axios from "axios";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

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
  console.log(data)
  return (
    <div className="bg-slate-800">
      <AdminDashboardlayout>

        <div className="py-6 px-8 bg-cyan-900 text-yellow-200 text-3xl font-semibold rounded-md shadow-lg flex items-center justify-center">
          Welcome to HMS {name}
        </div>

        <h1 className="font-bold text-4xl px-4 py-4 text-black flex justify-center underline decoration-solid ">Patients</h1>
        <div className="px-4 py-4 mt-4 flex ">
          <div className="ml-52">
            
            <div className="bg-white rounded-3xl w-full p-6 mb-4">
              <div className="text-xl font-semibold mb-2 w-56">
                Total Patients:
              </div>
              <div className="text-2xl">{data.allpatients || 0}</div>
            </div>
            <div className="bg-white rounded-3xl p-6 w-full mb-4 ">
              <div className="text-xl font-semibold mb-2 ">
                Active Patients:
              </div>
              <div className="text-2xl">{data.activepatients || 0}</div>
            </div>
            <div className="bg-white rounded-3xl p-6 mb-4 w-full">
              <div className="text-xl font-semibold mb-2 ">
              Ina ctive Patients:
              </div>
              <div className="text-2xl">{data.inactivepatients || 0}</div>
            </div>
          </div>

          <div className="flex justify-enditems-center ml-52 bg-white rounded-3xl">
            {Object.keys(data).length > 0 ? (
              <PieChart width={400} height={400}>
                <Pie
                  data={chartData2}
                  dataKey="value"
                  cx="50%"
                  cy="45%"
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


        <h1 className="font-bold text-4xl px-4 py-4 text-black flex justify-center underline decoration-solid mt-4 ">Appointments</h1>
        <div className="px-4 py-4 mt-4 flex ">
          <div className="ml-52">
            
            <div className="bg-white rounded-3xl w-full p-6 mb-4">
              <div className="text-xl font-semibold mb-2">
                Total Appointments:
              </div>
              <div className="text-2xl">{data.allappointments || 0}</div>
            </div>
            <div className="bg-white rounded-3xl p-6 w-full mb-4 ">
              <div className="text-xl font-semibold mb-2 ">
                Approved Appointments:
              </div>
              <div className="text-2xl">{data.approvedappointments || 0}</div>
            </div>
            <div className="bg-white rounded-3xl p-6 mb-4 w-full">
              <div className="text-xl font-semibold mb-2 ">
                Pending Appointments:
              </div>
              <div className="text-2xl">{data.pendingappointments || 0}</div>
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


        <h1 className="font-bold text-4xl px-4 py-4 text-black flex justify-center underline decoration-solid mt-4 ">Doctors</h1>
        <div className="px-4 py-4 mt-4 flex ">
          <div className="ml-52">
            
            <div className="bg-white rounded-3xl w-full p-6 mb-4">
              <div className="text-xl font-semibold mb-2 w-56">
                Total Doctors:
              </div>
              <div className="text-2xl">{data.alldocs || 0}</div>
            </div>
            <div className="bg-white rounded-3xl p-6 w-full mb-4 ">
              <div className="text-xl font-semibold mb-2 ">
                Verified Doctors:
              </div>
              <div className="text-2xl">{data.verifiedocs || 0}</div>
            </div>
            <div className="bg-white rounded-3xl p-6 mb-4 w-full">
              <div className="text-xl font-semibold mb-2 ">
              Unverified Doctors:
              </div>
              <div className="text-2xl">{data.unverifiedocs || 0}</div>
            </div>
          </div>

          <div className="flex justify-enditems-center ml-52 bg-white rounded-3xl">
            {Object.keys(data).length > 0 ? (
              <PieChart width={400} height={400}>
                <Pie
                  data={chartData3_1}
                  dataKey="value"
                  cx="50%"
                  cy="45%"
                  outerRadius={60}
                  label
                >
                  {chartData.map((entry, index) => (
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
                  cy="45%"
                  innerRadius={100}
                  outerRadius={120}
                  label
                >
                  {chartData.map((entry, index) => (
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
      </AdminDashboardlayout>
    </div>
  );
};

export default AdminDashboard;
