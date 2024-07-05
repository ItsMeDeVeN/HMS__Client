import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const navigate = useNavigate();
  const initialValues = {
    role: "",
  };

  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (setFieldValue, value) => {
    setFieldValue("role", value);
    setSelectedRole(value);
  };

  const validationSchema = Yup.object({
    role: Yup.string().required("Required"),
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-500 to-blue-800">
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-xl py-8 px-10"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #f0f8ff, #e0e0e0)",
        }}
      >
        <div className="flex">
          <Link
            to="/"
            className="text-black font-semibold py-2 hover:bg-slate-100 transition-colors flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back</span>
          </Link>
        </div>
        <h1
          className="text-3xl font-bold pb-6 text-center decoratio-solid underline decoration-solid text-gray-800"
          style={{
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          SIGN UP
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            console.log("Submitted values:", JSON.stringify(values));
            if (values.role === "Patient") {
              navigate("/signup/patient");
            } else if (values.role === "Doctor") {
              navigate("/signup/doctor");
            }
            setSubmitting(false);
          }}
        >
          {({ setFieldValue, errors }) => (
            <Form className="space-y-6 ">
              <div className="flex flex-col">
                <div className="flex space-x-12 mt-2 justify-center">
                  <label
                    className={`p-4 rounded-lg shadow-md cursor-pointer font-bold  text-center transition-all transform hover:scale-105 ${
                      selectedRole === "Patient"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                    style={{
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      minWidth: "120px",
                    }}
                  >
                    <Field
                      type="radio"
                      name="role"
                      value="Patient"
                      className="hidden"
                      onClick={() => handleRoleChange(setFieldValue, "Patient")}
                    />
                    Patient
                  </label>
                  <label
                    className={`p-4 rounded-lg shadow-md cursor-pointer font-bold text-center transition-all transform hover:scale-105 ${
                      selectedRole === "Doctor"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                    style={{
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      minWidth: "120px",
                    }}
                  >
                    <Field
                      type="radio"
                      name="role"
                      value="Doctor"
                      className="hidden"
                      onClick={() => handleRoleChange(setFieldValue, "Doctor")}
                    />
                    Doctor
                  </label>
                </div>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm mt-2 text-center"
                />
              </div>
              <button
                className={
                  "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-2 px-4 rounded transition-colors w-full shadow-md"
                }
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

export default Signup;
