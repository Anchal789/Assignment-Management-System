import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { app } from "../../../Firebase/firebase";

const CreateAssignment = () => {
  const facultyInfo = useSelector((state) => state.facultyProfile);
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentId, setAssignmentId] = useState("");
  const [submissionDate, onChange] = useState(new Date());
  const navigate = useNavigate();
  const database = getDatabase(app);

  const fetchData = useCallback(async () => {
    await get(
      child(
        ref(database),
        `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/active`
      )
    ).then((value) => {
      const result = value.val();
      const assignmentCount = Object.keys(result).length;
      if (assignmentCount === 1 && "0" in result) {
        // If there's only one entry and it's "No assignment", start with DBMS-1
        setAssignmentId(`${facultyInfo.subjectName}-1`);
      } else {
        // Get the last assignment ID
        const lastAssignmentId = Object.keys(result)[assignmentCount - 1];
        // Extract the numeric part of the ID
        const lastAssignmentNumber = parseInt(lastAssignmentId.split("-")[1]);
        // Calculate the next assignment number
        const nextAssignmentNumber = lastAssignmentNumber + 1;
        // Set the next assignment ID
        setAssignmentId(`${facultyInfo.subjectName}-${nextAssignmentNumber}`);
      }
    });
  }, []);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = (date) => {
    onChange(date);
  };

  const handleAssignmentNameChange = (e) => {
    setAssignmentName(e.target.value);
  };

  const handleAssignmentDescriptionChange = (e) => {
    setAssignmentDescription(e.target.value);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setAssignmentDescription("");
    setAssignmentName("");
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!assignmentName || !assignmentDescription || !submissionDate) {
      alert("Please fill all the fields");
    } else {
      set(
        ref(
          database,
          `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/active/${assignmentId}`
        ),
        {
          assignmentId: assignmentId,
          assignmentName: assignmentName,
          assignmentDescription: assignmentDescription,
          submissionDate: submissionDate.toLocaleDateString("en-GB").replaceAll("/", "-"),
          status: "active",
        }
      );
      set(
        ref(
          database,
          `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/active/${assignmentId}/submissions`
        ),
        {
          0: "No Submission Yet",
        }
      );
      setAssignmentId("");
      setAssignmentName("");
      setAssignmentDescription("");
      navigate(
        `/faculty/${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}`
      );
    }
  };
  return (
    <div className="create-assignment">
      <h1>Create Assignment</h1>
      <div className="create-assignment-div">
        {assignmentId && <p className="create-assignment-id">{assignmentId}</p>}
        <p className="create-assignment-info">Semester : {facultyInfo.semester}</p>
        <p className="create-assignment-info">Class : {facultyInfo.stream}</p>
        <p className="create-assignment-info">Subject : {facultyInfo.subjectName}</p>
        <p className="create-assignment-info">Subject Code : {facultyInfo.subjectCode}</p>
        <h4 className="create-assignment-info">Submit Before</h4>
        <Calendar
          onChange={handleDateChange}
          value={submissionDate}
          minDate={tomorrow}
        />
        <form action="" className="create-assignment-form">
          <label htmlFor="assignment-name">Assignment Name</label>
          <input
            type="text"
            id="assignment-name"
            onChange={handleAssignmentNameChange}
            value={assignmentName}
          />
          <br />
          <label htmlFor="assignment-description">Assignment Description</label>
          <br />
          <textarea
            name="assignment-description"
            cols="30"
            rows="10"
            id="assignment-description"
            placeholder="You can enter Google Drive link if there is any PDF, Image or Video."
            onChange={handleAssignmentDescriptionChange}
            value={assignmentDescription}
          ></textarea>
          <button onClick={handleCreate} className="create">Create</button>
          <button onClick={handleReset} className="reset">Reset</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(`/faculty/${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}`);
            }}
            className="cancel"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
