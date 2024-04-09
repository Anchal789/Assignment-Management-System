import { child, get, getDatabase, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../../../Firebase/firebase";
import SubmitAssignment from "../../../Components/Student Components/Submit Assigment/SubmitAssignment";

const StudentHome = () => {
  const [activeAssignemnts, setActiveAssignemnts] = useState();
  const [inactiveAssignemnts, setInActiveAssignemnts] = useState();
  const [showSubmitAssignment, setShowSubmitAssignment] = useState(false);
  const [submitAssignmentInfo, setSubmitAssignmentInfo] = useState({
    
  });
  const studentInfo = useSelector((state) => state.studentProfile);
  const database = getDatabase(app);
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
        console.log(result);
      } else {
        setActiveAssignemnts(result);
        console.log(result);
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
        console.log(result);
      } else {
        setInActiveAssignemnts(result);
        console.log(result);
      }
    });
  };

  useEffect(() => {
    fetchActiveAssignmentData();
    fetchInActiveAssignmentData();
  }, []);
  return (
    <div className="student-home">
      <div className="student-home-left-section">
        <div className="active assignment">
          {activeAssignemnts &&
            Object.values(activeAssignemnts).map((key, index) => {
              if (index === 0) {
                return null;
              }
              // return (
              //   <div className="assignment-card" key={index}>
              //     <p>{key?.assignmentName}</p>
              //     <p>Description : {key?.assignmentDescription}</p>
              //     <p>{key?.status}</p>
              //     <p>Last Date : {key?.submissionDate}</p>
              //     <button
              //     onClick={() =>
              //       setShowSubmitAssignment(true)
              //     }
              //     >
              //       Submit
              //     </button>
              //   </div>
              // );
              console.log(key)
            })}
        </div>
        <div className="inactive assignment">
        {inactiveAssignemnts &&
            Object.values(inactiveAssignemnts).map((key, index) => {
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
                  // onClick={() =>
                  //   handleCheckSubmission(key?.assignmentId, key?.status)
                  // }
                  >
                    Submit
                  </button>
                </div>
              );
              // console.log(key)
            })}
        </div>
      </div>
      <div className="student-home-right-section">
            {showSubmitAssignment && <SubmitAssignment />}
      </div>
    </div>
  );
};

export default StudentHome;
