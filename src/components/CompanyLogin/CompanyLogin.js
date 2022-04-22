import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "react-bootstrap";
import "./CompanyLogin.css";

import LogInForm2 from "./LogInForm2";

const CompanyLogin = () => {
  return (
    <div className="p-5">
      <LogInForm2></LogInForm2>
    </div>
  );
};

export default CompanyLogin;
