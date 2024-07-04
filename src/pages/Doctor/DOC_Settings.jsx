import React, { useEffect, useState } from "react";
import DOCDashboardlayout from "../../layouts/DOCDashboardlayout";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import profile from "../../components/profile.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DOC_Settings = () => {
  const id = localStorage.getItem("User_Id");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    gender: "",
    dateofbirth: "",
    age: "",
    department: "",
    availability: [],
    consultingfee: "",
  });

  const fetchDoctorDetails = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/getdetails", {
        id: id,
      });
      setFormData(res.data.details);
    } catch (e) {
      console.error("Error fetching doctor details:", e);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, [id]);

  const initialValues = {
    name: formData.name,
    email: formData.email,
    contact: formData.contact,
    address: formData.address,
    gender: formData.gender,
    dateofbirth: formData.dateofbirth,
    age: formData.age,
    department: formData.department,
    consultingfee: formData.consultingfee,
    availability: formData.availability,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Full Name is required"),
    contact: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Contact Details is required"),
    address: Yup.string().required("Address is required"),
    gender: Yup.string().required("Gender is required"),
    dateofbirth: Yup.date().required("Date of Birth is required"),
    age: Yup.number().required("Age is required"),
    department: Yup.string().required("Department is required"),
    consultingfee: Yup.number().required("Consulting Fee is required"),
    availability: Yup.array().of(
      Yup.object().shape({
        day: Yup.string().required("Day is required"),
        timeSlot: Yup.string().required("Time Slot is required"),
      })
    ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("Handle Submit Called");
      const res = await axios.post("http://localhost:3000/api/updateDoctor", {
        ...values,
        _id: id,
      });
      if (res.status === 200) {
        toast.success("Doctor details updated successfully!", {
          onClose: () => {
            fetchDoctorDetails();
            setIsEditing(false);
          },
        });
      }
    } catch (e) {
      console.error("Error updating doctor details:", e);
    } finally {
      setSubmitting(false);
    }
  };

  const addAvailability = (values, setFieldValue) => {
    const { availability, day, timeSlot } = values;
    if (day && timeSlot) {
      setFieldValue("availability", [...availability, { day, timeSlot }]);
      setFieldValue("day", "");
      setFieldValue("timeSlot", "");
    }
  };
  const removeAvailability = (index, setFieldValue) => {
    setFieldValue(
      "availability",
      formData.availability.filter((_, i) => i !== index)
    );
  };

  return (
    <DOCDashboardlayout>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-between items-center h-20 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 text-2xl font-bold px-6 shadow-lg">
          <span className="tracking-wide">Doctor Profile</span>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="bg-gray-100 min-h-screen ">
          <div className="max-w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:shadow-xl">
            <div className="px-24 py-10">
              <div className="flex flex-col md:flex-row items-center">
                <img
                  src={profile || "/placeholder.jpg"}
                  alt="Profile"
                  className="rounded-full h-40 w-40 object-cover shadow-lg border-4 border-white"
                />
                <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">
                    {initialValues.name}
                  </h2>
                  <p className="text-gray-600 text-xl mb-1">
                    {initialValues.department}
                  </p>
                  <p className="text-gray-600">{initialValues.email}</p>
                </div>
              </div>

              {isEditing ? (
                <div className="bg-white p-6 rounded shadow-md w-full max-w-full overflow-y-auto max-h-full">
                  <h2 className="text-2xl font-bold mb-4">
                    Edit Doctor Details
                  </h2>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                  >
                    {({ values, setFieldValue }) => (
                      <Form>
                        {/* Existing form fields */}
                        <div className="flex flex-col mb-4">
                          <label
                            htmlFor="name"
                            className="font-semibold text-gray-700"
                            style={{
                              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                            }}
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
                            htmlFor="contact"
                            className="font-semibold text-gray-700"
                            style={{
                              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                            }}
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
                            htmlFor="address"
                            className="font-semibold text-gray-700"
                            style={{
                              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                            }}
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
                        <div className="flex flex-col mb-4">
                          <label
                            htmlFor="gender"
                            className="font-semibold text-gray-700"
                            style={{
                              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                            }}
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
                            style={{
                              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                            }}
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
                            style={{
                              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                            }}
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
                            htmlFor="department"
                            className="font-semibold text-gray-700"
                            style={{
                              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            Department
                          </label>
                          <Field
                            as="select"
                            name="department"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                          >
                            <option value="">Select Department</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Oncology">Oncology</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Radiology">Radiology</option>
                            <option value="Surgery">Surgery</option>
                            <option value="General Medicine">
                              General Medicine
                            </option>
                          </Field>
                          <ErrorMessage
                            name="department"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex flex-col mb-4">
                          <label
                            htmlFor="consultingfee"
                            className="font-semibold text-gray-700"
                            style={{
                              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            Consulting Fee
                          </label>
                          <Field
                            type="number"
                            name="consultingfee"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                          />
                          <ErrorMessage
                            name="consultingfee"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="flex flex-col mb-4">
                          <label
                            htmlFor="availability"
                            className="font-semibold text-gray-700"
                            style={{
                              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            Availability
                          </label>
                          <Field
                            as="select"
                            name="day"
                            className="border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                          >
                            <option value="">Select Day</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                          </Field>
                          <Field
                            type="text"
                            name="timeSlot"
                            placeholder="Enter Time Slot"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                          />
                          <ErrorMessage
                            name="availability"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              addAvailability(values, setFieldValue)
                            }
                            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400"
                          >
                            Add Slot
                          </button>
                        </div>

                        <div className="mt-4">
                          {values.availability.map((slot, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between mb-2 border-b pb-2"
                            >
                              <span className="text-gray-700">
                                {slot.day}: {slot.timeSlot}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  removeAvailability(index, setFieldValue)
                                }
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6">
                          <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
                          >
                            Save
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              ) : (
                <div>
                  <div className="mt-10">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-bold text-gray-700">Name</p>
                        <p className="text-gray-800">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-gray-700">
                          Contact
                        </p>
                        <p className="text-gray-800">{formData.contact}</p>
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-gray-700">
                          Address
                        </p>
                        <p className="text-gray-800">{formData.address}</p>
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-gray-700">
                          Gender
                        </p>
                        <p className="text-gray-800">{formData.gender}</p>
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-gray-700">
                          Date of Birth
                        </p>
                        <p className="text-gray-800">{formData.dateofbirth}</p>
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-gray-700">
                          Age
                        </p>
                        <p className="text-gray-800">{formData.age}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                      Professional Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xl font-semibold text-gray-700">
                          Department
                        </p>
                        <p className="text-gray-800">{formData.department}</p>
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-gray-700">
                          Consulting Fee
                        </p>
                        <p className="text-gray-800">
                          {formData.consultingfee}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                      Availability
                    </h3>
                    {formData.availability &&
                    formData.availability.length > 0 ? (
                      <div>
                        <div className="flex items-start mt-2">
                          <div className="w-1/3">
                            <h4 className="text-lg font-medium text-gray-700">
                              Day
                            </h4>
                          </div>
                          <div className="w-2/3">
                            <h4 className="text-lg font-medium text-gray-700">
                              Timing
                            </h4>
                          </div>
                        </div>
                        {formData.availability.map((slot, index) => (
                          <div key={index} className="flex items-start mt-2">
                            <div className="w-1/3">
                              <p className="text-gray-600">{slot.day}</p>
                            </div>
                            <div className="w-2/3">
                              <p className="text-gray-600">{slot.timeSlot}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-600 flex items-center">
                        <span>No Data found</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </DOCDashboardlayout>
  );
};

export default DOC_Settings;
