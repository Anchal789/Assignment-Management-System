import { child, get, getDatabase, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { app } from "../../../Firebase/firebase";
import "./PromoteStudents.css";

const PromoteStudents = () => {
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("Semester");
  const [students, setStudents] = useState({});
  const [branchesOptions, setBranchesOptions] = useState([]);
  const [branches, setBranches] = useState("Stream");
  const [selectedStudents, setSelectedStudents] = useState([]);
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

  const fetchStudents = async () => {
    if (selectedSemester !== "Semester") {
      const studentSnapshot = await get(
        child(ref(database), `/${selectedSemester}/${branches}/students`)
      );
      if (studentSnapshot.exists()) {
        setStudents(studentSnapshot.val());
      }
    }
  };
  useEffect(() => {

    fetchStudents();
  }, [branches]);

  useEffect(() => {
    const fetchData = async () => {
      const branchSnapShot = await get(
        child(ref(database), `/${selectedSemester}/`)
      );
      if (branchSnapShot.exists()) {
        const branches = [];
        branchSnapShot.forEach((branch) => {
          branches.push(branch.key);
        });
        setBranchesOptions(branches);
      }
    };
    fetchData();
  }, [selectedSemester]);

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
    setBranchesOptions([])
  };

  const handleCheckboxChange = (rollNo) => {
    const updatedSelectedStudents = selectedStudents.includes(rollNo)
      ? selectedStudents.filter((selectedRollNo) => selectedRollNo !== rollNo)
      : [...selectedStudents, rollNo];
    setSelectedStudents(updatedSelectedStudents);
  };

  const handleSelectAll = () => {
    const allStudents = Object.keys(students);
    setSelectedStudents(allStudents);
  };

  const getNextSemester = (semester) => {
    const semesterNumber = parseInt(semester);
    if (!isNaN(semesterNumber)) {
      const suffix = getSemesterSuffix(semesterNumber + 1);
      return `${semesterNumber + 1}${suffix} Sem`;
    }
    return semester;
  };

  const getSemesterSuffix = (semesterNumber) => {
    if (semesterNumber >= 11 && semesterNumber <= 13) {
      return "th";
    }
    const lastDigit = semesterNumber % 10;
    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const handlePromote = async () => {
    if (selectedStudents.length === 0) {
      alert("Please select students to promote.");
      return;
    }
    const nextSemester = getNextSemester(selectedSemester);
    const updatedStudents = { ...students };

    for (const rollNo of selectedStudents) {
      const student = updatedStudents[rollNo];
      student.semester = nextSemester;
    }

    await Promise.all([
      set(ref(database, `/${selectedSemester}/${branches}/students`), null),
      set(
        ref(database, `/${nextSemester}/${branches}/students`),
        updatedStudents
      ),
      promoteStudentsInLoginCredentials(selectedStudents, nextSemester),
    ]);
    fetchStudents()
    setSelectedStudents([]);
    
  };

  const promoteStudentsInLoginCredentials = async (
    selectedStudents,
    nextSemester
  ) => {
    const loginCredentialsRef = ref(database, "loginCredentials/students");
    const loginCredentialsSnapshot = await get(loginCredentialsRef);

    loginCredentialsSnapshot.forEach((childSnapshot) => {
      const rollNo = childSnapshot.key;
      if (selectedStudents.includes(rollNo)) {
        set(
          ref(database, `loginCredentials/students/${rollNo}/semester`),
          nextSemester
        );
        console.log(selectedStudents.includes(rollNo), nextSemester);
      }
    });
  };

  const handleBranchChange = (e) => {
    setBranches(e.target.value);
  };

  return (
    <div>
      <select
        className="select-input"
        value={selectedSemester}
        onChange={handleSemesterChange}
      >
        <option value="Semester">Semester</option>
        {semesterOptions.map((sem) => (
          <option key={sem} value={sem}>
            {sem}
          </option>
        ))}
      </select>

      <select
        className="select-input"
        value={branches}
        onChange={handleBranchChange}
      >
        <option value="Semester">Branch</option>
        {branchesOptions.map((branch, key) => (
          <option key={key} value={branch}>
            {branch}
          </option>
        ))}
      </select>

      {branches !== "Branches" && (
        <div>
          <div className="buttons-container">
            <button className="button" onClick={handleSelectAll}>
              Select All
            </button>
            <button className="button" onClick={handlePromote}>
              Promote
            </button>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(students).map(([rollNo, student]) => (
                  <tr key={rollNo}>
                    <td>{rollNo}</td>
                    <td>{student.name}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(rollNo)}
                        onChange={() => handleCheckboxChange(rollNo)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoteStudents;
