import React from 'react'
import { useParams } from 'react-router'

const ShowSubmission = () => {
    const assignmentId = useParams();
  return (
    <div>
        <p>{assignmentId}</p>
    </div>
  )
}

export default ShowSubmission