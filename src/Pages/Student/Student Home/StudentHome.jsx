import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../../../Firebase/firebase";
import SubmitAssignment from "../../../Components/Student Components/Submit Assigment/SubmitAssignment";
import { useNavigate } from "react-router";

const StudentHome = () => {
  const [activeAssignemnts, setActiveAssignemnts] = useState();
  const [inactiveAssignemnts, setInActiveAssignemnts] = useState();
  const [showSubmitAssignment, setShowSubmitAssignment] = useState(false);
  const [submitAssignmentInfo, setSubmitAssignmentInfo] = useState({});
  const studentInfo = useSelector((state) => state.studentProfile);
  const database = getDatabase(app);
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

  const handleSubmissionComplete = () => {
    setShowSubmitAssignment(false); // Hide the SubmitAssignment component
  };

  return (
    <div className="student-home">
      <div className="student-home-left-section">
        <div className="student-home-active-assignment">
          <p className="student-home-active-assignment-heading">Active</p>
          {activeAssignemnts &&
            Object.values(activeAssignemnts).map((key, index) => {
              if (index === 0) {
                return null;
              }
              return (
                <div className="assignment-card" key={index}>
                  <p className="student-home-assignment-name">Assignment Name: {key?.assignmentName}</p>
                  <p className="student-home-assignment-description">Assignment Description: {key?.assignmentDescription}</p>
                  <p className="student-home-assignment-status">{key?.status}</p>
                  <p className="student-home-submission-date">Last Date: {key?.submissionDate}</p>
                  {Object.values(key?.submissions).map((submission, index) => {
                    if (submission?.rollNo === studentInfo.rollNo) {
                     return <div className="student-home-submission" key={index}>
                        <h5 className="student-home-submission-heading">Your Submission</h5>
                        <p className="student-home-submission-note">Note: {submission?.assignmentNote}</p>
                        <p className="student-home-submission-description">Description{submission?.assignmentDescription}</p>
                        <p className="student-home-submission-date">Submitted On: {submission?.dateTime.date}</p>
                        <p className="student-home-submission-marks">Marks: {submission?.marks}</p>
                        <p className="student-home-submission-remarks">Remarks: {submission?.remarks}</p>
                      </div>
                    }
                    else{
                      return <p>Not Submitted</p>
                    }
                  })}
                  <button onClick={handleSubmitAssignment(key?.assignmentId)} className="submit">
                    Submit
                  </button>
                </div>
              );
              // console.log(index)
            })}
        </div>
        <div className="inactive assignment">
          <p className="student-home-inactive-assignment-heading">Inactive </p>
          {inactiveAssignemnts &&
            Object.values(inactiveAssignemnts).map((key, index) => {
              if (index === 0 || inactiveAssignemnts === "No Assignments Yet") {
                return null;
              }
              return (
                <div className="assignment-card" key={index}>
                  <p className="student-home-assignment-name">Assignment Name: {key?.assignmentName}</p>
                  <p className="student-home-assignment-description">Assignment Description: {key?.assignmentDescription}</p>
                  <p className="student-home-assignment-status">{key?.status}</p>
                  <p className="student-home-submission-date">Last Date: {key?.submissionDate}</p>
                  {Object.values(key?.submissions).map((submission, index) => {
                    if (submission?.rollNo === studentInfo.rollNo) {
                     return <div className="student-submission" key={index}>
                        <h5 className="student-home-submission-heading">Your Submission</h5>
                        <p className="student-home-submission-note">Note: {submission?.assignmentNote}</p>
                        <p className="student-home-submission-description">Description{submission?.assignmentDescription}</p>
                        <p className="student-home-submission-date">Submitted On: {submission?.dateTime.date}</p>
                        <p className="student-home-submission-marks">Marks: {submission?.marks}</p>
                        <p className="student-home-submission-remarks">Remarks: {submission?.remarks}</p>
                      </div>
                    }
                    else{
                      return <p className="student-home-not-submitted">Not Submitted</p>
                    }
                  })}
                </div>
              );
            })}
        </div>
      </div>
      <div className="student-home-right-section">
        {showSubmitAssignment && (
          <SubmitAssignment
            assignmentId={submitAssignmentInfo}
            onComplete={handleSubmissionComplete} // Pass the function
          />
        )}
      </div>
    </div>
  );
};

export default StudentHome;
