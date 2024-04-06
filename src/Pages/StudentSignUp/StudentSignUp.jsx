import React, { useState, useEffect } from "react";
import Validator from "validator";
import { set, ref, getDatabase, child, get } from "firebase/database";
import { app } from "../../Firebase/firebase";
import "./StudentSignUp.css"; // Import CSS file for styles

const StudentSignUp = () => {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [semester, setSemester] = useState("");
  const [stream, setStream] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [errors, setErrors] = useState({});
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [streamOptions, setStreamOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const database = getDatabase(app);

  // Load semester options on component mount
  useEffect(() => {
    const fetchData = async () => {
      const semesterSnapshot = await get(child(ref(database), "/"));
      if (semesterSnapshot.exists()) {
        const semesters = [];
        semesterSnapshot.forEach((semester) => {
          if (semester.key !== "loginCredentials") {
            semesters.push(semester.key);
          }
        });
        setSemesterOptions(semesters);
      }
    };
    fetchData();
  }, [database]);

  // Load stream options when semester changes
  useEffect(() => {
    if (semester) {
      const fetchData = async () => {
        const streamSnapshot = await get(child(ref(database), `/${semester}/`));
        if (streamSnapshot.exists()) {
          const streams = [];
          streamSnapshot.forEach((stream) => {
            streams.push(stream.key);
          });
          setStreamOptions(streams);
        }
      };
      fetchData();
    }
  }, [semester, database]);

  // Load subject options when stream changes
  useEffect(() => {
    if (stream) {
      const fetchData = async () => {
        const subjectSnapshot = await get(
          child(ref(database), `/${semester}/${stream}/`)
        );
        if (subjectSnapshot.exists()) {
          const subjects = [];
          subjectSnapshot.forEach((subject) => {
            subjects.push(subject.key);
          });
          setSubjectOptions(subjects);
        }
      };
      fetchData();
    }
  }, [stream, semester, database]);

  const handleRollNoChange = (e) => {
    setRollNo(e.target.value);
  };

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
    setStream(""); // Reset stream when semester changes
    setSubjectName(""); // Reset subject when semester changes
  };

  const handleStreamChange = (e) => {
    setStream(e.target.value);
    setSubjectName(""); // Reset subject when stream changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation code
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

    if (!stream) {
      newErrors.stream = "Stream is required";
    }

    if (!rollNo) {
      newErrors.rollNo = "Roll No is required";
    }

    if (Object.keys(newErrors).length === 0) {
      const confirmSubmit = window.confirm("Everything seems perfect. Submit?");
      if (confirmSubmit) {
        console.log("Form submitted");
        console.table(name, email, password, semester, subjectName, stream); // You can use this ID as needed
        set(
          ref(
            database,
            `${semester}/${stream}/${subjectName}/students/${rollNo}`
          ),
          {
            name,
            email,
            semester,
            subjectName,
            stream,
            rollNo,
          }
        );
        set(ref(database, `loginCredentials/students/${rollNo}`), {
          password,
          semester,
          subjectName,
          stream,
          rollNo,
        });
        // Reset form data and errors after successful submission
        setName("");
        setEmail("");
        setPassword("");
        setSemester("");
        setSubjectName("");
        setStream("");
        setErrors({});
        setRollNo("");
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="studentsignup-container">
      <form onSubmit={handleSubmit} className="studentsignup-form">
        <div className="studentsignup-group">
          <label htmlFor="studentsignup-rollNo">Roll No</label>
          <input
            type="text"
            id="studentsignup-rollNo"
            value={rollNo}
            onChange={handleRollNoChange}
            placeholder="Roll No"
          />
          {errors.rollNo && (
            <div className="studentsignup-error">{errors.rollNo}</div>
          )}
        </div>
        <div className="student-sections">
          <div className="student-personal-details">
            <div className="studentsignup-group">
              <label htmlFor="studentsignup-name">Name</label>
              <input
                type="text"
                id="studentsignup-name"
                value={name}
                onChange={handleNameChange}
                placeholder="ex: John Doe"
              />
              {errors.name && (
                <div className="studentsignup-error">{errors.name}</div>
              )}
            </div>
            <div className="studentsignup-group">
              <label htmlFor="studentsignup-email">Email</label>
              <input
                type="email"
                id="studentsignup-email"
                value={email}
                onChange={handleEmailChange}
                placeholder="ex: ex@gmail.com"
              />
              {errors.email && (
                <div className="studentsignup-error">{errors.email}</div>
              )}
            </div>
            <div className="studentsignup-group">
              <label htmlFor="studentsignup-password">Password</label>
              <input
                type="password"
                id="studentsignup-password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="*****"
              />
              {errors.password && (
                <div className="studentsignup-error">{errors.password}</div>
              )}
            </div>
          </div>
          <div className="student-subject-details">
            <div className="studentsignup-group">
              <label htmlFor="studentsignup-semester">Semester</label>
              <select
                id="studentsignup-semester"
                value={semester}
                onChange={handleSemesterChange}
              >
                <option value="">Semester</option>
                {semesterOptions.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
              {errors.semester && (
                <div className="studentsignup-error">{errors.semester}</div>
              )}
            </div>
            <div className="studentsignup-group">
              <label htmlFor="studentsignup-stream">Stream</label>
              <select
                id="studentsignup-stream"
                value={stream}
                onChange={handleStreamChange}
              >
                <option value="">Stream</option>
                {streamOptions.map((str) => (
                  <option key={str} value={str}>
                    {str}
                  </option>
                ))}
              </select>
              {errors.stream && (
                <div className="studentsignup-error">{errors.stream}</div>
              )}
            </div>
            <div className="studentsignup-group">
              <label htmlFor="studentsignup-subject">Subject</label>
              <select
                id="studentsignup-subject"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              >
                <option value="">Subject</option>
                {subjectOptions.map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
              {errors.subjectName && (
                <div className="studentsignup-error">{errors.subjectName}</div>
              )}
            </div>
          </div>
        </div>

        <div className="studentsignup-group">
          <button type="submit" className="studentsignup-signup-btn">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentSignUp;
