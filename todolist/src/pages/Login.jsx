import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import Todo from "../assets/Todo.jpg";
import "../css/login.css"
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handlebutton(){
    navigate("/")
    
  }
  function handleRegsiter(){
    navigate("/register")
  }

  return ( 
    <>
    <div className="login-container">
     

      <div className="circle "></div>
      
      <div className="login-text">
        
       <h1 className="title">TodoApp</h1>

       <p>Welcome back!</p>
       <p>Your goals, tasks, and ideas are waiting for you. Log in to stay organized, track progress, and make every day more productive."</p> 
      </div>
     
     
      
      <div className="login-left">
       
      </div>

      <div className="login-box">
        <h2 className="login-heading">Welcome Back</h2>

        <input
          type="text"
          placeholder="Enter your Email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />
    
       
        <p className="text-gray-400  text-center mb-4">Forget Password?</p>
      
    

        <div className="login-button-container">
          <button className="login-button" onClick={handlebutton}>Login</button>

        </div>
        <div className=" flex flex-col items-center mt-2">
          <p> Don't Have an Account?</p>
          <p className="text-blue-800" onClick={handleRegsiter}>Register Now</p>
         
            </div>
          
          

       
      </div>
    </div>
    </> 
  );
};

export default Login;