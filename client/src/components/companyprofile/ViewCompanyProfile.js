import { Container, Row, Col } from "react-bootstrap";
// import { companyDetails } from "../../API/CompanyDetails";
import logo from "../../images/logo.png";
import CompanyEditModalBtn from "./CompanyModal";
import { Link, useParams } from "react-router-dom";
import "./companyProfile.css";
import ReviewInput from "./ReviewInput";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ViewCompanyProfile = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const token = localStorage.getItem("token");

  const [companyDetails, setCompanyDetails] = useState({});
  const [loading1, setLoading1] = useState(true);

  const handleUserData = async () => {
    axios.get(`http://localhost:3001/companies/profile?company=${id}`)
    .then((response) => {
      setLoading1(true);
      setCompanyDetails(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }
    handleUserData();
  }, []);

  useEffect(() => {
    setLoading1(false);
  }, [companyDetails]);

  //-------------REPLACE WITH BOOTSTRAP LOADING ---------------------
  if (loading1)
    return <h1>Loading ...</h1>;
  return (
    <Container>
      <Row className="mt-5">
        <Col className="col-lg-3">
          <img src={`http://localhost:3001/images/${companyDetails.photo}`} alt="not supported" className="profile-pic" width="300px"/>
        </Col>
        <Col className="col-lg-9 ">
          <Container>
            <div>
              <Row className="name-age-row mt-4 border-shadow">
                <Col>
                  {" "}
                  Name : <b>{companyDetails.name}</b>
                </Col>
                <Col>{companyDetails.noOfEmployees} employees</Col>
                <Col>Founded in {companyDetails.yearFounded}</Col>
                <Col>
                  {companyDetails.city}, {companyDetails.country}
                </Col>
              </Row>
              <Row className="name-age-row mt-4 border-shadow">
                <h5>Description</h5>
                <p>{companyDetails.description}</p>
              </Row>
            </div>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewCompanyProfile;
