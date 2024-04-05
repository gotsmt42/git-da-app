import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import Google from "@mui/icons-material/Google";
import { Button } from "react-bootstrap";
import { Facebook } from "@mui/icons-material";

import "./form.css";

import API from "../API/axiosInstance";
import Swal from "sweetalert2";


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [tel, setTel] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleValidation = () => {
    let formIsValid = true;
    let errors = {};
  
    // Validate First Name
    if (!fname) {
      formIsValid = false;
      errors["fname"] = "Please enter your first name.";
    }
  
    // Validate Last Name
    if (!lname) {
      formIsValid = false;
      errors["lname"] = "Please enter your last name.";
    }
  
    // Validate Email
    if (!email) {
      formIsValid = false;
      errors["email"] = "Please enter your email.";
    } else {
      // Regular expression for email validation
      let emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailPattern.test(email)) {
        formIsValid = false;
        errors["email"] = "Please enter a valid email address.";
      }
    }
  
    // Validate Telephone
    if (!tel) {
      formIsValid = false;
      errors["tel"] = "Please enter your telephone number.";
    }
  
    // Validate Username
    if (!username) {
      formIsValid = false;
      errors["username"] = "Please enter your username.";
    }
  
    // Validate Password
    if (!password) {
      formIsValid = false;
      errors["password"] = "Please enter your password.";
    } else if (password.length < 4) {
      formIsValid = false;
      errors["password"] = "Password must be at least 4 characters long.";
    }
  
    setErrors(errors);
    return formIsValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        await API.post("/auth/signup", {
          fname,
          lname,
          tel,
          email,
          username,
          password,
        });

        navigate("/login");

        Swal.fire({
          icon: "success",
          title:"สมัครสมาชิกสำเร็จ",
          timer:2000
        })
      } catch (error) {
        console.error("Registration failed", error);
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: error.response.data.message
        });
        
      }
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
                        <span className="text-danger">
                          {errors["fname"]}
                        </span>
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
                        <span className="text-danger">
                          {errors["lname"]}
                        </span>
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
                    <span className="text-danger">{errors["email"]}</span>
                  </div>

                  <div className="form-group">
                    <label>Tel.</label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => setTel(e.target.value)}
                    />
                    <span className="text-danger">{errors["tel"]}</span>
                  </div>

                  <div className="form-group">
                    <label>Username / Email</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <span className="text-danger">{errors["username"]}</span>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span className="text-danger">{errors["password"]}</span>
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
  );
};

export default Register;
