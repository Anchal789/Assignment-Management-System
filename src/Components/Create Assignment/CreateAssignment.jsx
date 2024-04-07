import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { child, get, getDatabase, ref } from "firebase/database";
import { app } from "../../Firebase/firebase";

const CreateAssignment = () => {
  const facultyInfo = useSelector((state) => state.facultyProfile);
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [submissionDate, setSubmissionDate] = useState(null);
  const [assignmentId, setAssignmentId] = useState("");
  const navigate = useNavigate();
  const database = getDatabase(app);

  useEffect(() => {
    const fetchData = async () => {
      get(
        child(
          ref(database),
          `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/active`
        )
      ).then((value) => {
        const result = value.val();
        if(result[0] === "No Assignment"){
            console.log(result[0]);
            setAssignmentId()
        }
      });
    };
    fetchData();
  },[]);

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = format(date, "dd-MM-yyyy");
      setSubmissionDate(formattedDate);
      console.log(formattedDate);
    }
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
  };
  return (
    <div className="create-assignment">
      <h1>Create Assignment</h1>
      <div className="create-assignment-div">
        {assignmentId && <p>{assignmentId}</p>}
        <p>For Semester : {facultyInfo.semester}</p>
        <p>For Class : {facultyInfo.stream}</p>
        <p>For Subject : {facultyInfo.subjectName}</p>
        <p>For Subject Code : {facultyInfo.subjectCode}</p>
        <h4>Submit Before</h4>
        <DatePicker
          selected={submissionDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy" // Specify the date format for display
          isClearable // Allow clearing the date
          placeholderText="Select a date" // Placeholder text
        />
        <form action="">
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
          <button onClick={handleCreate}>Create</button>
          <button onClick={handleReset}>Reset</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/faculty home");
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
