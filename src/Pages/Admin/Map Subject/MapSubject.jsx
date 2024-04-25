import { child, get, getDatabase, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { app } from "../../../Firebase/firebase";
import "./MapSubjects.css"

const MapSubject = () => {
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [semester, setSemester] = useState("Semester");
  const [branch, setBranch] = useState("Branch");
  const [facultyOptions, setFaculyOptions] = useState([]);
  const [selectedBranchFaculty, setSelectedBranchFaculty] = useState({});
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

  useEffect(() => {
    const fetchData = async () => {
      const subjectSnapshot = await get(
        child(ref(database), `/${semester}/${branch}`)
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
  }, [semester, branch]);

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

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
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
      ref(database, `${semester}/${branch}/${sub}/facultyInfo`),
      selectedFaculty
    );
    set(ref(database, `/${semester}/${branch}/${sub}/assignments`), {
        active : "",
        inactive :""
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
          { subjects: newSubjects  }
        );
      } else {
        console.error("Faculty data does not exist");
      }
    });
  };

  return (
    <div className="map-subject-container">
      <select className="select-input" value={semester} onChange={handleSemesterChange}>
        <option value={"Semester"}>Semester</option>
        {semesterOptions.map((sem) => (
          <option key={sem} value={sem}>
            {sem}
          </option>
        ))}
      </select>

      <select className="select-input" value={branch} onChange={handleBranchChange}>
        <option value={"Branch"}>Branch</option>
        {branchOptions.map((bra) => (
          <option key={bra} value={bra}>
            {bra}
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
          <button onClick={() => handleAddFaculty(sub, selectedBranchFaculty)} className="add-faculty-btn">
            Add Faculty
          </button>
        </div>
      ))}
    </div>
  );
};

export default MapSubject;
