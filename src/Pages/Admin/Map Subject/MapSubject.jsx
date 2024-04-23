import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { app } from "../../../Firebase/firebase";

const MapSubject = () => {
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [semester, setSemester] = useState("Semester");
  const [branch, setBranch] = useState("Branch");
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
      const semesterSnapshot = await get(child(ref(database), `/${semester}/`));
      if (semesterSnapshot.exists()) {
        const branches = [];
        semesterSnapshot.forEach((branch) => {
          branches.push(branch.key);
        });
        setBranchOptions(branches);
      }
    };
    fetchData();
  }, [semester]);

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  return (
    <div>
      <select name="" id="" value={semester} onChange={handleSemesterChange}>
        <option value={"Semester"}>Semester</option>
        {semesterOptions.map((sem) => (
          <option key={sem} value={sem}>
            {sem}
          </option>
        ))}
      </select>

      {branchOptions.map((bran) => (
        <>
          <label htmlFor="">{bran}</label>
          <input key={bran} value={bran} />
          <button onClick={()=>{console.log(bran)}}>Add Faculty</button>
        </>
      ))}
    </div>
  );
};

export default MapSubject;
