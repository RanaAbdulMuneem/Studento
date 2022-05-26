import React from "react";
import "bootstrap/dist/css/bootstrap.css";


import SignUp from "../forms/SignUp";
import img from "../../images/boy-table.png";
import bg from "../../images/bg-1.svg";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import NewSignUp from "../forms/NewSignUp";

const StudentSignup = () => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(studentName, studentEmail, studentPassword);
    const response = await fetch("http://localhost:3001/students/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentName,
        studentEmail,
        studentPassword,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      navigate("/studentlogin");
    }
  };

  return (
    <div className="p-5">
      {/* <SignUpForm2></SignUpForm2> */}
      {/* <SignUp header="Student Signup" background={bg} image={img} type="student"></SignUp> */}
      {/* <NewSignUp header="Student Signup" background={bg} image={img} type="student" /> */}
      <div
        class="container p-5 "
        style={{
          background: `url(${bg}) no-repeat center center / cover`,
          borderRadius: "25px",
          width: "75vw",
        }}
      >
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-10 order-lg-1 order-2 me-2">
            <div class="row mb-5">
              <p class="h1 fw-bold text-center">Student Sign up</p>
            </div>
            <div class="row mb-3">
              <form onSubmit={handleSubmit}>
                <label for="signup_name">
                  <strong>Full Name</strong>
                </label>
                <input
                  type="text"
                  id="signup_name"
                  className="form-control border border-secondary"
                  placeholder="Your Name Here"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />

                <label for="signup_email">
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  id="signup_email"
                  className="form-control border border-secondary"
                  placeholder="name@mail.com"
                  name="signup_email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                />

                <label for="signup_password">
                  <strong>Password</strong>
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
                  Register
                </button>
              </form>
            </div>
            <div class="row justify-content-center mb-2">
              <div class="col">
                <hr />
              </div>
              <div class="col-auto">OR</div>
              <div class="col">
                <hr />
              </div>
            </div>
            <div class="row mb-3">
              <a
                href="/https://accounts.google.com"
                target="_blank"
                class="btn btn-light border-secondary w-100"
              >
                Get started with Google
              </a>
            </div>
            <div class="row mb-1">
              <a
                href="/https://facebook.com"
                target="_blank"
                class="btn btn-light border-secondary w-100"
              >
                Login with Facebook
              </a>
            </div>
            <div class="row">
              <p className="text-center" style={{ fontSize: "12px" }}>
                By continuing you accept our <a href="/"> standard terms</a> and
                <a href="/"> conditions</a> and our{" "}
                <a href="/"> privacy policy</a>.
              </p>
            </div>
            <div class="row">
              <p className="text-center">
                Already have an account?{" "}
                <Link to={"/studentlogin"}>Log in!</Link>
              </p>
            </div>
          </div>
          <div class="col-lg col-md-12 order-lg-2 order-1 p-0 align-self-end">
            <div class="row mt-5 py-5">
              <img src={img} class="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
