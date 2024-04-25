import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { app } from "../../../Firebase/firebase";

const AdminSignup = () => {
  const [semester, setSemester] = useState("Semester");
  const [semesterOptions, setSemesterOptions] = useState([]);
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

  return (
    <div>
      <select name="" id="">
        <option value="Semester">Semester</option>
        {
          semesterOptions.map((semester, key) => (
            <option key={key} value={semester}>{semester}</option>
          ))
        }
      </select>
    </div>
  );
};

export default AdminSignup;
