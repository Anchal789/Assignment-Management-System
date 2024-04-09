import { child, get, getDatabase, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../../../Firebase/firebase";
import SubmitAssignment from "../../../Components/Student Components/Submit Assigment/SubmitAssignment";
import { useNavigate } from "react-router";
import { logout } from "../../../Redux/redux";

const StudentHome = () => {
  const [activeAssignemnts, setActiveAssignemnts] = useState();
  const [inactiveAssignemnts, setInActiveAssignemnts] = useState();
  const [showSubmitAssignment, setShowSubmitAssignment] = useState(false);
  const [submitAssignmentInfo, setSubmitAssignmentInfo] = useState({});
  const studentInfo = useSelector((state) => state.studentProfile);
  const database = getDatabase(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authentication = useSelector((state) => state.authentication);

  useEffect(() => {
    let result =
      authentication ||
      Boolean(localStorage.getItem("authentication") === true);
    if (!result) {
      navigate("/student login");
    }
  }, [authentication, navigate]);

  const fetchActiveAssignmentData = async () => {
    await get(
      child(
        ref(database),
        `${studentInfo.semester}/${studentInfo.stream}/${studentInfo.subjectName}/assignments/active`
      )
    ).then((value) => {
      const result = value.val();
      if (Object.keys(result).length === 1) {
        setActiveAssignemnts("No Assignments Yet");
      } else {
        setActiveAssignemnts(result);
      }
    });
  };

  const fetchInActiveAssignmentData = async () => {
    await get(
      child(
        ref(database),
        `${studentInfo.semester}/${studentInfo.stream}/${studentInfo.subjectName}/assignments/inactive`
      )
    ).then((value) => {
      const result = value.val();
      if (Object.keys(result).length === 1) {
        setInActiveAssignemnts("No Assignments Yet");
      } else {
        setInActiveAssignemnts(result);
      }
    });
  };

  const handleSubmitAssignment = (assignmentId) => (e) => {
    e.preventDefault();
    setShowSubmitAssignment(true);
    setSubmitAssignmentInfo(assignmentId);
  };

  useEffect(() => {
    if (authentication) {
      fetchActiveAssignmentData();
      fetchInActiveAssignmentData();
    }
  }, []);

  return (
    <div className="student-home">
      <button
        onClick={() => {
          dispatch(logout());
          navigate("/");
          localStorage.setItem("authentication", false);
        }}
      >
        Logout
      </button>
      <div className="student-home-left-section">
        <div className="active assignment">
          {activeAssignemnts &&
            Object.values(activeAssignemnts).map((key, index) => {
              if (index === 0) {
                return null;
              }
              return (
                <div className="assignment-card" key={index}>
                  <p>{key?.assignmentName}</p>
                  <p>{key?.assignmentDescription}</p>
                  <p>{key?.status}</p>
                  <p>{key?.submissionDate}</p>
                  <button onClick={handleSubmitAssignment(key?.assignmentId)}>
                    Submit
                  </button>
                </div>
              );
              // console.log(index)
            })}
        </div>
        <div className="inactive assignment">
          {inactiveAssignemnts &&
            Object.values(inactiveAssignemnts).map((key, index) => {
              if (index === 0 || inactiveAssignemnts === "No Assignments Yet") {
                return null;
              }
              return (
                <div className="assignment-card" key={index}>
                  <p>{key?.assignmentName}</p>
                  <p>{key?.assignmentDescription}</p>
                  <p>{key?.status}</p>
                  <p>{key?.submissionDate}</p>
                  <button onClick={() => setShowSubmitAssignment(true)}>
                    Submit
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <div className="student-home-right-section">
        {showSubmitAssignment && (
          <SubmitAssignment assignmentId={submitAssignmentInfo} />
        )}
      </div>
    </div>
  );
};

export default StudentHome;
