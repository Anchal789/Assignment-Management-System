import React, { useEffect } from "react";
import { useParams } from "react-router";

const ShowSubmission = () => {
  const assignmentId = useParams();
  
  return (
    <div>
      <p>{assignmentId.id}</p>
    </div>
  );
};

export default ShowSubmission;
