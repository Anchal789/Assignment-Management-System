import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import CollegeLogo from "../../../Assets/college_logo-removebg-preview.png";
import FlareIcon from '@mui/icons-material/Flare';
export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="top-container">
        <div className="top-overlay"></div>
        <div className="top-content">
          <img src={CollegeLogo} alt="college logo" className="college-logo" />
          <h1 className="project-heading">
            Welcome to BITS Online Assignment Management System
          </h1>
        </div>
      </div>
      <div className="section-container">
        {/* Left Section */}
        <div className="home-left-section">
          {/* <h2 className="section-heading">College Assignment</h2> */}
          <div className="home-content">
            <div className="faculty-div">
              <h3 className="section-subheading">Faculty</h3>
              <div className="home-button-section">
                <button
                  type="button"
                  onClick={() => navigate("/faculty signup")}
                  className="signup-btn"
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/faculty login")}
                  className="login-btn"
                >
                  Login
                </button>
              </div>
            </div>
            <div className="student-div">
              <h3 className="section-subheading">Student</h3>
             <div className="home-button-section">
             <button
                type="button"
                onClick={() => navigate("/student signup")}
                className="signup-btn"
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => navigate("/student login")}
                className="login-btn"
              >
                Login
              </button>
             </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="home-right-section">
          <h2 className="keyfeature-heading">Key Features</h2>

          <ul className="feature-list">
            <li><FlareIcon/> Create and manage assignments</li>
            <li><FlareIcon/> Close assignments before the deadline</li>
            <li><FlareIcon/> Submit assignments as a student </li>
            <li><FlareIcon/> Give remarks and marks to students</li>
            <li><FlareIcon/> Check assignment history</li>
            <li><FlareIcon/> View marks for assignments</li>
          </ul>
        </div>
      </div>
      <footer>
        <button>Contact US</button>
      </footer>
    </div>
  );
};
