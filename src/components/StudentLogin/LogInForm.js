import React from "react";
import "./StudentLogin.css";

const LogInForm = () => {
  return (
    <div
      className="p-3"
      style={{
        width: "300px",
        border: "1px solid black",
        borderRadius: "10px",
      }}
    >
      <h3>Create Your Account!</h3>
      <form>
        <div className="form-outline my-4">
          <label className="form-label" htmlFor="name">
            Full Name
          </label>
          <input type="email" id="name" className="form-control" />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input type="email" id="email" className="form-control" />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input type="password" id="password" className="form-control" />
        </div>
        {/* Submit button */}
        <button type="submit" className="btn btn-primary w-100 mb-4">
          Sign up
        </button>
        <div className="row no-gutters">
          <div className="col">
            <hr />
          </div>
          <div className="col d-flex justify-content-center">Or</div>
          <div className="col">
            <hr />
          </div>
        </div>
        <button type="submit" className="btn btn-light  w-100 mb-4">
          Get Started With Google
        </button>
      </form>
    </div>
  );
};

export default LogInForm;
