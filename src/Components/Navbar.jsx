import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const closeSide = () => {
    setOpen(false);
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
              <NavLink to={"/"} activeClassName="active-link">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={"/create"} activeClassName="active-link">
                Create Lead
              </NavLink>
            </li>
            <li>
              <NavLink to={"/login"} activeClassName="active-link">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
