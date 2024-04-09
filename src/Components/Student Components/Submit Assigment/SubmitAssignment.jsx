import { getDatabase, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../../../Firebase/firebase";

const SubmitAssignment = (props) => {
  const [assignmentInfo, setAssignmentInfo] = useState({
    assignmentNote: "",
    assignmentDescription: "",
    dataTime: "",
  });
  const studentInfo = useSelector((state) => state.studentProfile);
  const database = getDatabase(app);

  const handleNoteChange = (e) => {
    setAssignmentInfo({ ...assignmentInfo, assignmentNote: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setAssignmentInfo({
      ...assignmentInfo,
      assignmentDescription: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    set(
      ref(
        database,
        `/${studentInfo.semester}/${studentInfo.stream}/${studentInfo.subjectName}/assignments/active/${props.assignmentId}/submissions/${studentInfo.rollNo}`
      ),
      {
        assignmentNote: assignmentInfo.assignmentNote,
        assignmentDescription: assignmentInfo.assignmentDescription,
        name: studentInfo.name,
        rollNo: studentInfo.rollNo,
        remarks : "",
        marks : ""
      }
    );
    set(
      ref(
        database,
        `/${studentInfo.semester}/${studentInfo.stream}/${studentInfo.subjectName}/students/${studentInfo.rollNo}/submissions/${props.assignmentId}/`
      ),
      {
        assignmentId : props.assignmentId,
        assignmentNote: assignmentInfo.assignmentNote,
        assignmentDescription: assignmentInfo.assignmentDescription,
        remarks : "",
        marks : ""
      }
    );
    setAssignmentInfo({
      assignmentNote: "",
      assignmentDescription: "",
      dataTime: "",
    })
    console.log(assignmentInfo);
  };

  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const timeDate = { time: formattedTime, date: formattedDate };
    setAssignmentInfo((prevAssignmentInfo) => ({
      ...prevAssignmentInfo,
      dataTime: { time: formattedTime, date: formattedDate },
    }));
  }, [assignmentInfo.assignmentDescription, assignmentInfo.assignmentNote]);
  return (
    <div>
      <div>
        <p>{studentInfo.rollNo}</p>
        <p>{studentInfo.name}</p>
        <p>{studentInfo.subjectName}</p>
        <p>{props.assignmentId}</p>
      </div>
      <form action="">
        <label htmlFor="assignment-note">Assignment Note</label>
        <input
          type="text"
          value={assignmentInfo.assignmentNote}
          id="assignment-note"
          onChange={handleNoteChange}
        />
        <label htmlFor="assignment-description">Submission Description</label>
        <textarea
          name=""
          cols="30"
          rows="10"
          value={assignmentInfo.assignmentDescription}
          id="assignment-description"
          onChange={handleDescriptionChange}
        ></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default SubmitAssignment;
