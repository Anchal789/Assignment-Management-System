import React, { useState } from "react";
import Validator from "validator";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 from uuid package
import "./TeacherSignUp.css"; // Import CSS file for styles

const TeacherSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [semester, setSemester] = useState([""]);
  const [facultyId, setFacultyId] = useState("");
  const [errors, setErrors] = useState({});
  const [classCount, setClassCount] = useState(1);
  const [teacherId, setTeacherId] = useState("");

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

  const handleSemesterChange = (index, e) => {
    const updatedSemester = [...semester];
    updatedSemester[index] = e.target.value;
    setSemester(updatedSemester);
  };

  const handleAddClass = () => {
    setClassCount(classCount + 1);
    setSemester([...semester, ""]);
  };

  const handleDeleteClass = (index) => {
    const updatedSemester = [...semester];
    updatedSemester.splice(index, 1);
    setSemester(updatedSemester);
    setClassCount(classCount - 1);
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

    const hasEmptySemester = semester.some((value) => value === "");
    if (hasEmptySemester) {
      newErrors.semester = "Please select a semester.";
    }

    if (!facultyId) {
      newErrors.facultyId = "Faculty ID is required";
    }

    if (Object.keys(newErrors).length === 0) {
      const teacherId = uuidv4(); // Generate a unique ID
      setTeacherId(teacherId); // Set the unique ID in state
      const confirmSubmit = window.confirm("Everything seems perfect. Submit?");
      if (confirmSubmit) {
        console.log("Form submitted");
        console.log("Teacher ID:", teacherId); // You can use this ID as needed
        // Reset form data and errors after successful submission
        setName("");
        setEmail("");
        setPassword("");
        setSemester([""]);
        setFacultyId("");
        setErrors({});
        setTeacherId("");
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="teachersignup-container">
      <form onSubmit={handleSubmit} className="teachersignup-form">
        <div className="teachersignup-group">
          <label htmlFor="teachersignup-facultyid">Faculty ID:</label>
          <input
            type="text"
            id="teachersignup-facultyid"
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
          />
          {errors.facultyId && (
            <div className="teachersignup-error">{errors.facultyId}</div>
          )}
        </div>
        <div className="teachersignup-group">
          <label htmlFor="teachersignup-name">Name:</label>
          <input
            type="text"
            id="teachersignup-name"
            value={name}
            onChange={handleNameChange}
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
          />
          {errors.password && (
            <div className="teachersignup-error">{errors.password}</div>
          )}
        </div>

        <div className="teachersignup-group">
          {semester.map((value, index) => (
            <div key={index} className="teachersignup-class-group">
              <label htmlFor={`teachersignup-semester-${index}`}>{`Class ${
                index + 1
              }`}</label>
              <select
                id={`teachersignup-semester-${index}`}
                value={value}
                onChange={(e) => handleSemesterChange(index, e)}
              >
                <option value="">Select Semester</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
              </select>
              {errors.semester && (
                <div className="teachersignup-error">{errors.semester}</div>
              )}
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleDeleteClass(index)}
                  className="teachersignup-delete-btn"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddClass}
            className="teachersignup-add-class-btn"
          >
            Add Class
          </button>
        </div>
        <button type="submit" className="teachersignup-signup-btn">
          Signup
        </button>
      </form>
      {teacherId && (
        <div className="teachersignup-teacher-id">
          Your Unique ID: {teacherId}
        </div>
      )}
    </div>
  );
};

export default TeacherSignUp;
