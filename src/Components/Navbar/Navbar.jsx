import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../Redux/redux";
import "./Navbar.css"

const Navbar = () => {
  const authentication = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    let result =
      authentication ||
      Boolean(localStorage.getItem("authentication") === true);
  }, [authentication, navigate]);
  return (
    <div className="navbar">
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/");
            localStorage.setItem("authentication", false);
          }}
          className="navbar-btn"
        >
          {authentication ? "Logout" : 'Exit'}
        </button>
      
    </div>
  );
};

export default Navbar;
