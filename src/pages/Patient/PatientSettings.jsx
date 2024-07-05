import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import profile from "../../components/profile.jpg";
import PatientDashboardlayout from "../../layouts/PatientDashboardlayout";
import axios from "axios";
import * as Yup from "yup";
import Loader, { ColorRing } from "react-loader-spinner"; // Import Loader from react-loader-spinner

// Validation Schema for Formik
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contact: Yup.string().required("Contact is required"),
  gender: Yup.string().required("Gender is required"),
  dateofbirth: Yup.date().required("Date of birth is required"),
  age: Yup.number().required("Age is required"),
  bloodgroup: Yup.string().required("Blood group is required"),
  medicalHistory: Yup.string().required("Medical history is required"),
  address: Yup.string().required("Address is required"),
});

const PatientSettings = () => {
  const id = localStorage.getItem("User_Id");
  const [data, setData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading state

  const fetchData = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/getdetails", {
        id: id,
      });
      if (res.data && res.data.details) {
        setData(res.data.details);
      } else {
        console.error("Invalid response structure:", res.data);
      }
    } catch (e) {
      console.error("Error fetching patient details:", e);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post("http://localhost:3000/api/updatePatient", {
        id: id,
        ...values,
      });
      if (res.data.success) {
        toast.success("Details updated successfully!", {
          onClose: () => {
            fetchData();
            setEditMode(false);
          },
        });
      } else {
        console.error("Failed to update details:", res.data);
        toast.error("Failed to update details.");
      }
    } catch (e) {
      console.error("Error updating patient details:", e);
      toast.error("Error updating patient details.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  return (
    <PatientDashboardlayout>
      <ToastContainer />
      <div className="bg-slate-100 min-h-screen">
        <div className="min-h-screen bg-gray-100">
          <div className="flex justify-between items-center h-20 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 text-2xl font-bold px-6 shadow-lg">
            <span className="tracking-wide">Patient Profile</span>

            <button
              onClick={() => {
                setEditMode(!editMode);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>
          <div className="bg-gray-100 min-h-screen">
            <div className="max-w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:shadow-xl">
              <div className="px-8 py-6">
                <div className="flex flex-col md:flex-row items-center">
                  <img
                    src={profile || "/placeholder.jpg"}
                    alt="Profile"
                    className="rounded-full h-40 w-40 object-cover shadow-lg border-4 border-white"
                  />
                  <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                      {data.name}
                    </h2>
                    <p className="text-gray-600 text-xl mb-1">{data.email}</p>
                    <p className="text-gray-600">{data.contact}</p>
                  </div>
                </div>
                {editMode ? (
                  <Formik
                    initialValues={data}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ values, setFieldValue }) => (
                      <Form>
                        <div className="flex flex-col mb-4">
                          <label
                            htmlFor="name"
                            className="font-semibold text-gray-700"
                          >
                            Name
                          </label>
                          <Field
                            type="text"
                            name="name"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex flex-col mb-4">
                          <label
                            htmlFor="email"
                            className="font-semibold text-gray-700"
                          >
                            Email
                          </label>
                          <Field
                            type="email"
                            name="email"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex flex-col mb-4">
                          <label
                            htmlFor="contact"
                            className="font-semibold text-gray-700"
                          >
                            Contact
                          </label>
                          <Field
                            type="text"
                            name="contact"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                          />
                          <ErrorMessage
                            name="contact"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex flex-col mb-4">
                          <label
                            htmlFor="gender"
                            className="font-semibold text-gray-700"
                          >
                            Gender
                          </label>
                          <Field
                            as="select"
                            name="gender"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Others</option>
                          </Field>
                          <ErrorMessage
                            name="gender"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex flex-col mb-4">
                          <label
                            htmlFor="dateofbirth"
                            className="font-semibold text-gray-700"
                          >
                            Date of Birth
                          </label>
                          <Field
                            type="date"
                            name="dateofbirth"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                          />
                          <ErrorMessage
                            name="dateofbirth"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex flex-col mb-4">
                          <label
                            htmlFor="age"
                            className="font-semibold text-gray-700"
                          >
                            Age
                          </label>
                          <Field
                            type="number"
                            name="age"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                          />
                          <ErrorMessage
                            name="age"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex flex-col mb-4">
                          <label
                            htmlFor="bloodgroup"
                            className="font-semibold text-gray-700"
                            style={{
                              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            Blood Group
                          </label>
                          <Field
                            as="select"
                            name="bloodgroup"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                          >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </Field>
                          <ErrorMessage
                            name="bloodgroup"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex flex-col mb-4">
                          <label
                            htmlFor="medicalHistory"
                            className="font-semibold text-gray-700"
                          >
                            Medical History
                          </label>
                          <Field
                            type="textarea"
                            name="medicalHistory"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                          />
                          <ErrorMessage
                            name="medicalHistory"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex flex-col mb-4">
                          <label
                            htmlFor="address"
                            className="font-semibold text-gray-700"
                          >
                            Address
                          </label>
                          <Field
                            type="text"
                            name="address"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex justify-end mt-6">
                          <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          >
                            Save
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  <div>
                    <div className="mt-10">
                      <h3 className="text-3xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                        Personal Information
                      </h3>
                      <div className="mt-4 space-y-3">
                        <p className="text-gray-700 flex items-center">
                          <span className="font-bold w-20">Gender:</span>
                          <span className="ml-6">{data.gender}</span>
                        </p>
                        <p className="text-gray-700 flex items-center">
                          <span className="font-bold w-20 ">DOB:</span>
                          <span className="ml-6">
                            {new Date(data.dateofbirth).toLocaleDateString()}
                          </span>
                        </p>
                        <p className="text-gray-700 flex items-center">
                          <span className="font-bold w-20">Age:</span>
                          <span className="ml-6">{data.age}</span>
                        </p>
                        <p className="text-gray-700 flex items-center">
                          <span className="font-bold w-20">BloodGroup:</span>
                          <span className="ml-6">{data.bloodgroup}</span>
                        </p>
                        <p className="text-gray-700 flex items-center">
                          <span className="font-bold w-20">
                            Medical History:
                          </span>
                          <span className="ml-6">{data.medicalHistory}</span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-10">
                      <h3 className="text-3xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                        Contact Information
                      </h3>
                      <div className="mt-4 space-y-3">
                        <p className="text-gray-700 flex items-center">
                          <span className="font-bold w-20">Phone:</span>
                          <span className="ml-2">{data.contact}</span>
                        </p>
                        <p className="text-gray-700 flex items-center">
                          <span className="font-bold w-20">Address:</span>
                          <span className="ml-2">{data.address}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </PatientDashboardlayout>
  );
};

export default PatientSettings;
