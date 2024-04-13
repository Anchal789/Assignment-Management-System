import React, { useEffect, useState } from "react";
import { app } from "../../../Firebase/firebase";
import { child, get, getDatabase, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { facultylogin } from "../../../Redux/redux";
import Loading from "../../LoadingPage";
import "./FacultyLogin.css"

const FacultyLogin = () => {
  const [subjectName, setSubjectName] = useState("");
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
        navigate(
          `/faculty/${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}`
        );
      }, 2000);
    }
  }, [redirecting, facultyInfo, navigate]);

  const handleSubjectNameChange = (e) => {
    setSubjectName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoader(true);
    get(child(ref(database), `loginCredentials/faculty/${subjectName}`)).then(
      (snapshot) => {
        const savedPassword = snapshot.val().password;
        if (!savedPassword) {
          setError("User does not exists");
          setLoader(false);
          return;
        }
        if (password === savedPassword) {
          get(
            child(
              ref(database),
              `${snapshot.val().semester}/${snapshot.val().stream}/${
                snapshot.val().subjectName
              }/facultyInfo/`
            )
          ).then((value) => {
            const result = value.val();
            dispatch(facultylogin(result));
            localStorage.setItem("authentication", true);
            setRedirecting(true);
          });
        } else {
          setError("Invalid Credentials");
          setLoader(false);
        }
      }
    );
  };

  return (
    <div className="faculty-login">
      {!loader ? (
        <>
          <form action="" className="faculty-login-form">
            {error && <p className="error-message">{error}</p>}
            <div className="faculty-login-group">
              <label htmlFor="facultylogin-subjectName">Subject Name</label>
              <input
                type="text"
                name="facultylogin-subjectName"
                id="facultylogin-subjectName"
                placeholder="ex : DBMS"
                onChange={handleSubjectNameChange}
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
          <div className="new-user">
            <h4>New User?</h4>
            <button
              onClick={() => {
                navigate("/faculty signup");
              }}
              className="signup-btn"
            >
              Register
            </button>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default FacultyLogin;
