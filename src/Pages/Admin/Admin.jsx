import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import StudentIcon from "../../Assets/student-graduating-svgrepo-com.svg";
import FacultyIcon from "../../Assets/teacher-with-stick-svgrepo-com.svg";
import "./Admin.css";
import { useSelector } from "react-redux";

const Admin = () => {
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if(!admin){
      navigate("/admin login")
    }
  },[])
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
        <button onClick={() => navigate("/admin-panel/promote-student")}>Promote Student</button>
        <button onClick={() => navigate("/admin-panel/add-subject")}>Add Subject</button>
        <button onClick={() => navigate("/admin-panel/add-branches")}>Add Branches</button>
        <button onClick={() => navigate("/admin-panel/map-subject")}>Map Subject</button>
      </div>
    </div>
  );
};

export default Admin;
