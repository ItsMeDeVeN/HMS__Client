import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const res = await axios.post(
        "http://localhost:3000/api/forgotpassword",
        values
      );
      console.log(res);
      handleResponse(res.status, res.data.message);
    } catch (e) {
      console.log(e);
      const status = e.response ? e.response.status : 500;
      const message = e.response
        ? e.response.data.message
        : "An error occurred";
      handleResponse(status, message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResponse = (status, message) => {
    if (status === 200) {
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Change Password
        </h1>
        <Formik
          initialValues={{
            email: "",
            newpassword: "",
            confirmnewpassword: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            newpassword: Yup.string()
              .required("Required")
              .min(6, "Password must be at least 6 characters"),
            confirmnewpassword: Yup.string()
              .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
              .required("Required"),
          })}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold text-gray-700">
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
            <div className="flex flex-col">
              <label
                htmlFor="newpassword"
                className="font-semibold text-gray-700"
              >
                New Password
              </label>
              <Field
                type="password"
                name="newpassword"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                placeholder="********"
              />
              <ErrorMessage
                name="newpassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="confirmnewpassword"
                className="font-semibold text-gray-700"
              >
                Confirm New Password
              </label>
              <Field
                type="password"
                name="confirmnewpassword"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                placeholder="********"
              />
              <ErrorMessage
                name="confirmnewpassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              className={`bg-gradient-to-r from-blue-700 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-2 px-4 rounded transition-colors w-full ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Reset Password"}
            </button>
            <div className="text-center mt-4">
              <Link to="/login" className="text-blue-500 hover:underline">
                Back to Login
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
