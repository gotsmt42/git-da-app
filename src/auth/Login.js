import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./form.css";
import Google from "@mui/icons-material/Google";
import { Button } from "react-bootstrap";
import { Facebook } from "@mui/icons-material";

import API from "../API/axiosInstance";

const Login = () => {

  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     // ถ้ามี Token ใน Local Storage ให้ทำการ navigate ไปยังหน้า Starter
  //     navigate("/starter");
  //   }
  // }, []); // ใส่ [] เพื่อให้ useEffect ทำงานเฉพาะเมื่อ Component ถูก Mount ครั้งแรกเท่านั้น
  


  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      const response = await API.post(`/auth/login`, {
        username,
        password,
      });
      const { token, payload } = response.data;

      login(token, payload);

      const { from } = location.state || { from: { pathname: "/starter" } }; // ถ้าไม่มี state ให้กลับไปที่หน้าหลัก
      navigate(from);

      console.log(token);
      console.log(response.data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="form-bg mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-offset-10 col-md-10 col-sm-offset-10 col-sm-12">
            <div className="form-container">
              <div className="left-content">
                <h3 className="title">Site Name</h3>
                <h4 className="sub-title">Lorem ipsum dolor sit amet.</h4>
              </div>
              <div className="right-content">
                <h3 className="form-title">Login</h3>
                <form className="form-horizontal" onSubmit={handleLogin}>
                  <div className="form-group">
                    <label>Username / Email</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button className="btn signin" type="submit">
                    Login
                  </button>
                  <div className="remember-me">
                    <input type="checkbox" className="checkbox" />
                    <span className="check-label">Remember Me</span>
                  </div>
                  <Link className="forgot">Forgot Password</Link>
                </form>
                <span className="separator">OR</span>
                <ul className="social-links">
                  <li>
                    <Button variant="danger">
                      {" "}
                      <Google /> Login with Google
                    </Button>
                  </li>
                  <li>
                    <Button variant="primary">
                      {" "}
                      <Facebook /> Login with Facebook
                    </Button>
                  </li>
                </ul>
                <span className="signup-link">
                  Don't have an account? Sign up{" "}
                  <Link to={"/register"}>here</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
