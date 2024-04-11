import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../Redux/redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
        <button
        onClick={() => {
          dispatch(logout());
          navigate("/");
          localStorage.setItem("authentication", false);
        }}
      >
        Logout
      </button>
      <button onClick={() => navigate("/")}>Exit</button>
    </div>
  )
}

export default Navbar