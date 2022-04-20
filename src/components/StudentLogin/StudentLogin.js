import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "react-bootstrap";
import "./StudentLogin.css";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const StudentLogin = () => {
  return (
    <div className="container mt-5">
      in progess mf
      <Row>
        <Col>
          <LeftSide />
        </Col>
        <Col>
          <RightSide />
        </Col>
      </Row>
    </div>
  );
};

export default StudentLogin;
