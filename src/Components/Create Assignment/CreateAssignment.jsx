import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

const CreateAssignment = () => {
  const facultyInfo = useSelector((state) => state.facultyProfile);
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [startingDate, setStartingDate] = useState(null);
  const [endingDate, setEndingDate] = useState(null);
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    const formattedDate = format(date, "dd-MM-yyyy");
    setStartingDate(formattedDate);
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
        <p>For Semester : {facultyInfo.semester}</p>
        <p>For Class : {facultyInfo.stream}</p>
        <p>For Subject : {facultyInfo.subjectName}</p>
        <p>For Subject Code : {facultyInfo.subjectCode}</p>
        <h4>Start Date</h4>
        <DatePicker
          selected={startingDate}
          onChange={(e)=>{setStartingDate(e.target.value)}}
          dateFormat="dd/MM/yyyy" // Specify the date format
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
