import React from "react";
import { useNavigate } from "react-router";
import StudentIcon from "../../Assets/student-graduating-svgrepo-com.svg";
import FacultyIcon from "../../Assets/teacher-with-stick-svgrepo-com.svg";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <div className="admin">
      <div className="admin-left-section">
        <div className="faculty-div">
          <div className="icon-heading">
            <img className="icons" src={FacultyIcon} alt="" />
            <h3 className="section-subheading">Faculty</h3>
          </div>
          <div className="home-button-section">
            <button
              type="button"
              onClick={() => navigate("/faculty signup")}
              className="signup-btn"
            >
              Sign Up
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
              onClick={() => navigate("/student signup")}
              className="signup-btn"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <div className="admin-right-section">
        <button>Promote Student</button>
        <button onClick={() => navigate("/add subject")}>Add Subject</button>
        <button>Map Subject</button>
      </div>
    </div>
  );
};

export default Admin;
