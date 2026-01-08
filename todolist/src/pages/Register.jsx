import React, { useState } from "react";
import "../css/register.css";
import { Navigate, useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const navigate=useNavigate()
   function handlesignIn(){
    navigate("/login")
  }
  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="font-bold  text-4xl mb-4">Register an Account</h2>
        <div className="register-content">

         <label className="label-content">Username</label>
          <input
            type="text"
            placeholder="enter name"
            className="register-input"
            onChange={(e) => setName(e.target.value)}
          />
           <label className="label-content">Password</label>
         
          <input
            type="Email"
            placeholder="enter email"
            className="register-input"
            onChange={(e) => setEmail(e.target.value)}
          />
         <label className="label-content"> Password</label>
          <input
            type="password"
            placeholder="enter password"
            className="register-input"
            onChange={(e) => setPassword(e.target.value)}
          />
         <label className="label-content"> Confirm Password</label>
          <input
            type="password"
            placeholder="conform password"
            className="register-input"
            onChange={(e) => setNumber(e.target.value)}
          />
          <div className="sumbit-button">
            <button>Sumbit</button>
          </div>

          <p>Already have an account</p>
          <p  onClick={handlesignIn}>SignIn</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
