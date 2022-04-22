import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "react-bootstrap";
import "./StudentLogin.css";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import LogInForm from "./LogInForm";
import LogInForm2 from "./LogInForm2";

const StudentLogin = () => {
  return (
    <div className="p-5">
      <LogInForm2></LogInForm2>
    </div>
  );
};

export default StudentLogin;