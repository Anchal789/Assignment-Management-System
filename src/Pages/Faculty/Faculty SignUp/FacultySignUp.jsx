import React, { useState } from "react";
import Validator from "validator";
import "./FacultySignUp.css"; // Import CSS file for styles
import { set, ref, getDatabase } from "firebase/database";
import { app } from "../../../Firebase/firebase";
import FacultyIcon from "../../../Assets/teacher-with-stick-svgrepo-com.svg";

const TeacherSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const database = getDatabase(app);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    if (
      newPassword === "" ||
      (Validator.isNumeric(newPassword) && newPassword.length <= 5)
    ) {
      setPassword(newPassword);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!Validator.isLength(name, { min: 3, max: 25 })) {
      newErrors.name = "Name must be between 3 and 25 characters";
    }

    if (!Validator.isEmail(email)) {
      newErrors.email = "Invalid email";
    }

    if (!Validator.isNumeric(password) || password.length !== 5) {
      newErrors.password = "Password must be a 5-digit number";
    }

    if (Object.keys(newErrors).length === 0) {
      const confirmSubmit = window.confirm("Everything seems perfect. Submit?");
      if (confirmSubmit) {
        set(ref(database, `loginCredentials/facultyInfo/${email.replaceAll(".","_")}`), {
          name,
          email,
          password,
        });
        // Reset form data and errors after successful submission
        setName("");
        setEmail("");
        setPassword("");
        setErrors({});
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="teachersignup-container">
      <img src={FacultyIcon} className="icons" alt="" />
      <form onSubmit={handleSubmit} className="teachersignup-form">
        <div className="faculty-sections-signup">
          <div className="faculty-personal-details">
            <div className="teachersignup-group">
              <label htmlFor="teachersignup-name">Name</label>
              <input
                type="text"
                id="teachersignup-name"
                value={name}
                onChange={handleNameChange}
                placeholder="ex: John Doe"
              />
              {errors.name && (
                <div className="teachersignup-error">{errors.name}</div>
              )}
            </div>
            <div className="teachersignup-group">
              <label htmlFor="teachersignup-email">Email</label>
              <input
                type="email"
                id="teachersignup-email"
                value={email}
                onChange={handleEmailChange}
                placeholder="ex: ex@gmail.com"
              />
              {errors.email && (
                <div className="teachersignup-error">{errors.email}</div>
              )}
            </div>
            <div className="teachersignup-group">
              <label htmlFor="teachersignup-password">Password</label>
              <input
                type="password"
                id="teachersignup-password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="*****"
              />
              {errors.password && (
                <div className="teachersignup-error">{errors.password}</div>
              )}
            </div>
          </div>
          {/* <div className="faculty-subject-details">
            <div className="teachersignup-group">
              <label htmlFor="teachersignup-semester">Semester</label>
              <select
                id="teachersignup-semester"
                value={semester}
                onChange={handleSemesterChange}
              >
                <option value="">Select Semester</option>
                <option value="1st Sem">1st Semester</option>
                <option value="2nd Sem">2nd Semester</option>
                <option value="3rd Sem">3rd Semester</option>
                <option value="4th Sem">4th Semester</option>
                <option value="5th Sem">5th Semester</option>
                <option value="6th Sem">6th Semester</option>
                <option value="7th Sem">7th Semester</option>
                <option value="8th Sem">8th Semester</option>
              </select>
              {errors.semester && (
                <div className="teachersignup-error">{errors.semester}</div>
              )}
            </div>
            <div className="teachersignup-group">
              <label htmlFor="teachersignup-Stream">Stream</label>
              <input
                type="text"
                id="teachersignup-Branch"
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                placeholder="ex: CSE"
              />
              {errors.stream && (
                <div className="teachersignup-error">{errors.stream}</div>
              )}
            </div>
            <div className="teachersignup-group">
              <label htmlFor="teachersignup-SubjectName">Subject</label>
              <input
                type="text"
                id="teachersignup-SubjectName"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="ex: DBMS"
              />
              {errors.subjectName && (
                <div className="teachersignup-error">{errors.subjectName}</div>
              )}
            </div>
          </div> */}
        </div>

        <div className="teachersignup-group">
          <button type="submit" className="signup-btn">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherSignUp;
