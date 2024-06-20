import { useEffect, useState } from "react";
import PatientList from "./PatientList";
import axios from "axios";
import AdminDashboardlayout from "../../../layout/AdminDashboardlayout";
const ManagePatient = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/allpatients");
      if (res.status === 200) {
        setData(res.data.patients);
        console.log(res.data.patients);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminDashboardlayout>
      <PatientList data={data} />
    </AdminDashboardlayout>);
};

export default ManagePatient;
