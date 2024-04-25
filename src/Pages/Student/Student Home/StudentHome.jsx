import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../../../Firebase/firebase";
import SubmitAssignment from "../../../Components/Student Components/Submit Assigment/SubmitAssignment";
import { useNavigate } from "react-router";
import "./StudentHome.css";
import Modal from "react-modal";

const StudentHome = () => {
  const [activeAssignemnts, setActiveAssignemnts] = useState();
  const [inactiveAssignemnts, setInActiveAssignemnts] = useState();
  const [showSubmitAssignment, setShowSubmitAssignment] = useState(false);
  const [submitAssignmentInfo, setSubmitAssignmentInfo] = useState({});
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const submitSubmissionRef = useRef(null);
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
        `${studentInfo.semester}/${studentInfo.stream}/assignments/active`
      )
    ).then((value) => {
      const result = value.val();
      if (result) {
        if (Object.keys(result).length === 0) {
          setActiveAssignemnts("No Assignments Yet");
        } else {
          setActiveAssignemnts(result);
        }
      } else {
        setActiveAssignemnts(result);
      }
    });
  };

  const fetchInActiveAssignmentData = async () => {
    await get(
      child(
        ref(database),
        `${studentInfo.semester}/${studentInfo.stream}/assignments/inactive`
      )
    ).then((value) => {
      const result = value.val();
      if (result) {
        if (Object.keys(result).length === 0) {
          setInActiveAssignemnts("No Assignments Yet");
        } else {
          setInActiveAssignemnts(result);
        }
      } else {
        setInActiveAssignemnts("No Assignments Yet");
      }
    });
  };

  const handleSubmitAssignment = (assignmentId) => (e) => {
    e.preventDefault();
    setShowSubmitAssignment(true);
    setSubmitAssignmentInfo(assignmentId);
    submitSubmissionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (authentication) {
      fetchActiveAssignmentData();
      fetchInActiveAssignmentData();
    }
  }, []);

  const handleSubmissionComplete = () => {
    fetchActiveAssignmentData();
    setShowSubmitAssignment(false); // Hide the SubmitAssignment component
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(assignment) {
    setSelectedAssignment(assignment);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
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
                  <h4 className="student-home-assignment-heading">
                    Assignment Name:{" "}
                  </h4>

                  <p className="student-home-assignment-name">
                    {key?.assignmentName}
                  </p>
                  <hr />
                  <h4 className="student-home-assignment-heading">
                    Assignment Description:{" "}
                  </h4>
                  <textarea
                    cols={"30"}
                    rows={"10"}
                    value={key?.assignmentDescription}
                    disabled
                    className="student-home-assignment-description"
                  >
                    {key?.assignmentDescription}
                  </textarea>
                  <hr />
                  <h4 className="student-home-assignment-heading">
                    Last Date:{" "}
                  </h4>
                  <p className="student-home-submission-date">
                    {key?.submissionDate}
                  </p>
                  <hr />
                  {key?.submissions[studentInfo.rollNo]
                    ?.assignmentDescription && (
                    <button
                      onClick={() => {
                        openModal(key?.submissions[studentInfo.rollNo]);
                      }}
                      className="submit"
                      type="button"
                    >
                      My Submission
                    </button>
                  )}

                  <button
                    onClick={handleSubmitAssignment(key?.assignmentId)}
                    className="submit"
                    key={index}
                  >
                    Submit
                  </button>
                </div>
              );
              // console.log(index)
            })}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          {selectedAssignment && (
            <div className="student-home-submission">
              <hr />
              <h4>Note:</h4>{" "}
              <p className="student-home-submission-note">
                {selectedAssignment?.assignmentNote}
              </p>
              <hr />
              <h4>Description: </h4>{" "}
              <textarea
                cols={"30"}
                rows={"10"}
                value={selectedAssignment?.assignmentDescription}
                disabled
                className="student-home-submission-description"
              ></textarea>
              <hr />
              <div className="marks_remarks">
                <div className="marks_remarks_content_div">
                  <h4>Submitted On: </h4>
                  <p className="student-home-submission-date">
                    {selectedAssignment?.dateTime?.date}
                  </p>
                </div>
                <div className="marks_remarks_content_div">
                  <h4>Mark: </h4>
                  <p className="student-home-submission-marks">
                    {selectedAssignment?.marks}
                  </p>
                </div>
                <h4>Remark: </h4>
                <textarea
                  disabled
                  cols={"30"}
                  rows={"10"}
                  className="student-home-submission-remarks"
                >
                  {selectedAssignment?.remarks}
                </textarea>
              </div>
            </div>
          )}
        </Modal>

        <div className="inactive-assignment">
          <p className="student-home-inactive-assignment-heading">Inactive </p>
          {inactiveAssignemnts &&
            Object.values(inactiveAssignemnts).map((key, index) => {
              if (index === 0 || inactiveAssignemnts === "No Assignments Yet") {
                return null;
              }
              return (
                <div className="assignment-card" key={index}>
                  <h4>Assignment Name: </h4>
                  <p className="student-home-assignment-name">
                    {key?.assignmentName}
                  </p>
                  <hr />
                  <h4>Assignment Description: </h4>
                  <textarea
                    cols={"30"}
                    rows={"10"}
                    value={key?.assignmentDescription}
                    disabled
                    className="student-home-assignment-description"
                  >
                    {key?.assignmentDescription}
                  </textarea>
                  <hr />
                  <h4>Last Date: </h4>
                  <p className="student-home-submission-date">
                    {key?.submissionDate}
                  </p>
                  <hr />
                  {Object.values(key?.submissions).map((submission, index1) => {
                    if (submission?.rollNo === studentInfo.rollNo) {
                      return (
                        <div className="student-submission" key={index1}>
                          <h3 className="student-home-submission-heading">
                            Your Submission
                          </h3>
                          <hr />
                          <h5>Note: </h5>
                          <p className="student-home-submission-note">
                            {submission?.assignmentNote}
                          </p>
                          <hr />
                          <h5>Description:</h5>
                          <textarea
                            cols={"30"}
                            rows={"10"}
                            value={submission?.assignmentDescription}
                            disabled
                            className="student-home-submission-description"
                          >
                            {submission?.assignmentDescription}
                          </textarea>
                          <hr />
                          <h5>Submitted On: </h5>
                          <p className="student-home-submission-date">
                            {submission?.dateTime.date}
                          </p>
                          <h5>Marks: </h5>
                          <p className="student-home-submission-marks">
                            {submission?.marks}
                          </p>
                          <h5>Remarks:</h5>
                          <textarea
                            disabled
                            cols={"30"}
                            rows={"10"}
                            className="student-home-submission-remarks"
                          >
                            {submission?.remarks}
                          </textarea>
                        </div>
                      );
                    } else {
                      return (
                        <h4 className="student-home-not-submitted">
                          Not Submitted
                        </h4>
                      );
                    }
                  })}
                </div>
              );
            })}
        </div>
      </div>
      <div className="student-home-right-section" ref={submitSubmissionRef}>
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
