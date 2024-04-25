import { child, get, getDatabase, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { app } from "../../../Firebase/firebase";
import "./PromoteStudents.css";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const PromoteStudents = () => {
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("Semester");
  const [students, setStudents] = useState({});
  const [alertBox, setAlertBox] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const database = getDatabase(app);
  const adminInfo = useSelector((state) => state.admin);

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
        child(
          ref(database),
          `/${selectedSemester}/${adminInfo.branch}/students`
        )
      );
      if (studentSnapshot.exists()) {
        setStudents(studentSnapshot.val());
      }
    }
  };
  useEffect(() => {
    fetchStudents();
  }, [selectedSemester]);

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
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
      set(
        ref(database, `/${selectedSemester}/${adminInfo.branch}/students`),
        null
      ),
      set(
        ref(database, `/${nextSemester}/${adminInfo.branch}/students`),
        updatedStudents
      ),
      promoteStudentsInLoginCredentials(selectedStudents, nextSemester),
    ]);
    fetchStudents();
    setSelectedStudents([]);
    setAlertBox(true);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertBox(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [alertBox]);

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

      {adminInfo.branch !== "" && (
        <div>
          <div className="buttons-container">
            <button className="promote-button" onClick={handleSelectAll}>
              Select All
            </button>
            <button className="promote-button" onClick={handlePromote}>
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
                    <td className="rollNO">{rollNo}</td>
                    <td className="name">{student.name}</td>
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
      {alertBox && (
        <Alert variant="filled" severity="success">
          Promoted Successfully
        </Alert>
      )}
    </div>
  );
};

export default PromoteStudents;
