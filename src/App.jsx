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
        <Route path="/faulty home" element={<FacultyHome/>}/>
      </Routes>
      </div>
    </ErrorBoundry>
  );
}

export default App;
