import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../../../Firebase/firebase";
import { useNavigate } from "react-router";
import "./StudentChoose.css";

const StudentChoose = () => {
  const [subjects, setSubjects] = useState([]);
  const studentInfo = useSelector((state) => state.studentProfile);
  const database = getDatabase(app);
  const navigate = useNavigate();

  useEffect(() => {
    get(ref(database, `/${studentInfo.semester}/${studentInfo.stream}/`)).then(
      (snapshot) => {
        const result = snapshot.val();
        if (result) {
          setSubjects(result);
        }
      }
    );
  }, []);

  const handleClick = (subject) => {
    navigate(`/student home/${subject}`);
  };

  return (
    <div className="student-choose-container">
      <h1>Your Subjects</h1>
      <div className="subject-buttons-container">
        {Object.keys(subjects).map((subject, key) => {
          if (subject === "students") {
            return null;
          }
          return (
            <button
              key={key}
              className="subject-button"
              onClick={() => {
                handleClick(subject);
              }}
            >
              {subject}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StudentChoose;
