import './App.css';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PatientOnBoard from './pages/auth/PatientOnBoard';
import DoctorOnBoard from './pages/auth/DoctorOnBoard';

function App() {
  return (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/PatientOnBoard" element={<PatientOnBoard/>}></Route>
        <Route path="/DoctorOnBoard" element={<DoctorOnBoard/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  </div>
)}

export default App;
