import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const DoctorOnBoard = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    contact: "",
    dateofbirth: "",
    Doc_fee: "",
    Department: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be at least 6 characters"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    contact: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Required"),
    dateofbirth: Yup.date().required("Required"),
    Doc_fee: Yup.number().required("Required"),
    Department: Yup.string().required("Required"),
  });

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
          onSubmit={(values, { setSubmitting }) => {
            localStorage.setItem("details", JSON.stringify(values));
            setSubmitting(true);
            console.log("Submitted values:", values);
            toast.success("Form submitted successfully!");
            setSubmitting(false);
            
            setTimeout(() => {
              navigate("/login")
              }, 3000)
          }}
        >
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
                htmlFor="Doc_fee"
                className="font-semibold text-gray-700"
                style={{
                  textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                }}
              >
                Consulting Fees Charged
              </label>
              <Field
                type="text"
                name="Doc_fee"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                placeholder="Rs :-"
              />
              <ErrorMessage
                name="Doc_fee"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="Department"
                className="font-semibold text-gray-700"
                style={{
                  textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                }}
              >
                Department
              </label>
              <Field
                as="select"
                name="Department"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
              >
                <option value="">Select Department</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="neurology">Neurology</option>
                <option value="oncology">Oncology</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="radiology">Radiology</option>
                <option value="surgery">Surgery</option>
              </Field>
              <ErrorMessage
                name="Department"
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
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DoctorOnBoard;
