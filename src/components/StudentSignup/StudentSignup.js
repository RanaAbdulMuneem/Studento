import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "react-bootstrap";
import "./StudentSignup.css";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const StudentSignup = () => {
  return (
    <div className="container mt-5">
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

export default StudentSignup;
