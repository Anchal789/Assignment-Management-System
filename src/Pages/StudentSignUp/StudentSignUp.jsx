import React, { useState } from "react";
import Validator from "validator";
import { set, ref, getDatabase } from "firebase/database";
import {app} from "../../Firebase/firebase";

const StudentSignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [semester, setSemester] = useState("");
    const [subjectName, setSubjectName] = useState("");
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
  
    const handleSemesterChange = (e) => {
      setSemester(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = {};
  
      if (!Validator.isLength(name, { min: 3, max: 25 })) {
        newErrors.name = "Name must be between 3 and 25 characters";
      }
  
      if (!Validator.isEmail(email)) {
        newErrors.email = "Invalid email format";
      }
  
      if (!Validator.isNumeric(password) || password.length !== 5) {
        newErrors.password = "Password must be a 5-digit number";
      }
  
      if (!semester) {
        newErrors.semester = "Please select a semester";
      }
  
      if (!subjectName) {
        newErrors.subjectName = "Subject Name is required";
      }
  
      if (Object.keys(newErrors).length === 0) {
        const confirmSubmit = window.confirm("Everything seems perfect. Submit?");
        if (confirmSubmit) {
          console.log("Form submitted");
          console.table(name, email, password, semester, subjectName); // You can use this ID as needed
          set(ref(database, `${semester}/${subjectName}/facultyInfo`), {
            name,
            email,
            password,
            semester,
            subjectName,
          })
          // Reset form data and errors after successful submission
          setName("");
          setEmail("");
          setPassword("");
          setSemester("");
          setSubjectName("");
          setErrors({});
        }
      } else {
        setErrors(newErrors);
      }
    };
  
    return (
      <div className="teachersignup-container">
        <form onSubmit={handleSubmit} className="teachersignup-form">
          <div className="teachersignup-group">
            <label htmlFor="teachersignup-name">Name:</label>
            <input
              type="text"
              id="teachersignup-name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
            />
            {errors.name && (
              <div className="teachersignup-error">{errors.name}</div>
            )}
          </div>
          <div className="teachersignup-group">
            <label htmlFor="teachersignup-email">Email:</label>
            <input
              type="email"
              id="teachersignup-email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="teachersignup-error">{errors.email}</div>
            )}
          </div>
          <div className="teachersignup-group">
            <label htmlFor="teachersignup-password">Password:</label>
            <input
              type="password"
              id="teachersignup-password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
            {errors.password && (
              <div className="teachersignup-error">{errors.password}</div>
            )}
          </div>
          <div className="teachersignup-group">
            <label htmlFor="teachersignup-SubjectName">Subject:</label>
            <input
              type="text"
              id="teachersignup-SubjectName"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Enter your Subject"
            />
            {errors.subjectName && (
              <div className="teachersignup-error">{errors.subjectName}</div>
            )}
          </div>
          <div className="teachersignup-group">
            <label htmlFor="teachersignup-semester">Semester:</label>
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
            <button type="submit" className="teachersignup-signup-btn">
              Signup
            </button>
          </div>
        </form>
      </div>
    );
}

export default StudentSignUp