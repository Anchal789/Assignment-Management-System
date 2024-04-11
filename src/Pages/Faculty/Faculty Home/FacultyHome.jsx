import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const FacultyHome = () => {
  const authentication = useSelector((state) => state.authentication);
  const navigate = useNavigate();
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
          <button onClick={()=>{navigate(`/create assignment/${facultyInfo.semester}/${facultyInfo.subjectName}`)}}>Create Assignment</button>
        </div>
        <div className="faculty-home-buttons">
          <button onClick={()=>{navigate(`/check assignment/${facultyInfo.semester}/${facultyInfo.subjectName}`)}}>Check Assignment</button>
        </div>
        <div className="faculty-home-buttons">
          <button onClick={()=>{navigate(`/students/${facultyInfo.semester}/${facultyInfo.subjectName}`)}}>Students List</button>
        </div>
      </div>

    </div>
  );
};

export default FacultyHome;
