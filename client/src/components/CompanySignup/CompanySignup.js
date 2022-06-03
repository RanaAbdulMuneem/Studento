import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import SignUp from "../forms/SignUp";
import img from "../../images/working-students.png";
import bg from "../../images/bg-4.svg";
import NewSignUp from "../forms/NewSignUp";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

// import jwt_decode from "jwt-decode";

import { useState, useEffect } from "react";

const CompanySignup = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "144784068599-c2ranadsf9knt3s700jkn1igqpqkp0bl.apps.googleusercontent.com",
      callback: handleCallbackGoogle,
    });

    google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const handleCallbackGoogle = async (res) => {
    console.log("Encoded JWT ID token: " + res.credential);
    var userObject = jwt_decode(res.credential);
    console.log("Decoded Token: ", userObject);
    console.log("Decoded Token: ", userObject.sub);
    console.log("Decoded Token: ", userObject.given_name);
    console.log("Decoded Token: ", userObject.family_name);
    console.log("Decoded Token: ", userObject.email);

    const companyName = userObject.given_name + " " + userObject.family_name;
    const companyEmail = userObject.email;
    const companyPassword = userObject.sub;

    const response = await fetch("http://localhost:3001/companies/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName,
        companyEmail,
        companyPassword,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      navigate("/companylogin");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(companyName, companyEmail, companyPassword);
    const response = await fetch("http://localhost:3001/companies/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName,
        companyEmail,
        companyPassword,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      navigate("/companylogin");
    }
  };

  return (
    <div className="p-5">
      {/* <SignUpForm2></SignUpForm2> */}
      {/* <SignUp header="Company Sign up" background={bg} image={img} type="company"></SignUp> */}
      {/* <NewSignUp header="Company Sign up" background={bg} image={img} type="company"></NewSignUp> */}
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
              <p class="h1 fw-bold text-center">Company Sign up</p>
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
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
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
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
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
                  value={companyPassword}
                  onChange={(e) => setCompanyPassword(e.target.value)}
                />

                <button class="btn btn-primary text-center w-100 mt-2" type="submit">
                  Register
                </button>
              </form>
            </div>
            <div class="row justify-content-center mb-2">
              <div class="col">
                <hr />
              </div>
              {/* <div class="col-auto">OR</div> */}
              <div class="col">
                <hr />
              </div>
            </div>
            {/* <div class="row mb-3">
              <div className="mx-5" id="signUpDiv"></div>
            </div> */}
            <div class="row mb-1">
              {/* <a
                href="/https://facebook.com"
                target="_blank"
                class="btn btn-light border-secondary w-100"
              >
                Login with Facebook
              </a> */}
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
                <Link to={"/companylogin"}>Log in!</Link>
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

export default CompanySignup;
