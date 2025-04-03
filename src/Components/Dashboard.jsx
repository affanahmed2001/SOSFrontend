import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./Navbar";
import "./Dashboard.css";
import Update_lead from "./UpdateLead";

const Dashboard = () => {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const toggleImport = () => setIsImportOpen(!isImportOpen);
  const toggleExport = () => setIsExportOpen(!isExportOpen);

  // <Router>
  //   <Routes>
  //     <Route path="/update" element={<Update_lead />} />
  //   </Routes>
  // </Router>

  const closeModals = () => {
    setIsImportOpen(false);
    setIsExportOpen(false);
  };

  const handleStartDate = (e) => {
    setStart_date(e.target.value);
  }

  const handleEndDate = (e) => {
    setEnd_date(e.target.value);
  }

  const applyFilter = () => {
    const api = `http://localhost:3000/data/export?start_date=${start_date}&end_date=${end_date}`
    fetch(api)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch filtered data");
        }
        return response.json();
      })
      .then((data) => setData(data.result))
      .catch((error) => console.error("Error fetching data:", error));

  }

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:3000/data/csvupload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed.");
      }

      const result = await response.json();
      console.log("Success:", result);
      alert("File uploaded successfully");


      getLeadData();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  const getLeadData = async () => {
    try {
      const response = await fetch("http://localhost:3000/data/get");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getLeadData();
  }, []);



  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <Navbar />
      <div className="home">

        <div className="head">
          <h2 className="push">Dashboard</h2>

          <button className="import-btn" onClick={toggleImport}>Import</button>
          {isImportOpen && (
            <div className="modal import">
              <i className="fa-solid fa-xmark close-icon" onClick={closeModals}></i>
              <div className="importMain">
                <input type="file" name="fileUpload" onChange={handleFile} />
                <button onClick={handleUpload}>Upload</button>
              </div>
            </div>
          )}

          <button className="export-btn" onClick={toggleExport}>Export</button>
          {isExportOpen && (
            <div className="modal export-filter">
              <i className="fa-solid fa-xmark close-icon" onClick={closeModals}></i>
              <div className="filter">
                <div className="first">
                  <label>Start Date</label>
                  <input type="date" name="start_date" value={start_date} onChange={handleStartDate} />
                </div>
                <div className="first">
                  <label>End Date</label>
                  <input type="date" name="end_date" value={end_date} onChange={handleEndDate} />
                </div>
              </div>
              <div className="filter-btn">
                <button className="filter-btn" onClick={applyFilter}>Filter</button>
              </div>
            </div>
          )}
        </div>

        <div className={`table-container ${isImportOpen || isExportOpen ? "table-move-down" : ""}`}>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Designation</th>
                <th>City</th>
                <th>FBID</th>
                <th>Created Date</th>
                <th>CV</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  console.log(item.lead_id,"lead id"),
                  <tr key={index}>
                    <td>{item.lead_id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.designation}</td>
                    <td>{item.city}</td>
                    <td>{item.fbid}</td>
                    <td>{item.created_date}</td>
                    <td>
                      <a href={`http://localhost:3000/${item.file_path}`} target="_blank" rel="noopener noreferrer" className="cv-link">
                        View CV
                      </a>
                    </td>
                    <td><a href={`/update/${item.lead_id}`}>Edit</a></td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "active-page" : ""}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
