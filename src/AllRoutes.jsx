import React from "react";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DoctorOnBoard from "./pages/Doctor/DoctorOnBoard";
import DoctorDashBoard from "./pages/Doctor/DoctorDashboard";
import DOC_Appointments from "./pages/Doctor/DOC_Appointments";
import DOC_Services from "./pages/Doctor/DOC_Services";
import DOC_Settings from "./pages/Doctor/DOC_Settings";

import PatientOnBoard from "./pages/Patient/PatientOnBoard";
import PatientDashboard from "./pages/Patient/PatientDashboard";
import Patient_DOCList from "./pages/Patient/Patient_DOCList";
import Patient_Settings from "./pages/Patient/Patient_Settings";
import Patient_Appointments from "./pages/Patient/Patient_Appointments";
// import ProtectedRoute from "./utils/ProtectedRoutes";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Landingpage from "./pages/Landing/Landingpage";

const AllRoutes = () => {
  return (
    <div className="AllRoutes">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>

          <Route path="/DoctorOnBoard" element={<DoctorOnBoard />}></Route>

          {/* <Route element={<ProtectedRoute allowedRoles="Doctor"/>}> */}
            <Route
              path="/DoctorDashBoard"
              element={<DoctorDashBoard />}
            ></Route>
            <Route
              path="/DoctorDashBoard/Appointments"
              element={<DOC_Appointments />}
            ></Route>
            <Route
              path="/DoctorDashBoard/Services"
              element={<DOC_Services />}
            ></Route>
            <Route
              path="/DoctorDashBoard/Settings"
              element={<DOC_Settings />}
            ></Route>
          {/* </Route> */}

          <Route path="/PatientOnBoard" element={<PatientOnBoard />}></Route>
          {/* <Route element={<ProtectedRoute allowedRoles="Patient"/>}> */}
          <Route
            path="/PatientDashBoard"
            element={<PatientDashboard />}
          ></Route>
          <Route
            path="/PatientDashBoard/Appointments"
            element={<Patient_Appointments />}
          ></Route>
          <Route
            path="/PatientDashBoard/Patient_DOCList"
            element={<Patient_DOCList />}
          ></Route>
          <Route
            path="/PatientDashBoard/Settings"
            element={<Patient_Settings />}
          ></Route>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AllRoutes;
