import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { app } from "../../Firebase/firebase";

const CreateAssignment = () => {
  const facultyInfo = useSelector((state) => state.facultyProfile);
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [submissionDate, setSubmissionDate] = useState(null);
  const [assignmentId, setAssignmentId] = useState("");
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
        const lastAssignmentNumber = parseInt(lastAssignmentId);
        // Calculate the next assignment number
        const nextAssignmentNumber = lastAssignmentNumber + 1;
        // Set the next assignment ID
        setAssignmentId(`${facultyInfo.subjectName}-${nextAssignmentNumber}`);
      }
    });
  },[]);

  useEffect(() => {
    fetchData();
  }, []);

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
    if (!assignmentName || !assignmentDescription || !submissionDate) {
      alert("Please fill all the fields");
    } else {
      set(
        ref(
          database,
          `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/active/${assignmentId.split("-")[1]}`
        ),
        {
          assignmentName: assignmentName,
          assignmentDescription: assignmentDescription,
          submissionDate: submissionDate,
          status: "active",
        }
      );
      set(
        ref(
          database,
          `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/active/${assignmentId.split("-")[1]}/submissions`
        ),
        {
            0: "No Submission Yet",
        }
      );
      setSubmissionDate(null);
      setAssignmentId("");
      setAssignmentName("");
      setAssignmentDescription("");
        navigate("/faculty home");
    }
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
