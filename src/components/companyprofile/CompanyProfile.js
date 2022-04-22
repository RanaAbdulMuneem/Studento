import { Container, Row, Col } from "react-bootstrap";
import { companyDetails } from "../../API/CompanyDetails";
import logo from "../../images/logo.png";
import CompanyEditModalBtn from "./CompanyModal";
import "./companyProfile.css";

const CompanyProfile = () => {

  return (
    <Container>
      <Row className="mt-5">
        <Col className="col-lg-3">
          <img src={logo} alt="not supported" className="profile-pic" />
        </Col>
        <Col className="col-lg-9 ">
          <Container>
            <CompanyEditModalBtn/>
            <button className="btn btn-primary btn-lg">Create a Job</button>
            <Row className="name-age-row mt-4">
            
              <Col> Name : <b>{companyDetails.name}</b></Col>
              <Col>{companyDetails.noOfEmployees} employees</Col>
              <Col>Founded in {companyDetails.foundingYear} </Col>
              <Col>
                {companyDetails.city}, {companyDetails.country}
              </Col>
            </Row>
            <Row className="name-age-row mt-4">
              <h5>Description</h5>
              <p>{companyDetails.description}</p>
            </Row>

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
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyProfile;
