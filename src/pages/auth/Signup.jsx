import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const initialValues = {
    role: "",
  };

  const validationSchema = Yup.object({
    role: Yup.string().required("Required"),
  });

  const handleRoleChange = (setFieldValue, value) => {
    setFieldValue("role", value);
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
          SIGN UP
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            localStorage.setItem("details", JSON.stringify(values));
            setSubmitting(true);
            console.log("Submitted values:", JSON.stringify(values));
            toast.success("Form submitted successfully!");
            if (values.role === "Patient") {
              navigate("/PatientOnBoard");
            } else if (values.role === "Doctor") {
              navigate("/DoctorOnBoard");
            }
            setSubmitting(false);
          }}
        >
          {({ setFieldValue, errors }) => (
            <Form className="space-y-6">
              <div className="flex flex-col">
                <div className="flex  space-x-4 mt-2 ">
                  <label
                    htmlFor="role"
                    className="font-semibold text-gray-700 text-2xl"
                    style={{
                      textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h1>Role:</h1>
                  </label>
                  <label
                    className="flex items-center text-2xl"
                    style={{
                      textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Field
                      type="radio"
                      name="role"
                      value="Patient"
                      className="mr-2 form-radio text-blue-500 focus:ring-blue-500"
                      onClick={() => handleRoleChange(setFieldValue, "Patient")}
                    />
                    Patient
                  </label>
                  <label
                    className="flex items-center text-2xl mx-2"
                    style={{
                      textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Field
                      type="radio"
                      name="role"
                      value="Doctor"
                      className="mr-2 form-radio text-blue-500 focus:ring-blue-500"
                      onClick={() => handleRoleChange(setFieldValue, "Doctor")}
                    />
                    Doctor
                  </label>
                </div>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              <button
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-2 px-4 rounded transition-colors w-full shadow-md"
                type="submit"
                onClick={() => {
                  console.log("Clicked");
                }}
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