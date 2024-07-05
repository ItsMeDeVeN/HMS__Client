import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { useDebounce } from "use-debounce";
import DoctorList from "./DoctorList";
import axios from "axios";
import AdminDashboardlayout from "../../../layout/AdminDashboardlayout";
import EditDOCDetails from "./EditDOCDetails";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";

const ManageDoctor = () => {
  const [data, setData] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [totalPages, settotalPages] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [filterData, setFilterData] = useImmer({
    page: 1,
    pageSize: 4,
    searchText: "",
  });
  const [searchText, setSearchText] = useState("");

  const [debouncedSearchText] = useDebounce(searchText, 500);

  const fetchData = async () => {
    setLoading(true); // Set loading to true
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
    } finally {
      setLoading(false); // Set loading to false
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

  const onActivation = async (id) => {
    try {
      const res = await axios.post("http://localhost:3000/api/activation", {
        id,
      });
      if (res.status === 200) {
        fetchData();
      }
    } catch (e) {
      console.log("Error while updating activation Status:", e);
      toast.error("Error Changing Activation Status!!!");
    }
  };

  const handleCloseEditForm = () => {
    setSelectedDoctorId(null); // Close the EditDoctorForm by clearing the selected doctor ID
  };

  return (
    <AdminDashboardlayout>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <ColorRing
            visible={true}
            height={80}
            width={80}
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <>
          <DoctorList
            data={data}
            onVerify={onVerify}
            onDelete={onDelete}
            onEdit={onEdit}
            onSearch={onSearch}
            onPageChange={onPageChange}
            onActivation={onActivation}
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
        </>
      )}
      <ToastContainer />
    </AdminDashboardlayout>
  );
};

export default ManageDoctor;
