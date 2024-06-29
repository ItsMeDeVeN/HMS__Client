import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { useDebounce } from "use-debounce";
import DoctorList from "./DoctorList";
import axios from "axios";
import AdminDashboardlayout from "../../../layout/AdminDashboardlayout";
import EditDOCDetails from "./EditDOCDetails"; // Import the EditDoctorForm
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS for react-toastify

const ManageDoctor = () => {
  const [data, setData] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [totalPages, settotalPages] = useState(null);
  const [filterData, setFilterData] = useImmer({
    page: 1,
    pageSize: 4,
    searchText: "",
  });
  const [searchText, setSearchText] = useState("");

  const [debouncedSearchText] = useDebounce(searchText, 500);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/alldoctors?page=${filterData?.page}&limit=${filterData?.pageSize}&search=${filterData?.searchText}`
      );
      if (res.status === 200) {
        setData(res.data.doctors);
        settotalPages(res.data.totalPages);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
      toast.error("Failed to fetch data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterData]);

  useEffect(() => {
    setFilterData((draft) => {
      draft.searchText = debouncedSearchText;
      draft.page = 1; // Reset to first page on new search
    });
  }, [debouncedSearchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const onPageChange = (pageNumber) => {
    setFilterData((draft) => {
      draft.page = pageNumber;
    });
  };

  const onVerify = async (id) => {
    try {
      const res = await axios.post("http://localhost:3000/api/verified", {
        id,
      });
      if (res.status === 200) {
        fetchData();
      }
    } catch (e) {
      console.error("Error verifying doctor:", e);
      toast.error("Error verifying doctor");
    }
  };

  const onDelete = async (id) => {
    try {
      const res = await axios.delete("http://localhost:3000/api/deleteUser", {
        data: { id },
      });
      if (res.status === 200) {
        fetchData();
      }
    } catch (e) {
      console.error("Error deleting doctor:", e);
      toast.error("Error deleting doctor");
    }
  };

  const onEdit = (id) => {
    setSelectedDoctorId(id); // Open the EditDoctorForm by setting the selected doctor ID
  };

  const handleCloseEditForm = () => {
    setSelectedDoctorId(null); // Close the EditDoctorForm by clearing the selected doctor ID
  };

  return (
    <AdminDashboardlayout>
      <DoctorList
        data={data}
        onVerify={onVerify}
        onDelete={onDelete}
        onEdit={onEdit}
        onSearch={onSearch}
        onPageChange={onPageChange}
        currentPage={filterData.page}
        totalPages={totalPages}
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
