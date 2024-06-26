import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import CollegeLogo from "../../../Assets/college_logo-removebg-preview.png";
import FlareIcon from "@mui/icons-material/Flare";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacultyIcon from "../../../Assets/teacher-with-stick-svgrepo-com.svg";
import StudentIcon from "../../../Assets/student-graduating-svgrepo-com.svg";
import AdminIcon from "../../../Assets/authorized-person.png";

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
        <div className="middle-overlay"></div>
        {/* Left Section */}
        <div className="home-left-section">
          <div className="home-content">
            <div className="user-section">
              <div className="admin-div">
                <div className="icon-heading">
                  <img src={AdminIcon} className="icons" alt="" />
                  <h3 className="section-subheading">Admin</h3>
                </div>
                <div className="home-button-section">
                  <button
                    type="button"
                    onClick={() => navigate("/admin signup")}
                    className="login-btn signup-btn"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <div className="admin-div">
                <div className="icon-heading">
                  <img src={AdminIcon} className="icons" alt="" />
                  <h3 className="section-subheading">Admin</h3>
                </div>
                <div className="home-button-section">
                  <button
                    type="button"
                    onClick={() => navigate("/admin login")}
                    className="login-btn"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div className="user-section">
              <div className="faculty-div">
                <div className="icon-heading">
                  <img className="icons" src={FacultyIcon} alt="" />
                  <h3 className="section-subheading">Faculty</h3>
                </div>
                <div className="home-button-section">
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
                <div className="icon-heading">
                  <img src={StudentIcon} className="icons" alt="" />
                  <h3 className="section-subheading">Student</h3>
                </div>
                <div className="home-button-section">
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
        </div>

        {/* Right Section */}
        <div className="home-right-section">
          <h2 className="keyfeature-heading">Key Features</h2>

          <ul className="feature-list">
            <li>
              <FlareIcon /> Create and manage assignments
            </li>
            <li>
              <FlareIcon /> Close assignments before the deadline
            </li>
            <li>
              <FlareIcon /> Submit assignments as a student{" "}
            </li>
            <li>
              <FlareIcon /> Give remarks and marks to students
            </li>
            <li>
              <FlareIcon /> Check assignment history
            </li>
            <li>
              <FlareIcon /> View marks for assignments
            </li>
          </ul>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: example@example.com</p>
            <p>Phone: +1234567890</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li className="footer-link">
                <a href="/">Home</a>
              </li>
              <li className="footer-link">
                <a href="https://bitsvizag.com/">About Us</a>
              </li>
              <li className="footer-link">
                <a href="https://bitsvizag.com/contactus">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
      {/* <footer>
        <button>
          <Link target="_blank" to={"https://bitsvizag.com/contactus"}>
            Contact US
          </Link>
        </button>
        <div className="social-media-links">
          <Link
            target="_blank"
            to={"https://www.facebook.com/BITSVizagOfficial/"}
          >
            <FacebookIcon />
          </Link>
          <Link
            target="_blank"
            to={"https://www.instagram.com/bits_vizag_official/"}
          >
            <InstagramIcon />
          </Link>
        </div>
      </footer> */}
    </div>
  );
};
