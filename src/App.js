// import './App.css';
// import Signup from './pages/auth/Signup';
// import Login from './pages/auth/Login';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import PatientOnBoard from './pages/Patient/PatientOnBoard';
// import DoctorOnBoard from './pages/Doctor/DoctorOnBoard';
// import PatientDashboard from './pages/Patient/PatientDashboard';
// import DoctorDashBoard from './pages/Doctor/DoctorDashboard';
// import DOC_Patients from './pages/Doctor/DOC_Patients';
// import DOC_Services from './pages/Doctor/DOC_Services';
// import DOC_Settings from './pages/Doctor/DOC_Settings';

// function App() {
//   return (
//   <div className="App">
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Signup/>}></Route>
//         <Route path="/PatientOnBoard" element={<PatientOnBoard/>}></Route>
//         <Route path="/DoctorOnBoard" element={<DoctorOnBoard/>}></Route>
//         <Route path="/PatientDashBoard" element={<PatientDashboard/>}></Route>
//         <Route path="/DoctorDashBoard" element={<DoctorDashBoard/>}></Route>
//         <Route path="/DoctorDashBoard/Patients" element={<DOC_Patients/>}></Route>
//         <Route path="/DoctorDashBoard/Services" element={<DOC_Services/>}></Route>
//         <Route path="/DoctorDashBoard/Settings" element={<DOC_Settings/>}></Route>
//         <Route path="/login" element={<Login/>}></Route>
//       </Routes>
//     </BrowserRouter>
//   </div>
// )}

// export default App;

import React from 'react'
import AllRoutes from './AllRoutes'
const App = () => {
  return (
    <div>
      <AllRoutes/>
    </div>
  )
}

export default App  