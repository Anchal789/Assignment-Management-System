import React, { useEffect, useState } from "react";
import { app } from "../../../Firebase/firebase";
import { child, get, getDatabase, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { facultylogin } from "../../../Redux/redux";
import Loading from "../../LoadingPage";
import "./FacultyLogin.css";
import FacultyIcon from "../../../Assets/teacher-with-stick-svgrepo-com.svg";

const FacultyLogin = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const database = getDatabase(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const facultyInfo = useSelector((state) => state.facultyProfile);

  useEffect(() => {
    if (redirecting && facultyInfo.rollNo !== "") {
      // Redirect only when the redirecting flag is set and studentInfo is available
      setTimeout(() => {
        setLoader(false);
        navigate(`/faculty choose`);
      }, 2000);
    }
  }, [redirecting, facultyInfo, navigate]);

  const handleemailChange = (e) => {
    setemail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoader(true);
    console.log(email, email.replaceAll(".", "_"));
    get(
      child(
        ref(database),
        `/loginCredentials/facultyInfo/${email.replaceAll(".", "_")}/`
      )
    ).then((snapshot) => {
      const savedPassword = snapshot.val().password;
      console.log( snapshot.val());
      
      if (!savedPassword) {
        setError("User does not exists");
        setLoader(false);
        return;
      }
      if (password === savedPassword) {
        dispatch(facultylogin(snapshot.val()));
        localStorage.setItem("authentication", true);
        setRedirecting(true);
      } else {
        setError("Invalid Credentials");
        setLoader(false);
      }
    });
  };

  return (
    <div className="faculty-login">
      {!loader ? (
        <>
          <img src={FacultyIcon} className="icons" alt="" />
          <form action="" className="faculty-login-form">
            {error && <p className="error-message">{error}</p>}
            <div className="faculty-login-group">
              <label htmlFor="facultylogin-email">Email</label>
              <input
                type="text"
                name="facultylogin-email"
                id="facultylogin-email"
                onChange={handleemailChange}
              />
            </div>
            <div className="faculty-login-group">
              <label htmlFor="facultylogin-password">Password</label>
              <input
                type="password"
                name="facultylogin-password"
                placeholder="*****"
                id="facultylogin-password"
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" onClick={handleLogin} className="login-btn">
              Login
            </button>
          </form>
          
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default FacultyLogin;
