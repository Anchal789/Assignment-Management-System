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
    <div>
      <div className="studentList">
        <ol className="student-list">
        {students === undefined ? (
            <h4>Loading...</h4>
          ) : students === "No Students Enroll" ? (
            <h4>No Students Enroll</h4>
          ) : (
            Object.values(students).map((student, index) => (
              <li className="student-details-card" key={index}>
                <label htmlFor="roll">Roll No:</label>
                <h4 className="student-details" id="roll">
                  {" "}
                  {student?.rollNo}
                </h4>
                <label htmlFor="name">Name</label>
                <h4 className="student-details" id="name">
                  {student?.name}
                </h4>
                <label htmlFor="email">Email</label>
                <h4 className="student-details" id="email">
                  {student?.email}
                </h4>
              </li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
};
