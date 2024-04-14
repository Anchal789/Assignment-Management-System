import React, { useState } from "react";
import { update, ref } from "firebase/database";
import { getDatabase } from "firebase/database";
import { app } from "../../../Firebase/firebase";
import { useSelector } from "react-redux";

const EvaluationForm = ({ rollNo, assignmentId, status, onCancel }) => {
  const [evaluation, setEvaluation] = useState({ marks: 0, remark: "" });
  const database = getDatabase(app);
  const facultyInfo = useSelector((state) => state.facultyProfile);

  const submitEvaluation = async (e) => {
    e.preventDefault();
    const submissionRef = ref(
      database,
      `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/${status}/${assignmentId}/submissions/${rollNo}`
    );

    const updateData = { marks: evaluation.marks, remarks: evaluation.remark };
    update(submissionRef, updateData);
  };

  const onCancelHadeler = () => {
    onCancel();
  };

  return (
    <div className="show-submission-evaluation-container">
      <form action="" className="show-submission-evaluation-form">
        <label htmlFor="evaluation-form-marks">Marks</label>
        <input
          type="number"
          id="evaluation-form-marks"
          value={evaluation.marks}
          onChange={(e) =>
            setEvaluation({ ...evaluation, marks: e.target.value })
          }
        />
        <label htmlFor="evaluation-form-remarks">Remarks</label>
        <input
          type="text"
          id="evaluation-form-remarks"
          value={evaluation.remark}
          onChange={(e) =>
            setEvaluation({ ...evaluation, remark: e.target.value })
          }
        />
        <div className="show-submission-evaluation-buttons">
          <button onClick={submitEvaluation} className="show-submission-submit">
            Submit
          </button>
          <button
            onClick={onCancelHadeler}
            type="button"
            className="show-submission-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EvaluationForm;
