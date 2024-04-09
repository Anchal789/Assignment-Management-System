import React, { useState } from "react";
import { app } from "../../../Firebase/firebase";
import { child, get, getDatabase, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { facultylogin } from "../../../Redux/redux";

const FacultyLogin = () => {
  const [subjectName, setSubjectName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const database = getDatabase(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const facultyInfo = useSelector((state) => state.facultyProfile);

  const handleSubjectNameChange = (e) => {
    setSubjectName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    get(child(ref(database), `loginCredentials/faculty/${subjectName}`)).then(
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
              }/facultyInfo/`
            )
          ).then((value) => {
            const result = value.val();
            dispatch(facultylogin(result));
            localStorage.setItem("authentication", true);
            navigate(`/faculty/${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}`);
          });
        }
      }
    );
  };

  return (
    <div>
      <form action="" id="faculty-login-form">
        {error && <p className="error-message">{error}</p>}
        <div className="faculty-login-group">
          <label htmlFor="facultylogin-subjectName">subject Name</label>
          <input
            type="text"
            name="facultylogin-subjectName"
            id="facultylogin-subjectName"
            onChange={handleSubjectNameChange}
          />
        </div>
        <div className="faculty-login-group">
          <label htmlFor="facultylogin-password">Password</label>
          <input
            type="password"
            name="facultylogin-password"
            id="facultylogin-password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
      <div className="new-user">
        <h4>New User?</h4>
        <button onClick={()=>{navigate("/faculty signup")}}>Register</button>
      </div>
    </div>
  );
};

export default FacultyLogin;
