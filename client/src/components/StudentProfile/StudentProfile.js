import { Container, Row, Col } from "react-bootstrap";
import img from "../../images/p1.jpg";
import "./StudentProfile.css";
import StudentEditModalBtn from "./StudentModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));


  const [student, setStudent] = useState({});
  const [applications, setApplications] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const handleApplications = async () => {
    axios.get(`http://localhost:3001/students/${user.id}/applications`, {headers: {token: user.token}})
    .then((response) => {
      setApplications(response.data);
      setLoading2(false);
    })
    .catch((error) => {

    });
  };

  const handleUserData = async () => {
    axios.get(`http://localhost:3001/students/${user.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setStudent(response.data);
        setLoading1(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!user || user.type!=='student'){
      localStorage.clear('user');
      navigate('/studentlogin');
      return;
    }
    else {
      handleUserData();
      handleApplications();
    }
    // handleJobsData();
  }, []);
  //-----------REPLACE WITH BOOTSTRAP LOADING-------------------
  if (loading1 || loading2)
    return <h1>Loading ...</h1>
  return (<div>
    {student.verified ? (
        ""
      ) : (
        <div className="alert alert-warning" role="alert">
          {" "}
          Your account is unverified. Please visit your email to get activation
          link!
        </div>
      )}
    <div className="d-flex justify-content-center">

      <Row className="mt-5 w-75 d-flex justify-content-center">
        <Col className="col col-lg-5 col-md-12 col-sm-12">
        {
          student.photo &&
          <img src={`http://localhost:3001/images/${student.photo}`} alt="not supported" className="profile-pic" />
        }
        </Col>
        <Col className="col-lg-6 col-md-12 col-sm-12">
          <h2 class="display-3 pt-3">
          Hi {student.name},
          </h2>
          <StudentEditModalBtn studentDetails={student} setDetails={setStudent} email={student.email} user={user}/>
        </Col>
          <Container>
            <Row className="name-age-row mt-4 border-shadow" >
              <h5>Description</h5>
              <Col> Name : {student.name}</Col>
              <Col> Age : {student.age} </Col>
              <Col>Gender : {student.gender} </Col>
              <Col>Location : {student.location}</Col>
            </Row>
            <Row className="name-age-row mt-4 border-shadow">
              <h5>Primary Role</h5>
              <p>
                Currently, Looking for a role as {student.primaryRole}
              </p>
            </Row>
            <Row className="name-age-row mt-4 border-shadow">
              <h5>Skills</h5>

              <span>{student.skills}</span>
              {/* {student.skills &&
                student.skills.map((skill) => {
                  return <span>{skill}</span>;
                })} */}
            </Row>
            <Row className="name-age-row mt-4 education border-shadow">
              <h5>Education</h5>
              <ul className="education-ul">
                <li>University : {student.university}</li>
                <li>Degree : {student.degree}</li>
                <li>Major : {student.major}</li>
                <li>Start Year : {student.graduationYear}</li>
                <li>Description : {student.universityDescription}</li>
              </ul>
            </Row>
            <Row className="name-age-row mt-4 border-shadow">
              <h5>Experience</h5>
              <ul className="education-ul">
                <li>Company Name : {student.experience}</li>
              </ul>
            </Row>
            <Row className="name-age-row mt-4 border-shadow">
              <h5>Achievements</h5>
              <ol className="education-ul">{student.achievements}</ol>
            </Row>
            <Row className="name-age-row mt-4 border-shadow">
              <h5>Jobs Status</h5>
              {/* {jobDetails.jobTitle} */}
              {applications && applications.map((application) => {
                return (
                  <div className="row mt-4">
                    <div className="col col-4 h6"> {application.job.company.name}</div>
                    <div className="col col-4"> {application.job.jobTitle}</div>
                    <div className="col col-4 text-danger"> {application.status}</div>
                      <hr />
                    </div>
                  );
                })}
            </Row>
            <Row className="name-age-row mt-4 border-shadow">
              <h5>Saved Jobs</h5>
              {student.saved_jobs && student.saved_jobs.map((job) => {
                return (
                  <div className="row mt-4">
                    <div className="col col-4 h6"> {job.company.name}</div>
                    <div className="col col-4"> {job.jobTitle}</div>
                    <div className="col col-4"> {job.jobType}</div>
                    <hr />
                  </div>
                );
              })}
            </Row>
          </Container>
        
      </Row>
    </div>
   </div>

  );
};
export default StudentProfile;
