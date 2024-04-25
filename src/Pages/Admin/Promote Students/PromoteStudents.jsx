import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { app } from "../../../Firebase/firebase";

const PromoteStudents = () => {
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [semester, setSemester] = useState("Semester");
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

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  return (
    <div>
      <select
        className="select-input"
        value={semester}
        onChange={handleSemesterChange}
      >
        <option value="Semester">Semester</option>
        {semesterOptions.map((sem) => (
          <option key={sem} value={sem}>
            {sem}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PromoteStudents;
