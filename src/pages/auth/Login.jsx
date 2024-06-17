import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
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
          onSubmit={(values) => {
            const stored_details = JSON.parse(localStorage.getItem("details"));
            const which_role = JSON.parse(localStorage.getItem("role"));
            // console.log(which_role.role)
            // console.log(stored_details.email, stored_details.password)
            if (
              stored_details.email === values.email &&
              stored_details.password === values.password
            ) {
              // console.log(values.email, values.password);
              toast.success("Login Successfull");
              if(which_role.role === "Doctor"){
              setTimeout(() => {
                navigate("/DoctorDashBoard");
              }, 3000);
            } else if(which_role.role === "Patient"){
              setTimeout(() => {
                navigate("/PatientDashBoard");
              }, 3000);
            } 
            else {
              toast.error("Invalid Credentials");
              setTimeout(() => {
                navigate("/login");
              }, 3000);
            }
          }}}
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
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
