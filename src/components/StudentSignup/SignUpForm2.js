import React from "react";
import "./StudentSignup.css";
import img from "../../images/boy-table.png";
import bg from "../../images/bg-1.svg";

const SignUpForm2 = () => {
  return (
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
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Student Sign up
                    </p>
                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label p-0 m-0"
                            htmlFor="form3Example1c"
                          >
                            <strong>Full Name</strong>
                          </label>
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control border border-secondary"
                            placeholder="Your Name Here"
                          />
                        </div>
                      </div>
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
                          />
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
                            placeholder="Min 8 chars."
                          />
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
                        <div className="form-outline flex-fill mb-0">
                          <button
                            type="submit"
                            className="btn btn-primary  w-100 mb-4"
                          >
                            Register
                          </button>
                          <div className="row ">
                            <div className="col-3">
                              <hr />
                            </div>
                            <div className="col d-flex justify-content-center">
                              <lead>Signup with google</lead>
                            </div>
                            <div className="col-3">
                              <hr />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-light  w-100 my-4 border-secondary"
                          >
                            Get Started With Google
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
                              Already have an account? <a href="#"> Log in!</a>
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
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src={img} className="img-fluid" alt="Sample image" />
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

export default SignUpForm2;
