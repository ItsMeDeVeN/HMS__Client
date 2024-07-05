import React from "react";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";

import DoctorOnBoard from "./pages/Doctor/DoctorOnBoard";
import DoctorDashBoard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import Managedoctors from "./pages/Doctor/Managedoctors";
import DoctorSettings from "./pages/Doctor/DoctorSettings";

import PatientOnBoard from "./pages/Patient/PatientOnBoard";
import PatientDashboard from "./pages/Patient/PatientDashboard";
import Managedoclist from "./pages/Patient/Managedoclist";
import PatientSettings from "./pages/Patient/PatientSettings";
import PatientAppointments from "./pages/Patient/PatientAppointments";

import ForgotPassword from "./pages/auth/ForgotPassword";
import Landingpage from "./pages/Landing/Landingpage";
import NotFound from "./NotFound";

import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageDoctor from "./admin/pages/UserManagement/DoctorManagement/ManageDoctor";
import ManagePatient from "./admin/pages/UserManagement/PatientManagement/ManagePatient";
import AdminLogin from "./admin/pages/auth/AdminLogin";
import AdminProtectedRoutes from "./admin/utils/AdminProtectedRoutes";

const AllRoutes = () => {
  return (
    <div className="AllRoutes">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="*" element={<NotFound />}></Route>

          <Route path="/auth/login" element={<AdminLogin />}></Route>

          <Route element={<AdminProtectedRoutes allowedRole={"Admin"} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
            <Route path="/admin/patients" element={<ManagePatient />}></Route>
            <Route path="/admin/doctors" element={<ManageDoctor />}></Route>
          </Route>

          <Route path="/signup/doctor" element={<DoctorOnBoard />}></Route>
          <Route element={<ProtectedRoutes allowedRole={"Doctor"} />}>
            <Route
              path="/doctor/dashboard"
              element={<DoctorDashBoard />}
            ></Route>
            <Route
              path="/doctor/appointments"
              element={<DoctorAppointments />}
            ></Route>
            <Route path="/doctor/doctors" element={<Managedoctors />}></Route>
            <Route path="/doctor/settings" element={<DoctorSettings />}></Route>
          </Route>

          <Route path="/signup/patient" element={<PatientOnBoard />}></Route>
          <Route element={<ProtectedRoutes allowedRole={"Patient"} />}>
            <Route
              path="/patient/dashboard"
              element={<PatientDashboard />}
            ></Route>
            <Route
              path="/patient/appointments"
              element={<PatientAppointments />}
            ></Route>
            <Route path="/patient/doctors" element={<Managedoclist />}></Route>
            <Route
              path="/patient/settings"
              element={<PatientSettings />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AllRoutes;
