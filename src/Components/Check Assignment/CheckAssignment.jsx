import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const CheckAssignment = () => {
  const facultyInfo = useSelector((state)=>state.facultyProfile);

  return (
    <div>
      <h1>All Assignments</h1>
      <div className='left-section'></div>
      <div className='right-section'></div>
    </div>
  )
}

export default CheckAssignment