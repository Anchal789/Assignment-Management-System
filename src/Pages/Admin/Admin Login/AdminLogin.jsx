import { child, get, getDatabase, ref } from "firebase/database";
import React, { useState } from "react";
import { app } from "../../../Firebase/firebase";
import { useNavigate } from "react-router";
import Loading from "../../LoadingPage";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../../Redux/redux";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // For displaying loading state
  const navigate = useNavigate();
  const database = getDatabase(app);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const snapShot = await get(
        child(ref(database), `/loginCredentials/Admin`)
      );
      const savedPassword = snapShot.val();
      if (password === savedPassword) {
        dispatch(adminLogin(true));
        navigate("/admin-panel");
      } else {
        setError("Invalid Password");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="admin-login-container">
      {loading ? (
        <Loading />
      ) : (
        <div className="admin-login">
          <h2>Welcome Admin</h2>
          
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlPasswordChange}
            placeholder="Enter Your Password"
            className="login-input"
          />
          {error && <div className="error-message">{error}</div>}
          <button
            onClick={handleLogin}
            className="login-btn"
            disabled={loading}
          >
            {loading ? <Loading /> : "Login"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
