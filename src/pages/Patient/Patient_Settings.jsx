import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PatientDashboardlayout from "../../layouts/PatientDashboardlayout";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  contact: Yup.string().required("Contact is required"),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  age: Yup.number().required("Age is required"),
  bloodGroup: Yup.string().required("Blood Group is required"),
  address: Yup.string().required("Address is required"),
  medicalHistory: Yup.string().required("Medical History is required"),
});

const initialValues = {
  name: "",
  email: "",
  contact: "",
  gender: "",
  dateOfBirth: "",
  age: "",
  bloodGroup: "",
  address: "",
  medicalHistory: "",
};

const handleFormSubmit = (values) => {
  console.log(values);
  // Implement the logic to send data to the backend and update MongoDB
};

const Patient_Settings = () => {
  return (
    <div className="bg-slate-800 min-h-screen">
      <PatientDashboardlayout>
        <div className="flex justify-center items-center h-16 bg-gray-800 text-2xl font-bold text-gray-300">
          Settings
        </div>

        <div className="py-6 px-8 mb-0 bg-gray-900 text-yellow-200 text-xl font-semibold rounded-md shadow-lg flex items-center justify-center my-4">
          Profile Details
        </div>

        <div className="p-8 pt-0">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6 bg-gray-300 p-8 rounded-md shadow-md">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-gray-700">
                    Name
                  </label>
                  <Field
                    name="name"
                    type="text"
                    className="mt-1 p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="text-gray-700">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="mt-1 p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="contact" className="text-gray-700">
                    Contact
                  </label>
                  <Field
                    name="contact"
                    type="text"
                    className="mt-1 p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="contact"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="gender" className="text-gray-700">
                    Gender
                  </label>
                  <Field
                    name="gender"
                    as="select"
                    className="mt-1 p-2 border rounded-md"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="dateOfBirth" className="text-gray-700">
                    Date of Birth
                  </label>
                  <Field
                    name="dateOfBirth"
                    type="date"
                    className="mt-1 p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="dateOfBirth"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="age" className="text-gray-700">
                    Age
                  </label>
                  <Field
                    name="age"
                    type="number"
                    className="mt-1 p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="bloodGroup" className="text-gray-700">
                    bloodGroup
                  </label>
                  <Field
                    name="bloodGroup"
                    as="select"
                    className="mt-1 p-2 border rounded-md"
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
                    name="bloodGroup"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="address" className="text-gray-700">
                    Address
                  </label>
                  <Field
                    name="address"
                    type="text"
                    className="mt-1 p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="medicalHistory" className="text-gray-700">
                    Medical History
                  </label>
                  <Field
                    name="medicalHistory"
                    as="textarea"
                    className="mt-1 p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="medicalHistory"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600 transition-colors"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </PatientDashboardlayout>
    </div>
  );
};

export default Patient_Settings;
