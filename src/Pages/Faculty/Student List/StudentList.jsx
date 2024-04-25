import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { app } from "../../../Firebase/firebase";
import "./StudentList.css";
import { useParams } from "react-router";

export const StudentList = () => {
  const [students, setStudents] = useState();
  const urlParams = useParams();
  const database = getDatabase(app);

  const fetchData = async () => {
    await get(
      child(
        ref(database),
        `${urlParams.semester}/${urlParams.branch}/students/`
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
    <div className="student-list-container">
      <h2>Student List</h2>
      {students === undefined ? (
        <h4 className="loading-message">Loading...</h4>
      ) : students === "No Students Enroll" ? (
        <h4 className="no-students-message">No Students Enroll</h4>
      ) : (
        <table className="student-list-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(students).map((student, index) => (
              <tr key={index}>
                <td className="rollNO">{student.rollNo}</td>
                <td className="name">{student.name}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
