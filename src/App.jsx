import "./App.css";
import ErrorBoundry from "./Pages/ErrorBoundry/ErrorBoundry";
import FacultyLogin from "./Pages/Faculty/Faculty Login/FacultyLogin";
import FacultyHome from "./Pages/Faculty/Faculty Home/FacultyHome";
import { Home } from "./Pages/Home/Home/Home";
import StudentHome from "./Pages/Student/Student Home/StudentHome";
import StudentLogin from "./Pages/Student/Student Login/StudentLogin";
import StudentSignUp from "./Pages/Student/StudentSignUp/StudentSignUp";
import TeacherSignUp from "./Pages/Faculty/Faculty SignUp/FacultySignUp";
import { Route, Routes } from "react-router-dom";
import InvaildURL from "./Pages/ErrorBoundry/InvaildURL";
import CreateAssignment from "./Components/Faculty Components/Create Assignment/CreateAssignment";
import CheckAssignment from "./Components/Faculty Components/Check Assignment/CheckAssignment";
import { useSelector } from "react-redux";
import { StudentList } from "./Pages/Student/Student List/StudentList";
import ShowSubmission from "./Components/Faculty Components/Show Submission/ShowSubmission";

function App() {
  const facultyInfo = useSelector((state) => state.facultyProfile);
  const studentInfo = useSelector((state) => state.studentProfile);
  return (
    <ErrorBoundry>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faculty signup" element={<TeacherSignUp />} />
          <Route path="/student signup" element={<StudentSignUp />} />
          <Route path="/faculty login" element={<FacultyLogin />} />
          <Route path="/student login" element={<StudentLogin />} />
          <Route path="/student home/:rollno" element={<StudentHome />} />
          <Route
            path={`/faculty/${facultyInfo.semester}/${facultyInfo.stream}/${facultyInfo.subjectName}`}
            element={<FacultyHome />}
          />
          <Route
            path={`/create assignment/${facultyInfo.semester}/${facultyInfo.subjectName}`}
            element={<CreateAssignment />}
          />
          <Route
            path={`/check assignment/${facultyInfo.semester}/${facultyInfo.subjectName}`}
            element={<CheckAssignment />}
          />
          <Route
            path={`/students/${facultyInfo.semester}/${facultyInfo.subjectName}`}
            element={<StudentList />}
          />
          <Route path="/*" element={<InvaildURL />} />
        </Routes>
      </div>
    </ErrorBoundry>
  );
}

export default App;
