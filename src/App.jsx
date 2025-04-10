import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard'
import Login from './Components/Login';
import CreateLead from './Components/CreatLead';
import Update_lead from './Components/UpdateLead';

function App() {

  return (
    <>
    
        <Router>
          <Routes>
            <Route path="/" element={<Login /> } />
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/create" element={<CreateLead />} />
            <Route path="/update/:lead_id" element={<Update_lead />} />
          </Routes>
        </Router>
    </>
  )
}

export default App
