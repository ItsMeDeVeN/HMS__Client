import React,{useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const PatientOnBoard = () => {
  
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const res = await axios.post("http://localhost:3000/api/registerpatient", values);
      console.log(res);
      handleResponse(res.status, res.data.message);
    } catch (e) {
      console.log(e);
      const status = e.response ? e.response.status : 500;
      const message = e.response ? e.response.data.message : "An error occurred";
      handleResponse(status, message);
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
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    contact: "",
    gender: "",
    dateofbirth: "",
    age: "",
    bloodgroup: "",
    address: "",
    medicalHistory: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Full Name is Required!!!"),
    email: Yup.string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid Email Format"
      )
      .required("Email is Required!!!"),
    password: Yup.string()
      .required("Password is Required!!!")
      .min(6, "Password must be at least 6 characters"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is Required!!!"),
    contact: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Contact Details is Required!!!"),
    gender: Yup.string().required("Gender is Required!!!"),
    dateofbirth: Yup.date().required("Required"),
    age: Yup.number().required("Required"),
    bloodgroup: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    medicalHistory: Yup.string(),
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
          // onSubmit={(values, { setSubmitting }) => {
          //   localStorage.setItem("details", JSON.stringify(values));
          //   setSubmitting(true);
          //   console.log("Submitted values:", values);
          //   toast.success("Form submitted successfully!");
          //   setSubmitting(false);
          //   setTimeout(() => {
          //     navigate("/login");
          //   }, 3000);
          // }}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
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
            <div className="flex flex-col">
              <label
                htmlFor="medicalHistory"
                className="font-semibold text-gray-700"
                style={{
                  textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                }}
              >
                Medical History
              </label>
              <Field
                as="textarea"
                name="medicalHistory"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                placeholder="Describe your medical history"
              />
              <ErrorMessage
                name="medicalHistory"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-2 px-4 rounded transition-colors w-full shadow-md"
              type="submit"
              // onClick={() => {
              //   console.log("Clicked");
              // }}
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
              disabled={submitting}
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
