import { child, get, getDatabase, ref, set } from "firebase/database";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../../../Firebase/firebase";
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
  const [changeStatus, setChangeStatus] = useState(false);
  const facultyInfo = useSelector((state) => state.facultyProfile);
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
        setNoInActiveAssignments("No Assignments");
      } else {
        setInActiveAssignments(result);
      }
    });
  }, []);

  const handleStatusChange = async (assignmentId) => {
    const assignmentRef = ref(
      database,
      `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments`
    );

    const activeAssignmentSnapshot = await get(
      child(assignmentRef, `/active/${assignmentId}`)
    );
    const activeAssignmentData = activeAssignmentSnapshot.val();
    await set(child(assignmentRef, `active/${assignmentId}`), null);

    activeAssignmentData.status = "inactive";

    // Add the assignment to the inactive section
    await set(
      child(assignmentRef, `inactive/${assignmentId}`),
      activeAssignmentData
    );


    // Update the UI to reflect the changes (you might need to refetch the data)
    fetchActiveData();
    fetchInActiveData();
    setChangeStatus(false);
  };

  useEffect(() => {
    fetchActiveData();
    fetchInActiveData();
  }, []);

  const handleCheckSubmission = (assignmentId, status) => {
    setSubmissionInfo({ assignmentId, status });
    setShowSubmission(true); 
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
                    <p>{key?.status.toUpperCase()}</p>
                    <p>{key?.assignmentName}</p>
                    <p>{key?.assignmentDescription}</p>
                    <p>{key?.submissionDate}</p>
                    <button
                      onClick={() =>
                        handleCheckSubmission(key?.assignmentId, key?.status)
                      }
                    >
                      Check
                    </button>
                    <button
                      onClick={() => {
                        setChangeStatus(true);
                      }}
                    >
                      Close Assignment
                    </button>
                    {changeStatus && (
                      <div className="alert">
                        <p>
                          Are you sure you want to close this assignment? Once
                          closed, no further submissions will be allowed.
                        </p>
                        <button
                          onClick={() => handleStatusChange(key?.assignmentId)}
                        >
                          Yes
                        </button>
                        <button onClick={() => setChangeStatus(false)}>No</button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <div className="inactive-assignments">
            <h5>Closed Assignments</h5>
            {noInActiveAssignments && <p>{noInActiveAssignments}</p>}
            {inactiveAssignments &&
              Object.values(inactiveAssignments).map((key, index) => {
                if (index === 0) {
                  return null;
                }
                return (
                  <div className="assignment-card" key={index}>
                    <p>{key?.status.toUpperCase()}</p>
                    <p>{key?.assignmentName}</p>
                    <p>Description : {key?.assignmentDescription}</p>
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
