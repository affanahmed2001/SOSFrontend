import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard'
import Login from './Components/Login';
import CreateLead from './Components/CreatLead';

function App() {

  return (
    <>
    
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateLead />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
    </>
  )
}

export default App
