import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Dashboard.css";
import { useEffect } from "react";

const Dashboard = () => {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const api = `http://localhost:3000/data/get`;
    fetch(api)
      .then(response => {
        if (!response.ok) {
          throw new error("Filed to fetch data");
        }
        return response.json();
      })
      .then(data => {
        // console.log(data)
        setData(data.result);
      });
  }, []);



  return (
    <>
      <Navbar />
      <div className="home">
        <div className="head">
          <h2 className="push">Dashboard</h2>
          <button className="import-btn">Import</button>
          <button className="export-btn">Export</button>
        </div>

        <div className="filter">
          <div className="first">
            <label>Start Date</label>
            <input type="date" name="startdate" />
          </div>
          <div className="first">
            <label>End Date</label>
            <input type="date" name="enddate" />
          </div>
          <div className="first">
            <label>Designation</label>
            <select name="designation">
              {["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].map((item) => (
                <option key={item} value={item}>
                  {item.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="first">
            <label>Resume Uploaded</label>
            <select name="resume">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="filter">
          <button className="filter-btn">Filter</button>
        </div>
      </div>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Lead_id</th>
              <th>name</th>
              <th>email</th>
              <th>phone</th>
              <th>designation</th>
              <th>City</th>
              <th>FBID</th>
              <th>CreatedDate</th>
              <th>cv</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentItems) && currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.lead_id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.designation}</td>
                  <td>{item.city}</td>
                  <td>{item.FBID}</td>
                  <td>{item.createdDate}</td>
                  <button> <a
                    href={`http://localhost:3000/${item.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View CV
                  </a></button>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                margin: "0 5px",
                fontWeight: currentPage === i + 1 ? "bold" : "normal",
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;