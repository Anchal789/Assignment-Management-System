import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1 className="welcome-div">Welcome</h1>
      <div className="home-content">
        <div className="faculty-div">
          <h1>Faculty</h1>
          <button
            type="button"
            onClick={() => {
              navigate("/faculty signup");
            }}
            className="faculty_signup_btn"
          >
            Sign Up
          </button>
          <button type="button" onClick={()=>{navigate("/faculty login")}}>Login</button>
        </div>
        <div className="student-div">
          <h1>Student</h1>
          <button
            type="button"
            onClick={() => {
              navigate("/student signup");
            }}
            className="student_signup_btn"
          >
            Sign Up
          </button>
          <button type="button" onClick={()=>{navigate("/student login")}}>Login</button>
        </div>
      </div>
    </div>
  );
};
