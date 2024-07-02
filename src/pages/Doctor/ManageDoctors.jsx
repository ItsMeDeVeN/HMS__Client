import React, { useEffect, useState } from "react";
import DOC_DOCList from "./DOC_DOCList";
import { useImmer } from "use-immer";
import { useDebounce } from "use-debounce";
import axios from "axios";
import { toast } from "react-toastify";

const Managedoctors = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filterData, setFilterData] = useImmer({
    page: 1,
    pageSize: 6,
    searchText: "",
  });
  const [searchText, setSearchText] = useState("");

  const [debouncedSearchText] = useDebounce(searchText, 500);

  const fetchData = async () => {
    console.log("I am calling");
    try {
      const res = await axios.get(
        `http://localhost:3000/api/alldoctors?page=${filterData.page}&limit=${filterData.pageSize}&search=${filterData.searchText}`
      );
      if (res.status === 200) {
        console.log("Fetched data:", res.data); // Log the fetched data
        setData(res.data.doctors);
        setTotalPages(res.data.totalPages);
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
    <DOC_DOCList
      data={data}
      onSearch={onSearch}
      onPageChange={onPageChange}
      currentPage={filterData.page}
      totalPages={totalPages}
    />
    
  );
};

export default Managedoctors;
