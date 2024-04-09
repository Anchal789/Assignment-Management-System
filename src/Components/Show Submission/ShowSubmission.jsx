import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { app } from "../../Firebase/firebase";
const ShowSubmission = () => {
  const assignmentInfo = useParams();
  const facultyInfo = useSelector((state) => state.facultyProfile);
  const database = getDatabase(app);

  const fetchData = async () => {
    await get(
      child(
        ref(database),
        `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/${assignmentInfo.status}/${assignmentInfo.id}/submissions`
      )
    ).then((value) => {
      const result = value.val();
      console.log(result);
    })
  }

  useEffect(()=>{
    fetchData();
    console.log(assignmentInfo)
  },[])
  return (
    <div>
      <p>{assignmentInfo.id}</p>
      <p>{assignmentInfo.status}</p>
    </div>
  );
};

export default ShowSubmission;
