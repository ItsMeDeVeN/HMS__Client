import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// import { useDispatch } from "react-redux";
// import { loginUser } from "../../store/authSlice";
const Login = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const res = await axios.post("http://localhost:3000/api/login", values);
      // console.log(res);
      // console.log(res.data.role);
      handleResponse(res.status, res.data.message, res);
    } catch (e) {
      console.log(e);
      handleResponse(e.response.status, e.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResponse = (status, message, res) => {
    if (status === 200) {
      toast.success(message);
      console.log(res.data)
      if (res.data.user.role === "Doctor") {
          localStorage.setItem("Token",res.data.token)
          localStorage.setItem("User_Id",res.data.user._id)
          localStorage.setItem("Role",res.data.user.role)
          localStorage.setItem("Name",res.data.user.name)
        setTimeout(() => {
          navigate("/Doctor/DashBoard");
        }, 2000);
      } else if (res.data.user.role === "Patient") {
        localStorage.setItem("Token",res.data.token)
        localStorage.setItem("User_Id",res.data.user._id)
        localStorage.setItem("Role",res.data.user.role)
        localStorage.setItem("Name",res.data.user.name)
        setTimeout(() => {
          navigate("/Patient/DashBoard");
        }, 2000);
      }
    } else if (status === 400 || status === 403 || status === 401) {
      toast.error(message);
    } else {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500">
      <div
        className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #f0f8ff, #e0e0e0)",
        }}
      >
        <div className="flex mt-2">
          <Link
            to="/"
            className="text-black font-semibold py-2  hover:bg-slate-100 transition-colors flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
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
              <label htmlFor="password" className="font-semibold text-gray-700">
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

            <button
              className={`bg-gradient-to-r from-blue-700 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-2 px-4 rounded transition-colors w-full`}
              type="submit"
            >
              Submit
            </button>
            <div className="text-center mt-4">
              <Link
                to="/forgotpassword"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
