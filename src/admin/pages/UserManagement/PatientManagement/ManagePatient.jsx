import { useEffect, useState } from "react";
import PatientList from "./PatientList";
import axios from "axios";
import { useImmer } from "use-immer";
import { useDebounce } from "use-debounce";
import AdminDashboardlayout from "../../../layout/AdminDashboardlayout";
import { toast, ToastContainer } from "react-toastify";
import EditPatientDetails from "./EditPatientDetails";
import { ColorRing } from "react-loader-spinner"; // Import ColorRing loader

const ManagePatient = () => {
  const [data, setData] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
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
        `http://localhost:3000/api/allpatients?page=${filterData?.page}&limit=${filterData?.pageSize}&search=${filterData?.searchText}`
      );
      if (res.status === 200) {
        setData(res.data.patients);
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
    setFilterData((draft) => {
      draft.searchText = debouncedSearchText;
      draft.page = 1; // Reset to first page on new search
    });
  }, [debouncedSearchText]);

  useEffect(() => {
    fetchData();
  }, [filterData]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const onPageChange = (pageNumber) => {
    setFilterData((draft) => {
      draft.page = pageNumber;
    });
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
      console.error("Error deleting patient:", e);
    }
  };

  const onEdit = (id) => {
    console.log("OnEdit Clicked for id:-", id);
    setSelectedPatientId(id);
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
    setSelectedPatientId(null);
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
          <PatientList
            data={data}
            onDelete={onDelete}
            onEdit={onEdit}
            onSearch={onSearch}
            onPageChange={onPageChange}
            onActivation={onActivation}
            currentPage={filterData.page} // Pass current page to DoctorList
            totalPages={totalPages} // Calculate total pages
          />
          {selectedPatientId && (
            <EditPatientDetails
              patientId={selectedPatientId}
              onClose={handleCloseEditForm}
              onUpdate={fetchData}
            />
          )}
        </>
      )}
      <ToastContainer />
    </AdminDashboardlayout>
  );
};

export default ManagePatient;
