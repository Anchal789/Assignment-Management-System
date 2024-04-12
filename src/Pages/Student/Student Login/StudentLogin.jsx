import React, { useEffect, useState } from "react";
import { app } from "../../../Firebase/firebase";
import { child, get, getDatabase, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { studentlogin } from "../../../Redux/redux";
import Loading from "../../LoadingPage";

const StudentLogin = () => {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const database = getDatabase(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const studentInfo = useSelector((state) => state.studentProfile);

  useEffect(() => {
    if (redirecting && studentInfo.rollNo !== "") {
      // Redirect only when the redirecting flag is set and studentInfo is available
      setTimeout(() => {
        setLoader(false);
        navigate(`/student home/${studentInfo.rollNo}`);
      }, 2000);
    }
  }, [redirecting, studentInfo, navigate]);

  const handleRollNoChange = (e) => {
    setRollNo(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setLoader(true);
    get(child(ref(database), `loginCredentials/students/${rollNo}`)).then(
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
              }/students/${rollNo}`
            )
          ).then((value) => {
            const result = value.val();
            dispatch(studentlogin(result));
            localStorage.setItem("authentication", true);
            setRedirecting(true);
          });
          setRollNo("");
          setPassword("");
        } else {
          setError("Invalid credentials");
          setLoader(false);
        }
      }
    );
  };

  return (
    <div className="student-login-container">
      {!loader ? (
        <>
        <form action="" id="student-login-form">
          {error && <p className="error-message">{error}</p>}
          <div className="student-login-group">
            <label htmlFor="studentlogin-rollNo">Roll No</label>
            <input
              type="text"
              name="studentlogin-rollNo"
              id="studentlogin-rollNo"
              onChange={handleRollNoChange}
            />
          </div>
          <div className="student-login-group">
            <label htmlFor="studentlogin-password">Password</label>
            <input
              type="password"
              name="studentlogin-password"
              id="studentlogin-password"
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </form>
        <div>
          <p>New User?</p>
          <button onClick={() => navigate("/student signup")}>Signup</button>
        </div>
        </>
      ): <Loading/>}

    </div>
  );
};

export default StudentLogin;
