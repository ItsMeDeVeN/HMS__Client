import React, { useEffect, useState } from "react";
import DOCDashboardlayout from "../../layouts/DOCDashboardlayout";
import axios from "axios";
import profile from "../../components/profile.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DOC_Settings = () => {

  // const getUserId = () => {}

  const id = localStorage.getItem("User_Id");
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    consultingfee: "",
    department: "",
    age: "",
    dateofbirth: "",
    gender: "",
    address: "",
    availability: [],
    day: "",
    timeSlot: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/getdetails", {
        id: id,
      });
      if (res.data && res.data.details) {
        setData(res.data.details);
        setFormData({
          ...res.data.details,
          availability: res.data.details.availability || [],
          day: "",
          timeSlot: "",
        });
      } else {
        console.error("Invalid response structure:", res.data);
      }
    } catch (e) {
      console.error("Error fetching doctor details:", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/updatedoctor", {
        ...formData,
        _id: id,
      });
      console.log(res)
      if (res.data.success) {
        setData(formData);
        setIsEditing(false);
        toast.success("Details updated successfully");
      } else {
        toast.error("Failed to update details");
      }
    } catch (error) {
      console.error("Error updating doctor details:", error);
      toast.error("Someting Went Wrong !!");
    }
  };

  const addAvailability = () => {
    if (formData.day && formData.timeSlot) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        availability: [
          ...prevFormData.availability,
          { day: formData.day, timeSlot: formData.timeSlot },
        ],
        day: "",
        timeSlot: "",
      }));
    }
  };

  const removeAvailability = (index) => {
    setFormData((prevFormData) => {
      const newAvailability = [...prevFormData.availability];
      newAvailability.splice(index, 1);
      return { ...prevFormData, availability: newAvailability };
    });
  };

  return (
    <DOCDashboardlayout>
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-between items-center h-20 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 text-2xl font-bold px-6 shadow-lg">
          <span className="tracking-wide">Doctor Profile</span>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="bg-gray-100 min-h-screen px-6 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:shadow-xl">
            <div className="px-8 py-6">
              <div className="flex flex-col md:flex-row items-center">
                <img
                  src={profile || "/placeholder.jpg"}
                  alt="Profile"
                  className="rounded-full h-40 w-40 object-cover shadow-lg border-4 border-white"
                />
                <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">
                    {data.name}
                  </h2>
                  <p className="text-gray-600 text-xl mb-1">
                    {data.department}
                  </p>
                  <p className="text-gray-600">{data.email}</p>
                </div>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mt-10">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                      Personal Information
                    </h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center">
                        <label className="font-semibold w-20">Name:</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              name: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="font-semibold w-20">Gender:</label>
                        <input
                          type="text"
                          value={formData.gender}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              gender: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="font-semibold w-20">DOB:</label>
                        <input
                          type="date"
                          value={formData.dateofbirth}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dateofbirth: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="font-semibold w-20">Age:</label>
                        <input
                          type="number"
                          value={formData.age}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              age: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                      Professional Information
                    </h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center">
                        <label className="font-semibold w-40">
                          Department:
                        </label>
                        <input
                          type="text"
                          value={formData.department}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              department: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="font-semibold w-40">
                          Consulting Fee:
                        </label>
                        <input
                          type="number"
                          value={formData.consultingfee}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              consultingfee: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                        />
                      </div>
                    </div>
                    <div className="mt-10">
                      <h3 className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-gray-200">
                        Availability
                      </h3>
                      <div className="flex flex-col mb-4">
                        <label
                          htmlFor="availability"
                          className="font-semibold text-gray-700"
                          style={{
                            textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          Availability (Add timings slot-wise for a particular
                          day)
                        </label>
                        <div className="flex space-x-2 mb-2">
                          <select
                            name="day"
                            value={formData.day}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                day: e.target.value,
                              })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                          >
                            <option value="">Select Day</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                          </select>
                          <input
                            type="text"
                            value={formData.timeSlot}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                timeSlot: e.target.value,
                              })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                          />
                          <button
                            type="button"
                            onClick={addAvailability}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          >
                            Add
                          </button>
                        </div>
                        <div>
                          {formData.availability.length > 0 ? (
                            <ul>
                              {formData.availability.map((slot, index) => (
                                <li
                                  key={index}
                                  className="flex items-center mb-2"
                                >
                                  <span className="font-semibold">
                                    {slot.day}:{" "}
                                  </span>
                                  <span className="ml-2">{slot.timeSlot}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeAvailability(index)}
                                    className="ml-2 text-red-500"
                                  >
                                    Remove
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>No availability slots added yet.</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 flex justify-center">
                      <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="mt-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                    Personal Information
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center">
                      <label className="font-semibold w-20">Name:</label>
                      <span>{data.name}</span>
                    </div>
                    <div className="flex items-center">
                      <label className="font-semibold w-20">Gender:</label>
                      <span>{data.gender}</span>
                    </div>
                    <div className="flex items-center">
                      <label className="font-semibold w-20">DOB:</label>
                      <span>{data.dateofbirth}</span>
                    </div>
                    <div className="flex items-center">
                      <label className="font-semibold w-20">Age:</label>
                      <span>{data.age}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-4 pb-2 border-b-2 border-gray-200">
                    Professional Information
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center">
                      <label className="font-semibold w-40">Department:</label>
                      <span>{data.department}</span>
                    </div>
                    <div className="flex items-center">
                      <label className="font-semibold w-40">
                        Consulting Fee:
                      </label>
                      <span>{data.consultingfee}</span>
                    </div>
                  </div>

                  <h2 className="pt-2 flex items-center font-semibold w-40">
                    Availability:
                  </h2>
                  {data.availability && data.availability.length > 0 ? (
                    <div>
                      <div className="flex items-start mt-2">
                        <div className="w-1/3">
                          <h3 className="text-lg font-medium text-gray-700">
                            Day
                          </h3>
                        </div>
                        <div className="w-2/3">
                          <h3 className="text-lg font-medium text-gray-700">
                            Timing
                          </h3>
                        </div>
                      </div>
                      {data.availability.map((slot, index) => (
                        <div key={index} className="flex items-start mt-2">
                          <div className="w-1/3">
                            <p className="text-gray-600">{slot.day}</p>
                          </div>
                          <div className="w-2/3">
                            <p className="text-gray-600">{slot.timeSlot}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-600 flex items-center">
                      <span>No Data found</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </DOCDashboardlayout>
  );
};

export default DOC_Settings;

