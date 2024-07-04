import React from "react";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";

import DoctorOnBoard from "./pages/Doctor/DoctorOnBoard";
import DoctorDashBoard from "./pages/Doctor/DoctorDashboard";
import DOC_Appointments from "./pages/Doctor/DOC_Appointments";
import Managedoctors from "./pages/Doctor/Managedoctors";
import DOC_Settings from "./pages/Doctor/DOC_Settings";

import PatientOnBoard from "./pages/Patient/PatientOnBoard";
import PatientDashboard from "./pages/Patient/PatientDashboard";
import Managedoclist from "./pages/Patient/Managedoclist";
import Patient_Settings from "./pages/Patient/Patient_Settings";
import Patient_Appointments from "./pages/Patient/Patient_Appointments";

import ForgotPassword from "./pages/auth/ForgotPassword";
import Landingpage from "./pages/Landing/Landingpage";
import NotFound from "./NotFound";

import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageDoctor from "./admin/pages/UserManagement/DoctorManagement/ManageDoctor";
import ManagePatient from "./admin/pages/UserManagement/PatientManagement/ManagePatient";
import AdminLogin from "./admin/pages/auth/AdminLogin";
import EditDOCDetails from "./admin/pages/UserManagement/DoctorManagement/EditDOCDetails";
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
            <Route path="/Admin/Dashboard" element={<AdminDashboard />}></Route>
            <Route
              path="/Admin/Patient_List"
              element={<ManagePatient />}
            ></Route>
            <Route path="/Admin/DOC_List" element={<ManageDoctor />}></Route>
            <Route
              path="/Admin/DOC_List/EditDOCDetails"
              element={<EditDOCDetails />}
            ></Route>
          </Route>

          <Route path="/signup/Doctor" element={<DoctorOnBoard />}></Route>
          <Route element={<ProtectedRoutes allowedRole={"Doctor"} />}>
            <Route
              path="/Doctor/DashBoard"
              element={<DoctorDashBoard />}
            ></Route>
            <Route
              path="/Doctor/Appointments"
              element={<DOC_Appointments />}
            ></Route>
            <Route path="/Doctor/Doctors" element={<Managedoctors />}></Route>
            <Route path="/Doctor/Settings" element={<DOC_Settings />}></Route>
          </Route>

          <Route path="/signup/Patient" element={<PatientOnBoard />}></Route>
          <Route element={<ProtectedRoutes allowedRole={"Patient"} />}>
            <Route
              path="/Patient/DashBoard"
              element={<PatientDashboard />}
            ></Route>
            <Route
              path="/Patient/Appointments"
              element={<Patient_Appointments />}
            ></Route>
            <Route path="/Patient/Doctors" element={<Managedoclist />}></Route>
            <Route
              path="/Patient/Settings"
              element={<Patient_Settings />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AllRoutes;
