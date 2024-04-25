import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
const FacultyChoose = () => {
  const [subjectDetails, setSubjectDetails] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const facultyInfo = useSelector((state) => state.facultyProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (facultyInfo && facultyInfo.subjects) {
      // Get an array of subject keys
      const subjectKeys = Object.keys(facultyInfo.subjects);

      // Iterate over the subject keys
      subjectKeys.forEach((subjectKey) => {
        const subject = facultyInfo.subjects[subjectKey];
        setSubjects((subjects) => [...subjects, subject]);
      });
    }
  }, []);
  const handleButton = (subject) => {
      navigate(`/faculty/${subject.semester}/${subject.branch}/${subject.sub}`);
  }
  return (
    <div>
      {subjects.map((subject) => (
        <button onClick={()=>{handleButton(subject)}}>{subject.sub}</button>
      ))}
    </div>
  );
};

export default FacultyChoose;
