import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../../../Firebase/firebase";
import { useNavigate } from "react-router";

const StudentChoose = () => {
  const [subjects, setSubjects] = useState([]);
  const studentInfo = useSelector((state) => state.studentProfile);
  const database = getDatabase(app);
  const navigate = useNavigate();

  useEffect(()=>{
     get(ref(database,`/${studentInfo.semester}/${studentInfo.stream}/`)).then((snapshot)=>{
      const result = snapshot.val();
      if(result){
        setSubjects(result);
      }
    })
  },[])

  const handleClick = (subject) => {
    navigate(`/student home/${subject}`)
  }

  return <div>
    {Object.keys(subjects).map((subject,key)=>{
      if(subject === "students"){
        return null
      }
      return <button key={key} onClick={()=>{handleClick(subject)}}>{subject}</button>
    })}
  </div>;
};

export default StudentChoose;
