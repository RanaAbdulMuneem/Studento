import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import SignUp from "../forms/SignUp";
import img from "../../images/working-students.png";
import bg from "../../images/bg-4.svg";

import NewSignUp from '../forms/NewSignUp'

const CompanySignup = () => {
  return (
    <div className="p-5">
      {/* <SignUpForm2></SignUpForm2> */}
      {/* <SignUp header="Company Sign up" background={bg} image={img} type="company"></SignUp> */}
      <NewSignUp header="Company Sign up" background={bg} image={img} type="company"></NewSignUp>
    </div>
  );
};

export default CompanySignup;
