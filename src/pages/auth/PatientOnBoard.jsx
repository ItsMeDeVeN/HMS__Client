import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientOnBoard = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    contact: "",
    dateofbirth: "",
    age: "",
    bloodgroup: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Required"),
    email: Yup.string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid Email Format"
      )
      .required("Required"),
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
    age: Yup.number(),
    bloodgroup: Yup.string(),
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
          PATIENT SIGN UP
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
          }}
        >
          <Form className="space-y-6">
            <div className="flex flex-col">
              {/* {console.log("errors ==>", errors)} */}
            </div>

            <>
              <div className="flex flex-col">
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
              <div className="flex flex-col">
                <label
                  htmlFor="dateofbirth"
                  className="font-semibold text-gray-700"
                  style={{
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  DOB
                </label>
                <Field
                  type="date"
                  name="dateofbirth"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                  placeholder="Name"
                />
                <ErrorMessage
                  name="dateofbirth"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col">
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
              <div className="flex flex-col">
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

              {/* Additional fields for Patient */}
              <>
                <div className="flex flex-col">
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

                <div className="flex flex-col">
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
                <div className="flex flex-col">
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
              </>
            </>

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
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PatientOnBoard;
