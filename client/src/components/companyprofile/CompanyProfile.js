import { Container, Row, Col } from "react-bootstrap";
// import { companyDetails } from "../../API/CompanyDetails";
import logo from "../../images/logo.png";
import CompanyEditModalBtn from "./CompanyModal";
import { Link } from "react-router-dom";
import "./companyProfile.css";
import ReviewInput from "./ReviewInput";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CompanyProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem("token");

  const [companyDetails, setCompanyDetails] = useState({});
  const [applications, setApplications] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const handleResolve = async (app_id, status) => {
    axios.patch(`http://localhost:3001/companies/${user.id}/resolve-application`,
    {application: app_id, status: status},
    {headers: {token: user.token}})
    .then((response) => {
      const index = applications.findIndex(app => app._id === app_id);
      let updatedApps = [...applications];
      updatedApps[index].status = status;
      setLoading2(true);
      setApplications(updatedApps);
    })
  }

  const handleApplications = async () => {
    axios.get(`http://localhost:3001/companies/${user.id}/applications`, {headers: {token: user.token}})
    .then((response) => {
      setApplications(response.data);
      setLoading2(false);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const handleUserData = async () => {
    axios.get(`http://localhost:3001/companies/${user.id}`, { headers: {token: user.token}})
    .then((response) => {
      setLoading1(true);
      setCompanyDetails(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    if (!user || user.type != 'company') {
      localStorage.clear('user');
      navigate('/');
      return;
    }
    handleUserData();
    handleApplications();
  }, []);

  useEffect(() => {
    setLoading1(false);
  }, [companyDetails]);
  useEffect(() => {
    setLoading2(false);
  }, [applications]);

  //-------------REPLACE WITH BOOTSTRAP LOADING ---------------------
  if (loading1 || loading2)
    return <h1>Loading ...</h1>;
  return (
    <Container>
      <Row className="mt-5">
        <Col className="col-lg-3">
          <img src={logo} alt="not supported" className="profile-pic" />
        </Col>
        <Col className="col-lg-9 ">
          <Container>
            {/* EDIT - ONLY FOR COMPANY */}
            <CompanyEditModalBtn
              company={companyDetails}
              email={companyDetails.email}
            />

            {/* CREATE A JOB - ONLY FOR COMPANY */}
            <a className="btn btn-primary btn-lg m-1" href="/createjob">
              Create a Job
            </a>

            <div>
              <Row className="name-age-row mt-4">
                <Col>
                  {" "}
                  Name : <b>{companyDetails.name}</b>
                </Col>
                <Col>{companyDetails.noOfEmployees} employees</Col>
                <Col>Founded in {companyDetails.yearFounded}</Col>
                <Col>
                  {/* {companyDetails.city}, {companyDetails.country} */}
                </Col>
              </Row>
              <Row className="name-age-row mt-4">
                <h5>Description</h5>
                <p>{companyDetails.description}</p>
              </Row>
            </div>

            {/* <Row className="name-age-row mt-4 education">
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
            </Row> */}

            {/* REVIEW - ONLY FOR STUDENTS */}
            {/* <Row className="name-age-row mt-4 education">
              <h5>Want to add a review ?</h5>
              <ReviewInput />
            </Row> */}

              {/* CANDIDATE - ONLY FOR COMPANY */}
            <Row className="name-age-row mt-4 education">
              <h5>Candidates</h5>
              {applications.map((application) => {
                return (
                  <div className="row mt-4">
                    
                    <div className="col col-2">
                      {application.job.jobTitle}
                    </div>

                    <div className="col col-2 h6">
                      {application.student.name}
                    </div>

                    <div className="col col-2">
                      <Link to={`/students/${application.student._id}`}>View Profile</Link>
                    </div>

                    <div className="col col-2 text-danger h6">
                      {application.status}
                    </div>

                    {application.status === 'Pending' && (
                      <>
                        
                        <div className="col col-2">
                          <button
                            onClick={() => handleResolve(application._id, 'Accepted')}
                            className="btn btn-success"
                          >
                            Accept
                          </button>
                        </div>
                        
                        <div className="col col-2">
                          {" "}
                          <button
                            onClick={() => handleResolve(application._id, 'Rejected')}
                            className="btn btn-danger"
                          >
                            Reject
                          </button>
                        </div>
                      </>
                    )}

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
