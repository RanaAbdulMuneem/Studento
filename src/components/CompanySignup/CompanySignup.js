import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "react-bootstrap";
import "./CompanySignup.css";
import SignUpForm2 from "./SignUpForm2";

const CompanySignup = () => {
  return (
    <div className="p-5">
      <SignUpForm2></SignUpForm2>
    </div>
  );
};

export default CompanySignup;
