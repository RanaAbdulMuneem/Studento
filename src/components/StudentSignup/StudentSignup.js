import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { ButtonGroup, Col, Container, Row } from "react-bootstrap";

import SignUp from "../forms/SignUp";
import img from "../../images/boy-table.png";
import bg from "../../images/bg-1.svg";

const StudentSignup = () => {
  return (
    <div className="p-5">
      {/* <SignUpForm2></SignUpForm2> */}
      <SignUp
        header="Student Signup heelo muneem"
        background={bg}
        image={img}
      ></SignUp>
    </div>
  );
};

export default StudentSignup;
