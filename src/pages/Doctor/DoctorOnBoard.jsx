import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorOnBoard = () => {
  const navigate = useNavigate();
  const [availability, setAvailability] = useState([]);
  // const [educationalQualificationFile, setEducationalQualificationFile] =
  useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    try {
      values.availability = availability;
      setSubmitting(true);

      // Append the educationalQualificationFile to the form data
      // const formData = new FormData();
      // formData.append("educationalQualification", educationalQualificationFile);
      // Object.keys(values).forEach((key) => {
      //   formData.append(key, values[key]);
      // });

      const res = await axios.post(
        "http://localhost:3000/api/registerdoctor",
        values
      );

      handleResponse(res.status, res.data.message);
    } catch (e) {
      console.log(e);
      handleResponse(e.response.status, e.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResponse = (status, message) => {
    if (status === 201) {
      toast.success(message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else if (status >= 400 && status < 500) {
      toast.error(message);
    } else {
      toast.error("An error occurred");
    }
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    contact: "",
    gender: "",
    department: "",
    dateofbirth: "",
    age: "",
    consultingfee: "",
    address: "",
    day: "",
    timeSlot: "",
    // educationalQualification: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Full Name is Required!!!"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required!!!"),
    password: Yup.string()
      .required("Password is Required!!!")
      .min(6, "Password must be at least 6 characters"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("confirm password is Required!!!"),
    contact: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Contact detils are Required!!!!"),
    department: Yup.string().required("Department is Required!!!"),
    gender: Yup.string().required("Gender is Required!!!"),
    dateofbirth: Yup.date().required("DateOfBirth is Required!!!"),
    age: Yup.number().required("Age is Required!!!"),
    consultingfee: Yup.number().required("Consulting Fee is Required!!!"),
    address: Yup.string().required("Address is Required!!!"),
    day: Yup.string().required("Day is required"),
    timeSlot: Yup.string().required("Time Slot is required"),
    // educationalQualification: Yup.mixed().required(
    //   "Educational Qualification is Required"
    // ),
  });

  // const handleFileChange = (event, setFieldValue) => {
  //   const file = event.currentTarget.files[0];
  //   setFieldValue("educationalQualification", file);
  //   setEducationalQualificationFile(file);
  // };

  const addAvailability = (values, setFieldValue) => {
    const newAvailability = [
      ...availability,
      { day: values.day, timeSlot: values.timeSlot },
    ];
    setAvailability(newAvailability);
    setFieldValue("day", "");
    setFieldValue("timeSlot", "");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-500 to-blue-800">
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-xl py-8 px-10"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #f0f8ff, #e0e0e0)",
        }}
      >
        <h1
          className="text-3xl font-bold mb-6 text-center text-gray-800"
          style={{
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          DOCTOR SIGN UP
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="name"
                  className="font-semibold text-gray-700"
                  style={{
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Full Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                  placeholder="Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col mb-4 mt-4">
                <label
                  htmlFor="email"
                  className="font-semibold text-gray-700"
                  style={{
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                  placeholder="example@example.com"
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
                  style={{
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Contact Number
                </label>
                <Field
                  type="text"
                  name="contact"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                  placeholder="1234567890"
                />
                <ErrorMessage
                  name="contact"
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
              <div className="flex flex-col">
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
                  htmlFor="password"
                  className="font-semibold text-gray-700"
                  style={{
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                  placeholder="********"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label
                  htmlFor="confirmpassword"
                  className="font-semibold text-gray-700"
                  style={{
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmpassword"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                  placeholder="********"
                />
                <ErrorMessage
                  name="confirmpassword"
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

              <div className="flex flex-col">
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
                  type="text"
                  name="age"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                  placeholder=""
                />
                <ErrorMessage
                  name="age"
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
                  as="textarea"
                  name="address"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                  placeholder="Your Address"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label
                  htmlFor="day"
                  className="font-semibold text-gray-700"
                  style={{
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Availability
                </label>
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
                <ErrorMessage
                  name="day"
                  component="div"
                  className="text-red-500 text-sm"
                />
                <ErrorMessage
                  name="timeSlot"
                  component="div"
                  className="text-red-500 text-sm"
                />
                <div className="mt-2">
                  {availability.map((slot, index) => (
                    <div key={index} className="flex justify-between mb-1">
                      <span>
                        {slot.day}: {slot.timeSlot}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <label
                  htmlFor="consultingfee"
                  className="font-semibold text-gray-700"
                  style={{
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Consulting Fees Charged
                </label>
                <Field
                  type="text"
                  name="consultingfee"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                  placeholder="Rs :-"
                />
                <ErrorMessage
                  name="consultingfee"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {/* <div className="flex flex-col mb-4">
                <label
                  htmlFor="educationalQualification"
                  className="font-semibold text-gray-700"
                  style={{
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Educational Qualification (PDF)
                </label>
                <input
                  type="file"
                  id="educationalQualification"
                  name="educationalQualification"
                  accept=".pdf"
                  onChange={(event) => handleFileChange(event, setFieldValue)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                />
                <ErrorMessage
                  name="educationalQualification"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div> */}
              <button
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-2 px-4 rounded transition-colors w-full shadow-md"
                type="submit"
                style={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DoctorOnBoard;
