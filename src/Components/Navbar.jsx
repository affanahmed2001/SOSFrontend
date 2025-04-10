import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()


  const handleOpen = () => {
    setOpen(!open);
  };

  const closeSide = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/data/logout", {
        method: "POST",
        credentials: "include" // ✅ important if using sessions
      });
  
      const data = await response.json();
  
      if (data.success) {
        navigate('/'); // ✅ redirect to login/home
      } else {
        alert(data.message || "Logout failed");
      }
  
      return data;
    } catch (error) {
      console.error("Logout Error:", error);
      return { success: false, message: "Logout failed" };
    }
  };
  

  return (
    <>
      <nav className="navbar">
        <img src="/image/Logo.png" alt="Logo" className="logo" />
        <div className="hamburger" onClick={handleOpen}>
          <i className={`fa-solid fa-bars`}></i>
        </div>
        <div className={`sidebar ${open ? "open" : ""}`}>
          <div className="sideNav">
            <i className="fa-solid fa-xmark close-icon" onClick={closeSide}></i>
            <img src="/image/Logo.png" alt="Logo" className="sidebar-logo" />
          </div>
          <ul>
            <li>
              <NavLink to={"/dashboard"} activeClassName="active-link">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={"/create"} activeClassName="active-link">
                Create Lead
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active-link" onClick={handleLogout}>
                LogOut 
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
