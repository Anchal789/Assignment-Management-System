import { child, get, getDatabase, ref } from "firebase/database";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { app } from "../../Firebase/firebase";
import "./CheckAssignment.css";
import ShowSubmission from "../Show Submission/ShowSubmission";

const CheckAssignment = () => {
  const [activeAssignments, setActiveAssignments] = useState();
  const [inactiveAssignments, setInActiveAssignments] = useState();
  const [noActiveAssignments, setNoActiveAssignments] = useState("");
  const [noInActiveAssignments, setNoInActiveAssignments] = useState("");
  const [submissionInfo, setSubmissionInfo] = useState({
    assignmentId: "",
    status: "",
  });
  const [showSubmission, setShowSubmission] = useState(false);
  const facultyInfo = useSelector((state) => state.facultyProfile);
  const navigate = useNavigate();
  const database = getDatabase(app);
  const fetchActiveData = useCallback(async () => {
    await get(
      child(
        ref(database),
        `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/active`
      )
    ).then((value) => {
      const result = value.val();
      if (Object.keys(result).length === 1) {
        setNoActiveAssignments("No Active Assignments");
      } else {
        setActiveAssignments(result);
      }
    });
  }, []);

  const fetchInActiveData = useCallback(async () => {
    await get(
      child(
        ref(database),
        `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/inactive`
      )
    ).then((value) => {
      const result = value.val();
      if (Object.keys(result).length === 1) {
        setNoInActiveAssignments("No InActive Assignments");
      } else {
        setInActiveAssignments(result);
      }
    });
  }, []);

  useEffect(() => {
    fetchActiveData();
    fetchInActiveData();
  }, []);

  const handleCheckSubmission = (assignmentId, status) => {
    setSubmissionInfo({ assignmentId, status });
    setShowSubmission(true); // Set showSubmission to true to display the ShowSubmission component
    console.log(showSubmission);
  };

  return (
    <div className="check-assignment">
      <h1>All Assignments</h1>
      <div className="check-assignment-container">
        <div className="left-section">
          <div className="active-assignments">
            <h5>Active Assignments</h5>
            {noActiveAssignments && <p>{noActiveAssignments}</p>}
            {activeAssignments &&
              Object.values(activeAssignments).map((key, index) => {
                if (index === 0) {
                  return null;
                }
                return (
                  <div className="assignment-card" key={index}>
                    <p>{key?.assignmentName}</p>
                    <p>{key?.assignmentDescription}</p>
                    <p>{key?.submissionDate}</p>
                    <p>{key?.status}</p>
                    <button
                      onClick={() =>
                        handleCheckSubmission(key?.assignmentId, key?.status)
                      }
                    >
                      Check
                    </button>
                  </div>
                );
              })}
          </div>
          <div className="inactive-assignments">
            <h5>Closed Assignments</h5>
            {noInActiveAssignments && <p>{noInActiveAssignments}</p>}
            {inactiveAssignments &&
              inactiveAssignments.map((key, index) => {
                if (index === 0) {
                  return null;
                }
                return (
                  <div className="assignment-card" key={index}>
                    <p>{key?.assignmentName}</p>
                    <p>Description : {key?.assignmentDescription}</p>
                    <p>{key?.status}</p>
                    <p>Last Date : {key?.submissionDate}</p>
                    <button
                      onClick={() =>
                        handleCheckSubmission(key?.assignmentId, key?.status)
                      }
                    >
                      Check
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="right-section">
          {showSubmission && <ShowSubmission submissionInfo={submissionInfo} />}
        </div>
      </div>
    </div>
  );
};

export default CheckAssignment;
