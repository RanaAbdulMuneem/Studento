import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ForgetPassword from "../utils/ForgetPassword";

function validateInfo(values) {
  let errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid email: Missing @ or .com";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length <= 8) {
    errors.password = "Password needs to be 8 characters or more";
  }

  return errors;
}

const LogIn = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values));
    setIsSubmitting(true);
  };
  return (
    <section className="h-100" style={{ backgroundColor: "white" }}>
      <div className="container h-100 StudentSignUp" id="bg-img">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div
              className="card text-black"
              style={{
                background: `url(${props.background}) no-repeat center center / cover`,
                borderRadius: "25px",
              }}
            >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      {props.header}
                    </p>
                    <form className="mx-1 mx-md-4">
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
                            value={values.email}
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <p className="p-0 m-0" style={{ color: "red" }}>
                              {errors.email}
                            </p>
                          )}
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
                            value={values.password}
                            onChange={handleChange}
                          />
                          {errors.password && (
                            <p className="p-0 m-0" style={{ color: "red" }}>
                              {errors.password}
                            </p>
                          )}
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
                            onClick={handleSubmit}
                          >
                            Log Me In!
                          </button>
                          {/* <a href="#">Forgot Password?</a> */}
                          <ForgetPassword />
                          <div className="row ">
                            <div className="col-3  m-0 p-0">
                              <hr />
                            </div>
                            <div className="col d-flex justify-content-center justify-text-center mx-1 px-0">
                              <lead className="text-center p-0 m-0">
                                Or
                              </lead>
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
                              <a href="#"> standard terms</a> and
                              <a href="#"> conditions</a> and our{" "}
                              <a href="#"> privacy policy</a>.
                            </p>
                            <p className="text-center">
                              Don't have an account? <Link to={"/" + props.type + "signup"}> Sign Up!</Link>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* <div className="row ">
                        <div className="col">
                          <button
                            type="submit"
                            className="btn btn-primary  w-100 mb-4 mx-3"
                          >
                            Register
                          </button>
                        </div>
                      </div>

                      <div className="row ">
                        <div className="col">
                          <hr />
                        </div>
                        <div className="col d-flex justify-content-center">
                          Or
                        </div>
                        <div className="col">
                          <hr />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-light  w-100 mb-4"
                      >
                        Get Started With Google
                      </button> */}
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-1">
                    <img
                      src={props.image}
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
