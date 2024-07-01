import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPatientDetails = ({ patientId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    gender: "",
    dateofbirth: "",
    bloodgroup: "",
    age: "",
    address: "",
    medicalHistory: "",
  });

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const res = await axios.post("http://localhost:3000/api/getdetails", {
          id: patientId,
        });
        setFormData(res.data.details);
      } catch (e) {
        console.error("Error fetching patient details:", e);
      }
    };
    fetchPatientDetails();
  }, [patientId]);

  const initialValues = {
    name: formData.name,
    email: formData.email,
    contact: formData.contact,
    gender: formData.gender,
    dateofbirth: formData.dateofbirth,
    bloodgroup: formData.bloodgroup,
    age: formData.age,
    address: formData.address,
    medicalHistory: formData.medicalHistory,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Full Name is Required!!!"),
    contact: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Contact Details is Required!!!"),
    gender: Yup.string().required("Gender is required"),
    dateofbirth: Yup.date().required("Date of Birth is required"),
    bloodgroup: Yup.string().required("Bloodgroup is required"),
    age: Yup.number().required("Age is required"),
    address: Yup.string().required("Address is required"),
    medicalHistory: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post("http://localhost:3000/api/updatePatient", {
        ...values,
        _id: patientId,
      });
      if (res.status === 200) {
        toast.success("Patient details updated successfully!", {
          onClose: () => {
            onUpdate();
            onClose();
          },
        });
      }
    } catch (e) {
      console.error("Error updating patient details:", e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg overflow-y-auto max-h-full">
        <h2 className="text-2xl font-bold mb-4">Edit Patient Details</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form>
              {/* Existing form fields */}
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="name"
                  className="font-semibold text-gray-700"
                  style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label
                  htmlFor="contact"
                  className="font-semibold text-gray-700"
                  style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
                >
                  Contact
                </label>
                <Field
                  type="text"
                  name="contact"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                />
                <ErrorMessage
                  name="contact"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label
                  htmlFor="gender"
                  className="font-semibold text-gray-700"
                  style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
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
                  htmlFor="dateofbirth"
                  className="font-semibold text-gray-700"
                  style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
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

              <div className="flex flex-col mb-4">
                <label
                  htmlFor="age"
                  className="font-semibold text-gray-700"
                  style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
                >
                  Age
                </label>
                <Field
                  type="number"
                  name="age"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
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
                  style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
                >
                  Address
                </label>
                <Field
                  as="textarea"
                  type="text"
                  name="address"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col mb-4">
                <label
                  htmlFor="medicalHistory"
                  className="font-semibold text-gray-700"
                  style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)" }}
                >
                  Medical History
                </label>
                <Field
                  as="textarea"
                  type="number"
                  name="medicalHistory"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                />
                <ErrorMessage
                  name="medicalHistory"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

             

              {/* Buttons */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditPatientDetails;
