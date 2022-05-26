import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import LogIn from "../forms/LogIn";

import img from "../../images/work-mess.png";
import bg from "../../images/bg-1.svg";
import { Link, useNavigate } from "react-router-dom";
import NewLogIn from "../forms/NewLogin";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");

  const handleStudentProfile = (user) => {
    const { email } = user;

    navigate("/studentprofile", {
      state: {
        email: email,
      },
    });
  };

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    console.log("student login");
    console.log(studentEmail, studentPassword);
    const response = await fetch("http://localhost:3001/studentlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentEmail,
        studentPassword,
      }),
    });
    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      //alert("Login successful");
      console.log('data.user', data.user)
      handleStudentProfile(data.user);
    } else {
      alert("Please check your username and password");
    }
  };

  return (
    <div className="p-5">
      {/* <LogIn header="Student Login" background={bg} image={img} type="student"></LogIn> */}
      {/* <NewLogIn header="Student Login" background={bg} image={img} type="student"></NewLogIn> */}
      <section className="h-100" style={{ backgroundColor: "white" }}>
        <div className="container h-100 StudentSignUp" id="bg-img">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black"
                style={{
                  background: `url(${bg}) no-repeat center center / cover`,
                  borderRadius: "25px",
                }}
              >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Student Login
                      </p>
                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleStudentLogin}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label p-0 m-0"
                              htmlFor="form3Example3c"
                            >
                              <strong>Email</strong>
                            </label>

                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control border border-secondary"
                              placeholder="name@mail.com"
                              name="email"
                              value={studentEmail}
                              onChange={(e) => setStudentEmail(e.target.value)}
                            />
                            {/* {errors.email && (
                            <p className="p-0 m-0" style={{ color: "red" }}>
                              {errors.email}
                            </p>
                          )} */}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label p-0 m-0"
                              htmlFor="form3Example4c"
                            >
                              <strong>Password</strong>
                            </label>
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control border border-secondary"
                              placeholder="Password Here"
                              name="password"
                              value={studentPassword}
                              onChange={(e) =>
                                setStudentPassword(e.target.value)
                              }
                            />
                            {/* {errors.password && (
                            <p className="p-0 m-0" style={{ color: "red" }}>
                              {errors.password}
                            </p>
                          )} */}
                          </div>
                        </div>
                        {/* <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            Repeat your password
                          </label>
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                          />
                        </div>
                      </div> */}
                        {/* <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          defaultValue
                          id="form2Example3c"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div> */}
                        {/* <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary w-100 btn-lg"
                        >
                          Register
                        </button>
                      </div> */}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0 text-center">
                            <button
                              type="submit"
                              className="btn btn-primary  w-100 mb-4"
                            >
                              Log Me In!
                            </button>
                            {/* <a href="#">Forgot Password?</a> */}
                            {/* <ForgetPassword /> */}
                            <div className="row ">
                              <div className="col-3  m-0 p-0">
                                <hr />
                              </div>
                              <div className="col d-flex justify-content-center justify-text-center mx-1 px-0">
                                <lead className="text-center p-0 m-0">Or</lead>
                              </div>

                              <div className="col-3 m-0 p-0">
                                <hr />
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-light  w-100  border-secondary"
                            >
                              Get Started With Google
                            </button>
                            <button
                              type="submit"
                              className="btn btn-light  w-100 my-4 border-secondary"
                            >
                              Login With Facebook
                            </button>
                            <div>
                              <p
                                className="text-center"
                                style={{ fontSize: "12px" }}
                              >
                                By continuing you accept our{" "}
                                <a href="/"> standard terms</a> and
                                <a href="/"> conditions</a> and our{" "}
                                <a href="/"> privacy policy</a>.
                              </p>
                              <p className="text-center">
                                Don't have an account?{" "}
                                <Link to={"/companysignup"}> Sign Up!</Link>
                              </p>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-1">
                      <img src={img} className="img-fluid" alt="image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLogin;
