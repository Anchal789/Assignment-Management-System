import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../../../Firebase/firebase";
import "./StudentList.css";

export const StudentList = () => {
  const [students, setStudents] = useState();
  const facultyInfo = useSelector((state) => state.facultyProfile);
  const database = getDatabase(app);

  const fetchData = async () => {
    await get(
      child(
        ref(database),
        `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/students/`
      )
    ).then((snapshot) => {
      if (!snapshot.exists()) {
        setStudents("No Students Enroll");
        return;
      }
      const result = snapshot.val();
      setStudents(result);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="studentList">
        <ol className="student-list">
          {students &&
            Object.values(students).map((student, index) => (
              <li className="student-details-card" key={index}>
                <label htmlFor="roll">Roll No:</label>
                <h4 className="student-details" id="roll"> {student?.rollNo}</h4>
                <label htmlFor="name">Name</label>
                <h4 className="student-details" id="name">{student?.name}</h4>
                <label htmlFor="email">Email</label>
                <h4 className="student-details" id="email">{student?.email}</h4>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};
