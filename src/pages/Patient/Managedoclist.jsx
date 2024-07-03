import React, { useEffect, useState } from 'react';
import Patient_DOCList from './Patient_DOCList';
import { useImmer } from 'use-immer';
import { useDebounce } from 'use-debounce';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Managedoclist = () => {
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

  const bookAppointment = async (appointmentData) => {
    try {
      const res = await axios.post("http://localhost:3000/api/bookappointment", appointmentData);
      if (res.status === 200) {
        Swal.fire({
          title: "Booked!",
          text: "Your appointment request has been placed.",
          icon: "success"
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Appointment already exists!");
        } else {
          toast.error(error.response.data.message || "An error occurred while booking the appointment.");
        }
      } else {
        console.error("Error booking appointment:", error);
        toast.error("Failed to book the appointment. Please try again later.");
      }
    }
  };

  return (
    <Patient_DOCList
      data={data}
      onSearch={onSearch}
      onPageChange={onPageChange}
      currentPage={filterData.page}
      totalPages={totalPages}
      bookAppointment={bookAppointment}
    />
  );
};

export default Managedoclist;
