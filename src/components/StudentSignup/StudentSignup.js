import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "react-bootstrap";
import "./StudentSignup.css";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import SignUpForm2 from "./SignUpForm2";

const StudentSignup = () => {
  return (
    <div className="p-5">
      <SignUpForm2></SignUpForm2>
    </div>
  );
};

export default StudentSignup;
