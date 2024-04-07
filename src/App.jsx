import "./App.css";
import ErrorBoundry from "./Pages/ErrorBoundry/ErrorBoundry";
import FacultyLogin from "./Pages/Faculty Login/FacultyLogin";
import FacultyHome from "./Pages/Home/FacultyHome";
import { Home } from "./Pages/Home/Home/Home";
import StudentHome from "./Pages/Home/StudentHome";
import StudentLogin from "./Pages/Student Login/StudentLogin";
import StudentSignUp from "./Pages/StudentSignUp/StudentSignUp";
import TeacherSignUp from "./Pages/Faculty SignUp/FacultySignUp";
import { Route, Routes } from "react-router-dom";
import InvaildURL from "./Pages/ErrorBoundry/InvaildURL";
import CreateAssignment from "./Components/Create Assignment/CreateAssignment";
import CheckAssignment from "./Components/Check Assignment/CheckAssignment";

function App() {
  return (
    <ErrorBoundry>
      <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/faculty signup" element={<TeacherSignUp/>}/>
        <Route path="/student signup" element={<StudentSignUp/>}/>
        <Route path="/faculty login" element={<FacultyLogin/>}/>
        <Route path="/student login" element={<StudentLogin/>}/>
        <Route path="/student home" element={<StudentHome/>}/>
        <Route path="/faculty home" element={<FacultyHome/>}/>
        <Route path="/create assignment" element={<CreateAssignment/>}/>
        <Route path="/check assignment" element={<CheckAssignment/>}/>
        <Route path="/*" element={<InvaildURL/>}/>
      </Routes>
      </div>
    </ErrorBoundry>
  );
}

export default App;
