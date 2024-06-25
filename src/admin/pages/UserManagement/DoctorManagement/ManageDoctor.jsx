import { useEffect, useState } from "react";
import DoctorList from "./DoctorList";
import axios from "axios";
import AdminDashboardlayout from "../../../layout/AdminDashboardlayout";
import EditDOCDetails from "./EditDOCDetails"; // Import the EditDoctorForm
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS for react-toastify

const ManageDoctor = () => {
  const [data, setData] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/alldoctors`);
      if (res.status === 200) {
        setData(res.data.doctors);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  const onVerify = async (id) => {
    try {
    const res = await axios.post("http://localhost:3000/api/verified", {
      id,
    });
    if (res.status === 200) {
      toast.success(res.data.message, {
        onClose: fetchData, // Ensure fetchData is defined and accessible here
      });
    }
  } catch (e) {
    console.error("Error verifying doctor:", e);
  }
};

  const onDelete = async (id) => {
    try {
      const res = await axios.delete("http://localhost:3000/api/deleteUser", {
        data: { id },
      });
      if (res.status === 200) {
        toast.success(res.data.message, {
          onClose: fetchData,
        });
      }
    } catch (e) {
      console.error("Error deleting doctor:", e);
    }
  };

  const onEdit = (id) => {
    setSelectedDoctorId(id); // Open the EditDoctorForm by setting the selected doctor ID
  };

  const handleCloseEditForm = () => {
    setSelectedDoctorId(null); // Close the EditDoctorForm by clearing the selected doctor ID
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminDashboardlayout>
      <DoctorList
        data={data}
        onVerify={onVerify}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      {selectedDoctorId && (
        <EditDOCDetails
          doctorId={selectedDoctorId}
          onClose={handleCloseEditForm}
          onUpdate={fetchData} // Refresh data after update
        />
      )}
      <ToastContainer />
    </AdminDashboardlayout>
  );
};

export default ManageDoctor;
