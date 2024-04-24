import { child, get, getDatabase, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { app } from "../../../Firebase/firebase";

const AddBranches = () => {
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [semester, setSemester] = useState("Semester");
  const [branches, setBranches] = useState([""]);

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

  const handleAddBranch = () => {
    setBranches([...branches, ""]);
  };

  const handleRemoveBranch = (index) => {
    const updatedBranches = [...branches];
    updatedBranches.splice(index, 1);
    setBranches(updatedBranches);
  };

  const handleChangeBranch = (index, value) => {
    const updatedBranches = [...branches];
    updatedBranches[index] = value;
    setBranches(updatedBranches);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleSubmit = () => {
    const isEmpty = branches.some((field) => field === "");
    if (isEmpty) {
      alert("Please fill in all fields before adding a branches.");
      return;
    }
    if (semester === "Semester") {
      alert("Please Choose the Semester.");
      return;
    }

    branches.forEach((branch) => {
      set(ref(database, `${semester}/${branch}`), {
        subject: "",
      });
      
    });

    setBranches([""]);
  };

  return (
    <div>
      <select name="" id="" value={semester} onChange={handleSemesterChange}>
        <option value="Semester">Semester</option>
        {semesterOptions.map((sem) => (
          <option key={sem} value={sem}>
            {sem}
          </option>
        ))}
      </select>
      {branches.map((branch, index) => (
        <div key={index}>
          <input
            type="text"
            value={branch}
            onChange={(e) => handleChangeBranch(index, e.target.value)}
          />
          <button type="button" onClick={() => handleRemoveBranch(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddBranch}>
        Add Stream
      </button>

      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default AddBranches;
