import React, { useEffect, useState } from "react";
import { app } from "../../../Firebase/firebase";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";
import Alert from "@mui/material/Alert";
import "./AddSubject.css"; // Import CSS file for styling

const AddSubject = () => {
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [semester, setSemester] = useState("Semester");
  const [subjects, setSubjects] = useState([]);
  const [branchesOptions, setBranchesOptions] = useState([]);
  const [branches, setBranches] = useState("Stream");
  const [fields, setFields] = useState([{ name: "", code: "" }]);
  const [alertBox, setAlertBox] = useState(false);
  const database = getDatabase(app);

  useEffect(() => {
    const fetchData = async () => {
      const semesterSnapshot = await get(child(ref(database), "/"));
      if (semesterSnapshot.exists()) {
        const semesters = [];
        semesterSnapshot.forEach((semester) => {
          if (semester.key !== "loginCredentials") {
            semesters.push(semester.key);
          }
        });
        setSemesterOptions(semesters);
      }
    };
    fetchData();
  }, [database]);

  useEffect(() => {
    const fetchData = async () => {
      const branchSnapShot = await get(child(ref(database), `/${semester}/`));
      if (branchSnapShot.exists()) {
        const branches = [];
        branchSnapShot.forEach((branch) => {
          branches.push(branch.key);
        });
        setBranchesOptions(branches);
      }
    };
    fetchData();
  }, [semester]);

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranches(e.target.value);
  };

  const handleChangeInput = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

  const handleAddField = () => {
    setFields([...fields, { name: "", code: "" }]);
  };

  const handleRemoveField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const handleAddSubject = () => {
    const isEmpty = fields.some(
      (field) => field.name.trim() === "" || field.code.trim() === ""
    );
    if (isEmpty) {
      alert("Please fill in all fields before adding a subject.");
      return;
    }
    if (semester === "Semester") {
      alert("Please Choose the Semester.");
      return;
    }
    const subjectsCopy = [...subjects];
    fields.forEach((field) => {
      subjectsCopy.push({ [field.name]: field.code });
    });
    setSubjects(subjectsCopy);

    subjectsCopy.forEach((subject) => {
      Object.keys(subject).forEach((key) => {
        set(ref(database, `${semester}/${branches}/${key}`), {
          facultyInfo: "",
          students: "",
          assignments: {
            active: "",
            inactive: ""
          }
        });
        remove(ref(database, `${semester}/${branches}/subject`))
          .then(() => {
            console.log("Data deleted successfully");
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      });
    });
    setAlertBox(true);
    setFields([{ name: "", code: "" }]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertBox(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [alertBox]);

  return (
    <div className="add-subject-container">
      <select className="select-input" value={semester} onChange={handleSemesterChange}>
        <option value="Semester">Semester</option>
        {semesterOptions.map((sem) => (
          <option key={sem} value={sem}>
            {sem}
          </option>
        ))}
      </select>

      <select className="select-input" value={branches} onChange={handleBranchChange}>
        <option value="Semester">Branch</option>
        {branchesOptions.map((branch, key) => (
          <option key={key} value={branch}>
            {branch}
          </option>
        ))}
      </select>
      {fields.map((field, index) => (
        <div key={index} className="subject-field">
          <label htmlFor={`subject${index + 1}name`} className="label-input">
            Subject {index + 1} Name
          </label>
          <input
            type="text"
            id={`subject${index + 1}name`}
            name="name"
            value={field.name}
            onChange={(e) => handleChangeInput(index, e)}
            className="text-input"
          />
          <label htmlFor={`subject${index + 1}code`} className="label-input">
            Subject {index + 1} Code
          </label>
          <input
            type="text"
            id={`subject${index + 1}code`}
            name="code"
            value={field.code}
            onChange={(e) => handleChangeInput(index, e)}
            className="text-input"
          />
          {index > 0 && (
            <button type="button" onClick={() => handleRemoveField(index)} className="remove-btn">
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={handleAddField} className="add-field-btn">
        Add Subject Field
      </button>
      <button type="button" onClick={handleAddSubject} className="add-subject-btn">
        Submit
      </button>

      {alertBox && (
        <Alert variant="filled" severity="success">
          Successfully Added The Subject in {semester}
        </Alert>
      )}
    </div>
  );
};

export default AddSubject;
