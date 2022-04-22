import { Container, Row, Col } from "react-bootstrap";
import { StudentDetails } from "../../API/StudentDetails";
import img from "../../images/p1.jpg";
import "./StudentProfile.css";
import StudentEditModalBtn from "./StudentModal";
const StudentProfile = () => {
  return (
    <div>
      <Row className="mt-5">
        <Col className="col-lg-3">
          <img src={img} alt="not supported" className="profile-pic" />
        </Col>
        <Col className="col-lg-9 ">
          <Container>
            <StudentEditModalBtn />
            <Row className="name-age-row mt-4">
              <h5>Description</h5>
              <Col> Name : {StudentDetails.name}</Col>
              <Col> Age : {StudentDetails.age} </Col>
              <Col>Gender : {StudentDetails.gender} </Col>
              <Col>
                Location : {StudentDetails.city}, {StudentDetails.Country}
              </Col>
            </Row>
            <Row className="name-age-row mt-4 ">
              <h5>Primary Role</h5>
              <p>
                Currently, Looking for a role as {StudentDetails.primaryRole}
              </p>
            </Row>
            <Row className="name-age-row mt-4 ">
              <h5>Skills</h5>

              {StudentDetails.skills.map((skill) => {
                return <span>{skill}</span>;
              })}
            </Row>
            <Row className="name-age-row mt-4 education">
              <h5>Education</h5>
              <ul className="education-ul">
                <li>University : {StudentDetails.education[0].university}</li>
                <li>Degree : {StudentDetails.education[0].degree}</li>
                <li>Major : {StudentDetails.education[0].major}</li>
                <li>Start Year : {StudentDetails.education[0].startYear}</li>
                <li>End Year : {StudentDetails.education[0].endYear}</li>
                <li>Description : {StudentDetails.education[0].description}</li>
              </ul>
            </Row>
            <Row className="name-age-row mt-4">
              <h5>Experience</h5>
              <ul className="education-ul">
                <li>
                  Company Name : {StudentDetails.experience[0].companyName}
                </li>
                <li>Title : {StudentDetails.experience[0].title}</li>
                <li>Start Month : {StudentDetails.experience[0].startMonth}</li>
                <li>Start Year : {StudentDetails.experience[0].startYear}</li>
                <li>End Month : {StudentDetails.experience[0].endMonth}</li>
                <li>End Year : {StudentDetails.experience[0].endYear}</li>
                <li>
                  Description : {StudentDetails.experience[0].description}
                </li>
              </ul>
            </Row>
            <Row className="name-age-row mt-4">
              <h5>Achievements</h5>
              <ol className="education-ul">
                {StudentDetails.achievements.map((value) => {
                  return <li>{value}</li>;
                })}
              </ol>
            </Row>
            <Row className="name-age-row mt-4">
              <h5>Jobs Status</h5>

              {StudentDetails.jobsApplied.map((value) => {
                return (
                  <Row className="p-2">
                    <Col>Company : {value.companyName}</Col>
                    <Col>Title : {value.title}</Col>
                    <Col>Status : {value.status}</Col>
                    <hr />
                  </Row>
                );
              })}
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};
export default StudentProfile;
