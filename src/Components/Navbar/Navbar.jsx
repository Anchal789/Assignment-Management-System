import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../Redux/redux";

const Navbar = () => {
  const [authenticationStatus, setAuthenticationStatus] = useState(false);
  const authentication = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    let result =
      authentication ||
      Boolean(localStorage.getItem("authentication") === true);
    setAuthenticationStatus(result);
  }, [authentication, navigate]);
  return (
    <div>
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/");
            localStorage.setItem("authentication", false);
          }}
        >
          {authentication ? "Logout" : 'Exit'}
        </button>
      
    </div>
  );
};

export default Navbar;
