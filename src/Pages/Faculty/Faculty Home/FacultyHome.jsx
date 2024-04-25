import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import "./FacultyHome.css";

const FacultyHome = () => {
  const authentication = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const urlParams = useParams();
  useEffect(()=>{
    let result = authentication || Boolean(localStorage.getItem("authentication") === true);
    if(!result){
        navigate("/faculty login");
    }
  },[authentication, navigate])
  const facultyInfo = useSelector((state) => state.facultyProfile);
  return (
    <div className="faculty-home">
      <h1 className="faculty-home-heading">Faculty Dashboard</h1>
      <div className="faculty-home-div">
        <div className="faculty-home-buttons">
          <button onClick={()=>{navigate(`/create assignment/${urlParams.semester}/${urlParams.branch}/${urlParams.subject}`)}}>Create Assignment</button>
        </div>
        <div className="faculty-home-buttons">
          <button onClick={()=>{navigate(`/check assignment/${urlParams.semester}/${urlParams.branch}/${urlParams.subject}`)}}>Check Assignment</button>
        </div>
        <div className="faculty-home-buttons">
          <button onClick={()=>{navigate(`/${urlParams.semester}/${urlParams.branch}/${urlParams.subject}/students`)}}>Students List</button>
        </div>
      </div>

    </div>
  );
};

export default FacultyHome;
