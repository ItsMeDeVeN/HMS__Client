import { useEffect, useState } from "react";
import PatientList from "./PatientList";
import axios from "axios";
import AdminDashboardlayout from "../../../layout/AdminDashboardlayout";
import { toast, ToastContainer } from "react-toastify";
import EditPatientDetails from "./EditPatientDetails";
const ManagePatient = () => {
  const [data, setData] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

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

  const onDelete = async (id) => {
    try {
      const res = await axios.delete("http://localhost:3000/api/deleteUser", {
        data: { id },
      });
      if (res.status === 200) {
        toast.success(res.data.message, {
          onClose: () => {
            console.log("Toast closed, fetching data...");
            fetchData();
          },
        });
      }
    } catch (e) {
      console.error("Error deleting patient:", e);
    }
  };

  const onEdit = (id) => {
    console.log("OnEdit Clicked for id:-", id);
    setSelectedPatientId(id);
  };

  const handleCloseEditForm = () => {
    setSelectedPatientId(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminDashboardlayout>
      <PatientList 
      data={data} 
      onDelete={onDelete} 
      onEdit={onEdit} 
      />
      {selectedPatientId && (
        <EditPatientDetails
          patientId={selectedPatientId}
          onClose={handleCloseEditForm}
          onUpdate={fetchData}
        />
      )}
      <ToastContainer />
    </AdminDashboardlayout>
  );
};

export default ManagePatient;
