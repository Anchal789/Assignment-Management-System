import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../../../Firebase/firebase";

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
      <div className="left-section-studentList">
        <ol>
          {students &&
            Object.values(students).map((student, index) => (
              <li className="student-details-card" key={index}>
                <p className="student-details">{student?.rollNo}</p>
                <p className="student-details">{student?.name}</p>
                <p className="student-details">{student?.email}</p>
              </li>
            ))}
        </ol>
      </div>
      <div className="right-section-studentList"></div>
    </div>
  );
};
