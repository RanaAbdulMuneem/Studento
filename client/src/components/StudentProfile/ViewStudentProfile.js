import { Container, Row, Col } from "react-bootstrap";
import img from "../../images/p1.jpg";
import "./StudentProfile.css";
import StudentEditModalBtn from "./StudentModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ViewStudentProfile = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [student, setStudent] = useState({});
  const [loading1, setLoading1] = useState(true);

  const handleUserData = async () => {
    axios.get(`http://localhost:3001/students/profile?student=${id}`)
    .then((response) => {
      setStudent(response.data);
      setLoading1(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    if (!id){
      navigate('/');
      return;
    }
    else {
      handleUserData();
    }
  }, []);

  //-----------REPLACE WITH BOOTSTRAP LOADING-------------------
  if (loading1)
    return <h1>Loading ...</h1>
  return (
    <div>
      <Row className="mt-5">
        <Col className="col-lg-3 d-flex justify-content-center">
          <img src={`http://localhost:3001/images/${student.photo}`} alt="not supported" className="profile-pic" width="300px" />
        </Col>
        <Col className="col-lg-9 ">
          <h1 class="display-3 text-center mt-1">
            {student.name}
          </h1>
          <Container>
            <Row className="name-age-row mt-4 border-shadow">
              <h5>Description</h5>
              <Col> Name : {student.name}</Col>
              <Col> Age : {student.age} </Col>
              <Col>Gender : {student.gender} </Col>
              <Col>Location : {student.location}</Col>
            </Row>
            <Row className="name-age-row mt-4  border-shadow ">
              <h5>Primary Role</h5>
              <p>
                Currently, Looking for a role as {student.primaryRole}
              </p>
            </Row>
            <Row className="name-age-row mt-4   border-shadow">
              <h5>Skills</h5>

              <span>{student.skills}</span>
              {/* {student.skills &&
                student.skills.map((skill) => {
                  return <span>{skill}</span>;
                })} */}
            </Row>
            <Row className="name-age-row mt-4 education  border-shadow">
              <h5>Education</h5>
              <ul className="education-ul">
                <li>University : {student.university}</li>
                <li>Degree : {student.degree}</li>
                <li>Major : {student.major}</li>
                <li>Start Year : {student.graduationYear}</li>
                <li>Description : {student.universityDescription}</li>
              </ul>
            </Row>
            <Row className="name-age-row mt-4  border-shadow">
              <h5>Experience</h5>
              <ul className="education-ul">
                <li>Company Name : {student.experience}</li>
              </ul>
            </Row>
            <Row className="name-age-row mt-4 border-shadow">
              <h5>Achievements</h5>
              <ol className="education-ul">{student.achievements}</ol>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};
export default ViewStudentProfile;
