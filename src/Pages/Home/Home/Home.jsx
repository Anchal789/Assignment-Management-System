import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import CollegeLogo from "../../../Assets/college_logo-removebg-preview.png";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="home-left-section">
        <img src={CollegeLogo} alt="college logo" className="college-logo" />

        <h1 className="welcome-text">Welcome</h1>
        <div className="home-content">
          <div className="faculty-div">
            <h1 className="home-headings">Faculty</h1>
            <button
              type="button"
              onClick={() => {
                navigate("/faculty signup");
              }}
              className="signup_btn"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/faculty login");
              }}
              className="login_btn"
            >
              Login
            </button>
          </div>
          <div className="student-div">
            <h1 className="home-headings">Student</h1>
            <button
              type="button"
              onClick={() => {
                navigate("/student signup");
              }}
              className="signup_btn"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/student login");
              }}
              className="login_btn"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="home-right-section">
        <h1 className="college-name">Online Assignment Management System</h1>
        <h4 className="college-name">Online Assignment Management System</h4>
      </div>
    </div>
  );
};
