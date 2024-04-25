import { child, get, getDatabase, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { app } from "../../../Firebase/firebase";
import AdminIcon from "../../../Assets/authorized-person.png";
import Validator from "validator";
import { useNavigate } from "react-router";
import { Alert } from "@mui/material";

const AdminSignup = () => {
  const [branch, setBranch] = useState("");
  const [name, setName] = useState("");
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertBox, setAlertBox] = useState(false);
  const database = getDatabase(app);
  const navigate = useNavigate();

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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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

    if (!branch) {
      newErrors.branch = "Please Enter a branch";
    }

    if (Object.keys(newErrors).length === 0) {
      const confirmSubmit = window.confirm("Everything seems perfect. Submit?");
      if (confirmSubmit) {
        semesterOptions.map((sem) => {
          const semesterRef = ref(database, `/${sem}/`);

          // Fetch existing branches in the semester
          get(semesterRef).then((snapshot) => {
            if (snapshot.exists()) {
              const existingBranches = snapshot.val();
              const updatedBranches = { ...existingBranches, [branch]: true };
              // Update the semester node with the new branch
              update(semesterRef, updatedBranches);
            } else {
              // If the semester node doesn't exist, create it with the new branch
              set(semesterRef, { [branch]: true });
            }
          });
        });
        set(
          ref(
            database,
            `loginCredentials/adminInfo/${email.replaceAll(".", "_")}`
          ),
          {
            name,
            email,
            password,
            branch,
          }
        );
        // Reset form data and errors after successful submission
        setName("");
        setEmail("");
        setPassword("");
        setBranch("");
        setErrors({});
        setAlertBox(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertBox(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [alertBox]);

  return (
    <div className="teachersignup-container">
      <img src={AdminIcon} className="icons" alt="" />
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
            <div className="teachersignup-group">
              <label htmlFor="teachersignup-password">Stream</label>
              <input
                type="text"
                id="teachersignup-branch"
                value={branch}
                onChange={handleBranchChange}
                placeholder="ex : CSE"
              />
              {errors.password && (
                <div className="teachersignup-error">{errors.branch}</div>
              )}
            </div>
          </div>
        </div>

        <div className="teachersignup-group">
          <button type="submit" className="signup-btn">
            Signup
          </button>
        </div>
      </form>
      {alertBox && (
        <Alert variant="filled" severity="success">
          Registered Successfully
        </Alert>
      )}
    </div>
  );
};

export default AdminSignup;
