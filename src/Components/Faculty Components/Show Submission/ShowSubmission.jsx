import { child, get, getDatabase, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../../../Firebase/firebase";
const ShowSubmission = (props) => {
  const [submissions, setSubmissions] = useState("");
  const [evaluation, setEvaluation] = useState({
    marks: 0,
    remark: "",
  });
  const [studentRollNo, setStudentRollNo] = useState("");
  const [showEvaluation, setShowEvaluation] = useState(false);
  const facultyInfo = useSelector((state) => state.facultyProfile);
  const database = getDatabase(app);

  const fetchData = async () => {
    const submissionRef = ref(
      database,
      `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/${props.submissionInfo.status}/${props.submissionInfo.assignmentId}/submissions`
    );

    const snapshot = await get(submissionRef);
    const result = snapshot.val();

    if (Object.keys(result).length > 1) {
      setSubmissions(result);
    } else {
      setSubmissions(result[0]);

    }
  };

  useEffect(() => {
    fetchData();
  }, [props.submissionInfo.assignmentId, props.submissionInfo.status]);

  const handleClickEvaluate = async (rollNo) => {
    setStudentRollNo(rollNo);
    setShowEvaluation(true);
    // await get(
    //   child(
    //     ref(database),
    //     `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/${props.submissionInfo.status}/${props.submissionInfo.assignmentId}/submissions/${rollNo}`
    //   )
    // ).then((value) => {
    //   const result = value.val();
    // });
  };

  const submitEvaluation = async (e) => {
    e.preventDefault();
    const submissionRef = ref(
      database,
      `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/${props.submissionInfo.status}/${props.submissionInfo.assignmentId}/submissions/${studentRollNo}`
    );

    const updateData = { marks: evaluation.marks, remarks: evaluation.remark };
    update(submissionRef, updateData);
    setShowEvaluation(false);
    handleClickEvaluate();
  };

  

  return (
    <div>
      <p className="assignment-id">{props.submissionInfo.assignmentId}</p>
      <p className="status">{props.submissionInfo.status.toUpperCase()}</p>
      {submissions === "No Submission Yet" ? (
        submissions
      ) : (
        <>
          <table className="table">
            <thead className="thead">
              <tr className="tr-heading">
                <th>Name</th>
                <th>Roll No</th>
                <th>Submission Date</th>
                <th>Note</th>
                <th>Description</th>
                <th>Remarks</th>
                <th>Marks</th>
                <th>Evaluate</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {submissions &&
                Object.values(submissions).map((key, index) => {
                  if (index === 0) {
                    return null;
                  }
                  return (
                    <tr key={index} className="tr-body">
                      <td>{key?.name}</td>
                      <td>{key?.rollNo}</td>
                      <td>
                        {key?.dateTime?.date} {key?.dateTime?.time}
                      </td>
                      <td>{key?.assignmentNote}</td>
                      <td>{key?.assignmentDescription}</td>
                      <td>{key?.remarks}</td>
                      <td>{key?.marks}</td>
                      <td>
                        {props.submissionInfo.status === "inactive" ? (
                          <button disabled>Evaluate</button>
                        ) : (
                          <button
                            onClick={() => {
                              handleClickEvaluate(key?.rollNo);
                            }}
                            className="evaluate-btn"
                          >
                            Evaluate
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {showEvaluation && (
            <>
              <form action="" className="evaluation-form">
                <label htmlFor="evaluation-form-marks">Marks</label>
                <input
                  type={"number"}
                  id="evaluation-form-marks"
                  value={evaluation.marks}
                  onChange={(e) =>
                    setEvaluation({ ...evaluation, marks: e.target.value })
                  }
                />
                <label htmlFor="evaluation-form-remarks">Remarks</label>
                <input
                  type={"text"}
                  id="evaluation-form-remarks"
                  value={evaluation.remark}
                  onChange={(e) =>
                    setEvaluation({ ...evaluation, remark: e.target.value })
                  }
                />
                <button onClick={submitEvaluation} className="submit">Submit</button>
                <button onClick={() => setShowEvaluation(false)} className="cancel">Cancel</button>
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ShowSubmission;
