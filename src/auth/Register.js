import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import Google from "@mui/icons-material/Google";
import { Button } from "react-bootstrap";
import { Facebook } from "@mui/icons-material";

import "./form.css";

import API from "../API/axiosInstance";


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [tel, setTel] = useState("");
  // const [token, setToken] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/signup", {
        fname,
        lname,
        tel,
        email,
        username,
        password,
      });
      // const { token } = response.data;
      // setToken(token);
      // localStorage.setItem("token", token);

      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
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
                <h3 className="form-title">Register</h3>
                <form className="form-horizontal" onSubmit={handleRegister}>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setFname(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setLname(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Tel.</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setTel(e.target.value)}
                      
                    />
                  </div>

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
                  <button className="btn signup" type="submit">
                    signup
                  </button>
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
                  Already have an account? Sign in{" "}
                  <Link to={"/login"}>here</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <input
    //     type="email"
    //     placeholder="Email"
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Username"
    //     onChange={(e) => setUsername(e.target.value)}
    //     required
    //   />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     onChange={(e) => setPassword(e.target.value)}
    //     required
    //   />
    //   <button onClick={handleRegister}>Register</button>
    //   <Link to={`/login`}>Login</Link>
    // </div>
  );
};

export default Register;
