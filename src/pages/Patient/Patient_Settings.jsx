import React from 'react'
import PatientDashboardlayout from '../../layouts/PatientDashboardlayout'
const Patient_Settings = () => {
  return (

    <div>
      <PatientDashboardlayout>
      <div className="flex justify-center items-center h-16 bg-gray-800 text-2xl font-bold text-gray-300">
          Settings
        </div>
        <div className="bg-gray-100 px-4 py-4">PATIENTS's Settings called</div>
      </PatientDashboardlayout>
      <h1>Patient Profile</h1>
    </div>
  );
}

export default Patient_Settings
