import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditDOCDetails = ({ doctorId, onClose, onUpdate }) => {
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
    activation_status: false,
  });

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const res = await axios.post("http://localhost:3000/api/getdetails", {
          id: doctorId,
        });
        setFormData(res.data.details);
      } catch (e) {
        console.error("Error fetching doctor details:", e);
      }
    };
    fetchDoctorDetails();
  }, [doctorId]);

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
    activation_status: formData.activation_status,
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
    activation_status: Yup.boolean().required("Activation Status is required"),
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
      console.log(values);
      const res = await axios.post("http://localhost:3000/api/updateDoctor", {
        ...values,
        _id: doctorId,
      });
      if (res.status === 200) {
        toast.success("Doctor details updated successfully!", {
          onClose: () => {
            onUpdate();
            onClose();
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg overflow-y-auto max-h-full">
        <h2 className="text-2xl font-bold mb-4">Edit Doctor Details</h2>
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
                  style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
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
                  style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
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
                  style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
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
                  style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
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
                  <option value="Others">Others</option>
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
                  style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
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
                  style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
                >
                  Age
                </label>
                <Field
                  type="number"
                  name="age"
                  className="border border-gray-300                   rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
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
                  <option value="General Medicine">Surgery</option>
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
                  style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
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

              {/* Activation Status */}
              <div className="flex items-center mb-4">
                <label className="mr-4 flex items-center">
                  <Field
                    type="radio"
                    name="activation_status"
                    value={true}
                    checked={values.activation_status === true}
                    onChange={() => setFieldValue("activation_status", true)}
                    className="mr-1"
                  />
                  Active
                </label>
                <label className="flex items-center">
                  <Field
                    type="radio"
                    name="activation_status"
                    value={false}
                    checked={values.activation_status === false}
                    onChange={() => setFieldValue("activation_status", false)}
                    className="mr-1"
                  />
                  Inactive
                </label>
              </div>
              <ErrorMessage
                name="activation_status"
                component="div"
                className="text-red-500 text-sm"
              />

              {/* Availability Section */}
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="availability"
                  className="font-semibold text-gray-700"
                  style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
                >
                  Availability
                </label>

                {/* Add availability section */}
                <div className="flex space-x-2 mb-2">
                  <Field
                    as="select"
                    name="day"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
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
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                    placeholder="e.g., 9AM - 5PM"
                  />
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => addAvailability(values, setFieldValue)}
                  >
                    Add
                  </button>
                </div>

                {/* Display added availability */}
                <div className="mt-2">
                  {values.availability.map((slot, index) => (
                    <div key={index} className="flex justify-between mb-1">
                      <span>
                        {slot.day}: {slot.timeSlot}
                      </span>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-700 focus:outline-none"
                        onClick={() => {
                          const updatedAvailability = [...values.availability];
                          updatedAvailability.splice(index, 1);
                          setFieldValue("availability", updatedAvailability);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditDOCDetails;
