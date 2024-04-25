import { get, getDatabase, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../../../Firebase/firebase";
import { useRef } from "react";
import "./ShowSubmission.css";
import EvaluationForm from "../../Student Components/Submit Assigment/EvaluationForm";
import { useParams } from "react-router";

const ShowSubmission = (props) => {
  const [submissions, setSubmissions] = useState("");
  const [evaluation, setEvaluation] = useState({
    marks: 0,
    remark: "",
  });
  const [studentRollNo, setStudentRollNo] = useState("");
  const [showEvaluation, setShowEvaluation] = useState(false);
  const facultyInfo = useSelector((state) => state.facultyProfile);
  const urlParams = useParams();
  const database = getDatabase(app);
  const showEvaluationRef = useRef(null);

  const fetchData = async () => {
    const submissionRef = ref(
      database,
      `${urlParams.semester}/${urlParams.branch}/${urlParams.subject}/assignments/${props.submissionInfo.status}/${props.submissionInfo.assignmentId}/submissions`
    );

    const snapshot = await get(submissionRef);
    const result = snapshot.val();
    if (result) {
      if (Object.keys(result).length > 1) {
        setSubmissions(result);
      } else {
        setSubmissions("No Submissions");
      }
    } else {
      setSubmissions("No Submissions");
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.submissionInfo.assignmentId, props.submissionInfo.status]);

  const handleClickEvaluate = async (rollNo) => {
    setStudentRollNo(rollNo);
    setShowEvaluation(true);
    if (showEvaluationRef.current) {
      showEvaluationRef.current.focus();
    }
  };
  const submitEvaluation = async (e) => {
    e.preventDefault();
    const submissionRef = ref(
      database,
      `${urlParams.semester}/${urlParams.branch}/${urlParams.subject}/assignments/${props.submissionInfo.status}/${props.submissionInfo.assignmentId}/submissions/${studentRollNo}`
    );

    const updateData = { marks: evaluation.marks, remarks: evaluation.remark };
    update(submissionRef, updateData);
    setShowEvaluation(false);
    handleClickEvaluate();
  };

  const handleCancelEvaluation = (rollNo) => {
    setShowEvaluation(false);
  };

  return (
    <div className="show-submission">
      <p className="show-submission-assignment-id">
        {props.submissionInfo.assignmentId}
      </p>

      {submissions === "No Submission Yet" ? (
        <p className="no-submissions">No Submissions Yet</p>
      ) : (
        <>
          <div className="show-submission-table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Date</th>
                  <th>Note</th>
                  <th>Description</th>
                  <th>Remark</th>
                  <th>Mark</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions !== "No Submissions" &&
                  Object.values(submissions).map((key, index) => (
                    <>
                      {key === "No Submission Yet" ? (
                        <></>
                      ) : (
                        <tr key={index}>
                          <td>{key?.name}</td>
                          <td>{key?.rollNo}</td>
                          <td>
                            {key?.dateTime?.date} {key?.dateTime?.time}
                          </td>
                          <td>{key?.assignmentNote}</td>
                          <td className="description">
                            <textarea
                              disabled
                              cols={"10"}
                              rows={"10"}
                              value={key?.assignmentDescription}
                            />
                          </td>
                          <td className="description">
                            <textarea
                              disabled
                              cols={"10"}
                              rows={"10"}
                              value={key?.remarks}
                            />
                          </td>
                          <td>{key?.marks}</td>
                          <td>
                            {props.submissionInfo.status === "inactive" ? (
                              <button disabled>Evaluate</button>
                            ) : (
                              <button
                                onClick={() => {
                                  handleClickEvaluate(key?.rollNo);
                                }}
                                className="show-submission-evaluate-btn"
                              >
                                Evaluate
                              </button>
                            )}
                            {studentRollNo === key.rollNo && showEvaluation && (
                              <EvaluationForm
                                ref={showEvaluationRef}
                                rollNo={key.rollNo}
                                assignmentId={props.submissionInfo.assignmentId}
                                status={props.submissionInfo.status}
                                onCancel={() =>
                                  handleCancelEvaluation(key.rollNo)
                                }
                                fetchData = {()=>{fetchData()}}
                              />
                            )}
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowSubmission;
