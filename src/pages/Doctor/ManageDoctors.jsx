import React, { useEffect, useState } from "react";
import DoctorDoctors from "./DoctorDoctors";
import { useImmer } from "use-immer";
import { useDebounce } from "use-debounce";
import axios from "axios";
import { toast } from "react-toastify";
// import { ColorRing } from "react-loader-spinner"; // Import loader component

const Managedoctors = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filterData, setFilterData] = useImmer({
    page: 1,
    pageSize: 6,
    searchText: "",
  });
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const [debouncedSearchText] = useDebounce(searchText, 500);

  const fetchData = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const res = await axios.get(
        `http://localhost:3000/api/alldoctors?page=${filterData.page}&limit=${filterData.pageSize}&search=${filterData.searchText}`
      );
      if (res.status === 200) {
        setData(res.data.doctors);
        setTotalPages(res.data.totalPages);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterData]);

  useEffect(() => {
    setFilterData((draft) => {
      draft.searchText = debouncedSearchText;
      draft.page = 1;
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

  return (
    <div>
        <DoctorDoctors
          data={data}
          onSearch={onSearch}
          onPageChange={onPageChange}
          currentPage={filterData.page}
          totalPages={totalPages}
        />
    </div>
  );
};

export default Managedoctors;
