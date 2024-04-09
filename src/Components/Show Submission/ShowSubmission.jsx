import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../../Firebase/firebase";
const ShowSubmission = (props) => {
  const [submissions, setSubmissions] = useState("");
  const facultyInfo = useSelector((state) => state.facultyProfile);
  const database = getDatabase(app);

  const fetchData = async () => {
    await get(
      child(
        ref(database),
        `${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}/assignments/${props.submissionInfo.status}/${props.submissionInfo.assignmentId}/submissions`
      )
    ).then((value) => {
      const result = value.val();
      console.log(result);
      if (Object.keys(result).length === 1) {
        setSubmissions("No Submissions");
      } else {
        setSubmissions(result);
      }
    });
  };

  useEffect(() => {
    fetchData();
    // console.log(props.submissionInfo.assignmentId, props.submissionInfo.status)
  }, []);
  return (
    <div>
      <p>{props.submissionInfo.assignmentId}</p>
      <p>{props.submissionInfo.status}</p>
      {
        submissions
      }
    </div>
  );
};

export default ShowSubmission;
