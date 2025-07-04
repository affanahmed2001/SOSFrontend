import React, { useState } from 'react'
import "./Login.css"
import dashboard from "./Dashboard"
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  
  const handleSubmit = async (e) => {
    const API = `http://localhost:3000/data/login`;
    e.preventDefault();

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", 
        body: JSON.stringify(loginData)
      });
      

      const data = await response.json();

      
      if (data.success) {
        const token = data.token; 
        localStorage.setItem("token", token); 
      
        alert("Login success");
        navigate("/dashboard");
      } else {
        alert(data.message || "Login Failed");
      }
      

    } catch (error) {
      console.log("Error", error);
      alert("Login error");
    }
  };



  return (
    <>
      <div className='loginHome'>
        <form onSubmit={handleSubmit}>
          <img src="/image/Logo.png" alt="" className='logo' />
          <input
            type="text"
            name="username"
            placeholder="Your Email"
            value={loginData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>

      </div>
    </>
  )
}


export default Login 

