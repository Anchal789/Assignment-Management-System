import React, { useState } from "react";
import { app } from "../../../Firebase/firebase";
import { child, get, getDatabase, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { studentlogin } from "../../../Redux/redux";

const StudentLogin = () => {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const database = getDatabase(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const studentInfo = useSelector((state) => state.studentProfile);

  const handleRollNoChange = (e) => {
    setRollNo(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    get(child(ref(database), `loginCredentials/students/${rollNo}`)).then(
      (snapshot) => {
        const savedPassword = snapshot.val().password;
        if (!savedPassword) {
          setError("User does not exists");
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
            console.log(value.val());
            const result = value.val()
            dispatch(studentlogin(result));
          });
          navigate(`/student home/${studentInfo.rollNo}`);
          setRollNo("");
          setPassword("");
        } else {
          setError("Invalid credentials");
        }
      }
    );
  };

  return (
    <div className="student-login-container">
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
    </div>
  );
};

export default StudentLogin;
