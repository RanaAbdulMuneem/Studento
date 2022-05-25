import { Container, Row, Col } from "react-bootstrap";
import { companyDetails } from "../../API/CompanyDetails";
import logo from "../../images/logo.png";
import CompanyEditModalBtn from "./CompanyModal";
import { Link } from "react-router-dom";
import "./companyProfile.css";
import ReviewInput from "./ReviewInput";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const CompanyProfile = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { name, email, noOfEmployees, description, yearFounded } = state;
  const [company, setCompany] = useState({
    name: name,
    email:email,
    noOfEmployees: noOfEmployees,
    description: description,
    yearFounded: yearFounded,

  });
  const handleCreateJob = () => {
    navigate("/createjob", {
      state: {
        company: company,
      },
    });
  }
  
  
  return (
    <Container>
      <Row className="mt-5">
        <Col className="col-lg-3">
          <img src={logo} alt="not supported" className="profile-pic" />
        </Col>
        <Col className="col-lg-9 ">
          <Container>
            <CompanyEditModalBtn
              company={company}
              setCompany={setCompany}
            />

            
              <button className="btn btn-primary btn-lg m-1"
              onClick={handleCreateJob}
              >
                Create a Job
              </button>
          
            <div>
              <Row className="name-age-row mt-4">
                <Col>
                  {" "}
                  Name : <b>{company.name}</b>
                </Col>
                <Col>{company.noOfEmployees} employees</Col>
                <Col>Founded in {company.yearFounded}</Col>
                <Col>
                  {companyDetails.city}, {companyDetails.country}
                </Col>
              </Row>
              <Row className="name-age-row mt-4">
                <h5>Description</h5>
                <p>{company.description}</p>
              </Row>
            </div>

            <Row className="name-age-row mt-4 ">
              <h5>Jobs</h5>

              {companyDetails.jobs.map((job) => {
                return (
                  <div>
                    <hr />
                    <h5>{job.title}</h5>
                    <p> Job Type : {job.jobType} </p>
                    <p> Job Location : {job.jobLocation} </p>
                    <h6>Description</h6>
                    <p>{job.description} </p>
                    <button className="btn btn-secondary">Apply now</button>
                  </div>
                );
              })}
            </Row>
            <Row className="name-age-row mt-4 education">
              <h5>Reviews</h5>

              {companyDetails.reviews.map((review) => {
                return (
                  <div>
                    <hr />
                    <h6>{review.name}</h6>
                    <p className="review-rating">{review.rating} / 5 </p>
                    <p>{review.comment}</p>
                  </div>
                );
              })}
            </Row>
            <Row className="name-age-row mt-4 education">
              <h5>Want to add a review ?</h5>
              <ReviewInput />
            </Row>

            <Row className="name-age-row mt-4 education">
              <h5>Candidates</h5>
              <hr className="mt-4" />
              <Col className="d-flex align-items-center col-6">
                {" "}
                <h5>
                  Ahmad ali{" "}
                  <span>
                    <Link to="/studentprofile" className="view-profile">
                      View Profile
                    </Link>
                  </span>
                </h5>{" "}
              </Col>
              <Col className="col-6 d-flex justify-content-end">
                <div>
                  <button className="btn btn-success">Accept</button>
                  <button className="btn btn-danger">Reject</button>
                </div>
              </Col>
              <hr className="mt-4" />
              <Col className="d-flex align-items-center col-6">
                {" "}
                <h5>
                  Behzad Nabeel{" "}
                  <span>
                    <Link to="/studentprofile" className="view-profile">
                      View Profile
                    </Link>
                  </span>
                </h5>{" "}
              </Col>
              <Col className="col-6 d-flex justify-content-end">
                <div>
                  <button className="btn btn-success">Accept</button>
                  <button className="btn btn-danger">Reject</button>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyProfile;
