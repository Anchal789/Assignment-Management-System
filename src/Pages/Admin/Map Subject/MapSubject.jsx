import { child, get, getDatabase, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { app } from "../../../Firebase/firebase";
import "./MapSubjects.css";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const MapSubject = () => {
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [semester, setSemester] = useState("Semester");
  const [facultyOptions, setFaculyOptions] = useState([]);
  const [alertBox, setAlertBox] = useState(false);
  const [selectedBranchFaculty, setSelectedBranchFaculty] = useState({});
  const database = getDatabase(app);
  const adminInfo = useSelector(state => state.admin);

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
      const subjectSnapshot = await get(
        child(ref(database), `/${semester}/${adminInfo.branch}`)
      );
      if (subjectSnapshot.exists()) {
        const subjects = [];
        subjectSnapshot.forEach((sub) => {
          subjects.push(sub.key);
        });
        setSubjectOptions(subjects);
      }
    };
    fetchData();
  }, [semester]);

  useEffect(() => {
    const fetchData = async () => {
      const facultySnapshot = await get(
        child(ref(database), `/loginCredentials/facultyInfo`)
      );
      if (facultySnapshot.exists()) {
        const faculties = [];
        facultySnapshot.forEach((faculty) => {
          faculties.push(faculty.val());
        });
        setFaculyOptions(faculties);
      }
    };
    fetchData();
  }, [semester]);

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleFacultyChange = (e, sub) => {
    const { value } = e.target;
    setSelectedBranchFaculty((prevState) => ({
      ...prevState,
      [sub]: value,
    }));
  };

  const handleAddFaculty = (sub) => {
    let selectedFacultyString = selectedBranchFaculty[sub];
    const selectedFaculty = JSON.parse(selectedFacultyString);
    set(
      ref(database, `${semester}/${adminInfo.branch}/${sub}/facultyInfo`),
      selectedFaculty
    );
    set(ref(database, `/${semester}/${adminInfo.branch}/${sub}/assignments`), {
      active: "",
      inactive: "",
    });
    get(
      ref(
        database,
        `loginCredentials/facultyInfo/${selectedFaculty.email.replaceAll(
          ".",
          "_"
        )}/`
      )
    ).then((snapshot) => {
      if (snapshot.exists()) {
        const currentSubjects = snapshot.val().subjects || {};
        const branch = adminInfo.branch;
        let newSubjects = {
          ...currentSubjects,
          [sub]: { sub, branch, semester },
        };

        return update(
          ref(
            database,
            `loginCredentials/facultyInfo/${selectedFaculty.email.replaceAll(
              ".",
              "_"
            )}/`
          ),
          { subjects: newSubjects }
        );
      } else {
        console.error("Faculty data does not exist");
      }
    });
    setAlertBox(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertBox(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [alertBox]);

  return (
    <div className="map-subject-container">
      <select
        className="select-input"
        value={semester}
        onChange={handleSemesterChange}
      >
        <option value={"Semester"}>Semester</option>
        {semesterOptions.map((sem) => (
          <option key={sem} value={sem}>
            {sem}
          </option>
        ))}
      </select>

      {subjectOptions.map((sub, key) => (
        <div key={key} className="subject-option">
          <p>{sub}</p>
          <select
            className="select-input"
            value={selectedBranchFaculty[sub] || "Faculty"}
            onChange={(e) => handleFacultyChange(e, sub)}
          >
            <option value={"Faculty"}>Faculty</option>
            {facultyOptions.map((fac) => (
              <option key={fac.name} value={JSON.stringify(fac)}>
                {fac.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => handleAddFaculty(sub, selectedBranchFaculty)}
            className="add-faculty-btn"
          >
            Add Faculty
          </button>
        </div>
      ))}
      {alertBox && (
        <Alert variant="filled" severity="success">
          Successfully Added The Subject in {semester}
        </Alert>
      )}
    </div>
  );
};

export default MapSubject;
