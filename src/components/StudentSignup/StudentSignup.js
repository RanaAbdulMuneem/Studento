import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { ButtonGroup, Col, Container, Row } from "react-bootstrap";

import SignUp from "../forms/SignUp";
import img from "../../images/boy-table.png";
import bg from "../../images/bg-1.svg";

import NewSignUp from '../forms/NewSignUp'

const StudentSignup = () => {
  return (
    <div className="p-5">
      {/* <SignUpForm2></SignUpForm2> */}
      {/* <SignUp header="Student Signup" background={bg} image={img} type="student"></SignUp> */}
      <NewSignUp header="Student Signup" background={bg} image={img} type="student" />
    </div>
  );
};

export default StudentSignup;
