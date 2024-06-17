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

const AllRoutes = () => {
  return (
    <div className="AllRoutes">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/DoctorOnBoard" element={<DoctorOnBoard />}></Route>
          <Route path="/DoctorDashBoard" element={<DoctorDashBoard />}></Route>
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

          <Route path="/PatientOnBoard" element={<PatientOnBoard />}></Route>
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
            element={<Patient_DOCList/>}
          ></Route>
          <Route
            path="/PatientDashBoard/Settings"
            element={<Patient_Settings />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AllRoutes;
