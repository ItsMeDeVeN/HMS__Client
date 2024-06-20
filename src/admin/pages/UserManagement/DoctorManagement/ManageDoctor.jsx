import { useEffect, useState } from "react";
import DoctorList from "./DoctorList";
import axios from "axios";
import AdminDashboardlayout from "../../../layout/AdminDashboardlayout";
const ManageDoctor = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/alldoctors");
      if (res.status === 200) {
        setData(res.data.doctors);
        console.log(res.data.doctors);
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
      <DoctorList data={data} />
    </AdminDashboardlayout>);
};

export default ManageDoctor;
