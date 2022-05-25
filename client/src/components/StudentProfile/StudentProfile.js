import { Container, Row, Col } from "react-bootstrap";
// import { StudentDetails } from "../../API/StudentDetails";
import img from "../../images/p1.jpg";
import "./StudentProfile.css";
import StudentEditModalBtn from "./StudentModal";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const StudentProfile = () => {
  const { state } = useLocation();
  const { email } = state;
  const [_email, setEmail] = useState(email);
  const [studentDetails, setStudentDetails] = useState({});
  const handleUserData = async () => {
    const response = await fetch("http://localhost:3001/findstudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: _email,
      }),
    });
    const [data] = await response.json();
    setStudentDetails(data);
  };

  useEffect(() => {
    if (_email) {
      handleUserData();
    }
  }, [_email]);

  return (
    <div>
      <Row className="mt-5">
        <Col className="col-lg-3">
          <img src={img} alt="not supported" className="profile-pic" />
        </Col>
        <Col className="col-lg-9 ">
          {studentDetails.name}
          <Container>
            <StudentEditModalBtn studentDetails={studentDetails} email={_email}/>
            <Row className="name-age-row mt-4">
              <h5>Description</h5>
              <Col> Name : {studentDetails.name}</Col>
              <Col> Age : {studentDetails.age} </Col>
              <Col>Gender : {studentDetails.gender} </Col>
              <Col>Location : {studentDetails.location}</Col>
            </Row>
            <Row className="name-age-row mt-4 ">
              <h5>Primary Role</h5>
              <p>
                Currently, Looking for a role as {studentDetails.primaryRole}
              </p>
            </Row>
            <Row className="name-age-row mt-4 ">
              <h5>Skills</h5>

              {studentDetails.skills &&
                studentDetails.skills.map((skill) => {
                  return <span>{skill}</span>;
                })}
            </Row>
            <Row className="name-age-row mt-4 education">
              <h5>Education</h5>
              <ul className="education-ul">
                <li>University : {studentDetails.university}</li>
                <li>Degree : {studentDetails.degree}</li>
                <li>Major : {studentDetails.major}</li>
                <li>Start Year : {studentDetails.graduationYear}</li>
                <li>Description : {studentDetails.universityDescription}</li>
              </ul>
            </Row>
            <Row className="name-age-row mt-4">
              <h5>Experience</h5>
              <ul className="education-ul">
                <li>Company Name : {studentDetails.experience}</li>
              </ul>
            </Row>
            <Row className="name-age-row mt-4">
              <h5>Achievements</h5>
              <ol className="education-ul">{studentDetails.achievements}</ol>
            </Row>
            <Row className="name-age-row mt-4">
              <h5>Jobs Status</h5>
              {/* 
              {StudentDetails.jobsApplied.map((value) => {
                return (
                  <Row className="p-2">
                    <Col>Company : {value.companyName}</Col>
                    <Col>Title : {value.title}</Col>
                    <Col>Status : {value.status}</Col>
                    <hr />
                  </Row>
                );
              })} */}
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};
export default StudentProfile;
