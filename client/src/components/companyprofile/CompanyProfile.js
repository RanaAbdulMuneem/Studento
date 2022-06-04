import { Container, Row, Col } from "react-bootstrap";
// import { companyDetails } from "../../API/CompanyDetails";

import CompanyEditModalBtn from "./CompanyModal";
import { Link } from "react-router-dom";
import "./companyProfile.css";
import ReviewInput from "./ReviewInput";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const CompanyProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [companyDetails, setCompanyDetails] = useState({});
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [pageCount, setPageCount] = useState(0);

  const page = useRef(0);

  const handleResolve = async (app_id, status) => {
    axios
      .patch(
        `http://localhost:3001/companies/${user.id}/resolve-application`,
        { application: app_id, status: status },
        { headers: { token: user.token } }
      )
      .then((response) => {
        const index = applications.findIndex((app) => app._id === app_id);
        let updatedApps = [...applications];
        updatedApps[index].status = status;

        setApplications(updatedApps);
        if (status === "Accepted")
          setStats({ ...stats, totalAccepted: stats.totalAccepted + 1 });
        else setStats({ ...stats, totalRejected: stats.totalRejected + 1 });
      });
  };

  const handleApplications = async () => {
    console.log(`retrieving page: ${page.current}`);
    axios
      .get(
        `http://localhost:3001/companies/${user.id}/applications?page=${page.current}`,
        { headers: { token: user.token } }
      )
      .then((response) => {
        setApplications((oldList) => [
          ...oldList,
          ...response.data.applications,
        ]);
        setPageCount(response.data.pageCount);
        console.log(pageCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStats = async () => {
    axios
      .get(`http://localhost:3001/companies/${user.id}/stats`, {
        headers: { token: user.token },
      })
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUserData = async () => {
    axios
      .get(`http://localhost:3001/companies/${user.id}`, {
        headers: { token: user.token },
      })
      .then((response) => {
        setCompanyDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("main use effect");
    if (!user || user.type != "company") {
      localStorage.clear("user");
      navigate("/");
      return;
    }
    //API CALLS
    handleUserData();
    handleStats();
    handleApplications();

    //SCROLL EVENT LISTENER
    const onScroll = function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        //console.log("you're at the bottom of the page");
        page.current++;
        handleApplications();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  //-------------REPLACE WITH BOOTSTRAP LOADING ---------------------
  if (!companyDetails) <h1>Loading ...</h1>;
  return (
    <Container>
      <Row className="mt-5">
        <Col className="col-lg-3 col-sm-12 d-flex ">
          <img
            src={`http://localhost:3001/images/${companyDetails.photo}`}
            alt="not supported"
            className="profile-pic "
            width="300px"
          />
        </Col>
        
        <Col className="col-lg-9  col-sm-12">
          <Container className="mt-2">
            
              {/* EDIT - ONLY FOR COMPANY */}

              <CompanyEditModalBtn
                company={companyDetails}
                setCompany={setCompanyDetails}
                email={companyDetails.email}
                user = {user}
              />

              {/* CREATE A JOB - ONLY FOR COMPANY */}
              <a className="btn btn-primary btn-lg m-1" href="/createjob">
                Create a Job
              </a>
           
            <div>
              <Row className="name-age-row mt-4 border-shadow">
                <Col>
                  {" "}
                  Name : <b>{companyDetails.name}</b>
                </Col>
                <Col>{companyDetails.noOfEmployees} employees</Col>
                <Col>Founded in {companyDetails.yearFounded}</Col>
                <Col>{companyDetails.city}, {companyDetails.country}</Col>
              </Row>
              <Row className="name-age-row mt-4 border-shadow">
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

            {stats ? (
              <div className="row mt-4 border-shadow p-4">
                <div className="col col-lg-4 col-sm-12">
                  <b>Total Applications : </b>
                  {stats.totalApplications}
                </div>
                <div className="col col-lg-4 col-sm-12">
                  <b>Total Rejections : </b>
                  {stats.totalRejected}
                </div>
                <div className="col col-lg-4">
                  <b>Total Accepted : </b>
                  {stats.totalAccepted}
                </div>
                <hr />
              </div>
            ) : (
              <h3>Loading ...</h3>
            )}
            {/* CANDIDATE - ONLY FOR COMPANY */}
            {applications ? (
              <Row className="name-age-row mt-4 education border-shadow">
                <h5>Candidates</h5>

                {applications.map((application) => {
                  return (
                    <div className="row mt-5">
                      <div className="col col-lg-2">
                        {application.job.jobTitle}
                      </div>

                      <div className="col col-lg-2 h6">
                        {application.student.name}
                      </div>

                      <div className="col col-lg-2">
                        <Link to={`/students/${application.student._id}`}>
                          View Profile
                        </Link>
                      </div>

                      <div className="col col-lg-2 text-danger h6">
                        {application.status}
                      </div>

                      {application.status === "Pending" && (
                        <>
                          <div className="col col-lg-2">
                            <button
                              onClick={() =>
                                handleResolve(application._id, "Accepted")
                              }
                              className="btn btn-success mb-3" 
                            >
                              Accept
                            </button>
                          </div>

                          <div className="col col-lg-2">
                            {" "}
                            <button
                              onClick={() =>
                                handleResolve(application._id, "Rejected")
                              }
                              className="btn btn-danger mb-3"
                            >
                              Reject
                            </button>
                          </div>
                          <hr/>
                        </>
                      )}
                    </div>
                  );
                })}
              </Row>
            ) : (
              <h3>Loading ...</h3>
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyProfile;
