import { Container, Row, Col } from "react-bootstrap";
import img from "../../images/p1.jpg";
import "./StudentProfile.css";
import StudentEditModalBtn from "./StudentModal";
import { useEffect, useState } from "react";
import axios from "axios";

const StudentProfile = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.removeItem("token");
    window.location.href = "/studentlogin";
  }

  const [studentDetails, setStudentDetails] = useState({});
  const [applications, setApplications] = useState([]);

  // const handleApplicants = () => {
  //   axios.get("http://localhost:3001/jobs/getallapplicants")
  //   .then((response) => {
  //     console.log("job details : ", response.data)
  //     setApplicants(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })

  // }

  // const [jobDetails, setJobDetails] = useState({});
  // const handleJobsData = () => {
  //   axios.get("http://localhost:3001/jobs/getjobdetails",{})
  //   .then((response) => {
  //     console.log("job details : ", response.data)
  //     setJobDetails(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })

  // }

  const handleApplications = async () => {
    fetch("http://localhost:3001/getallapplications")
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
      });
  };

  const handleUserData = async () => {
    axios
      .get("http://localhost:3001/students/profile", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setStudentDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleUserData();
    handleApplications();
    // handleJobsData();
  }, []);

  return (
    <div>
      <Row className="mt-5">
        <Col className="col-lg-3">
          <img src={img} alt="not supported" className="profile-pic" />
        </Col>
        <Col className="col-lg-9 ">
          {studentDetails.name}
          <Container>
            {/* <StudentEditModalBtn studentDetails={studentDetails} email={studentDetails.email}/> */}
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
              {/* {jobDetails.jobTitle} */}
              {applications.filter(application => application.student === studentDetails._id).map((applicantion) => {
                return (
                  <div className="row mt-4">
                    <div className="col col-4 h6"> {applicantion.companyName}</div>
                    <div className="col col-4"> {applicantion.jobTitle}</div>
                    <div className="col col-4 text-danger"> {applicantion.status}</div>

                    <hr />
                  </div>
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
