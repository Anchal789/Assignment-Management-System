import React from 'react'
import "./InvalidURL.css"
import { useNavigate } from 'react-router'
const InvaildURL = () => {
  const navigate = useNavigate();
  return (
    <div className='invaild-url'>
      <img src="" alt="" />
      <h1 className='invaild-url-text'>The URL you have entered is invaild</h1>
      <h4>We can't find the page you're looking for. Head back to home</h4>
      <button className='invaild-url-btn' onClick={()=>{navigate("/")}}>Home</button>
    </div>
  )
}

export default InvaildURL