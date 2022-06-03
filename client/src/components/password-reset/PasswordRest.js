import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import NewSignUp from "../forms/NewSignUp";
import { useParams } from "react-router-dom";
import axios from 'axios'

const PasswordReset = () => {
  const navigate = useNavigate();
  const [studentPassword, setStudentPassword] = useState("");
  const { email, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email + " " + token);

    // API goes here
    // Hit Api: localhost:3001/students/password-update
    // Parameters: studentEmail, studentToken, studentPassword
    // Redirect user to login
    axios.post(`http://localhost:3001/students/password-update`, {studentEmail: email, studentPassword: studentPassword, studentToken: token})
    .then((response) => {
      console.log(response.data);
      navigate('/studentlogin');
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <div className="p-5">
      {/* <SignUpForm2></SignUpForm2> */}
      {/* <SignUp header="Student Signup" background={bg} image={img} type="student"></SignUp> */}
      {/* <NewSignUp header="Student Signup" background={bg} image={img} type="student" /> */}
      <div
        class="container p-5 "
        style={{
          //   background: `url(${bg}) no-repeat center center / cover`,
          borderRadius: "25px",
          width: "75vw",
        }}
      >
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-10 order-lg-1 order-2 me-2">
            <div class="row mb-5">
              <p class="h1 fw-bold text-center">Password Reset</p>
            </div>
            <div class="row mb-3">
              <form onSubmit={handleSubmit}>
                <label for="signup_password">
                  <strong>Enter New Password</strong>
                </label>
                <input
                  type="password"
                  id="signup_password"
                  className="form-control border border-secondary"
                  placeholder="Minimum 8 chars"
                  name="signup_password"
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                />

                <button class="btn btn-primary text-center w-100" type="submit">
                  Set Password
                </button>
              </form>
            </div>

            <div class="row">
              <p className="text-center" style={{ fontSize: "12px" }}>
                By continuing you accept our <a href="/"> standard terms</a> and
                <a href="/"> conditions</a> and our{" "}
                <a href="/"> privacy policy</a>.
              </p>
            </div>
          </div>
          <div class="col-lg-4 col-md-12 order-lg-2 order-1 p-0 align-self-end">
            <div class="row mt-5 py-5">
              {/* <img src={img} class="img-fluid" alt="" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
