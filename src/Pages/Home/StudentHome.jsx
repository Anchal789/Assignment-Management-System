import React from 'react'
import { useSelector } from 'react-redux'

const StudentHome = () => {
  const studentInfo = useSelector((state) => state.studentProfile)
  return (
    <div>
      
    </div>
  )
}

export default StudentHome