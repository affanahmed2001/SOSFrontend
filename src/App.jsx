import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard'
import Login from './Components/Login';
import CreateLead from './Components/CreatLead';
import Updatelead from './Components/UpdateLead';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {

  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Login /> } />
            <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute>} /> 
            <Route path="/create" element={ <ProtectedRoute><CreateLead /></ProtectedRoute>} />
            <Route path="/update/:lead_id" element={<ProtectedRoute><Updatelead /></ProtectedRoute>} />
          </Routes>
        </Router>
    </>
  )
}

export default App
