import './JobListing.css'

import { Component, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import axios from 'axios'

import {
    BsChevronLeft, 
    BsChevronRight, 
    BsFillCalendarEventFill,
    BsFillGeoAltFill,
    BsFillBookFill
} from 'react-icons/bs'

import Logo from '../../images/fast_logo.jpg'
import { SaveButton } from '../utils/Buttons'
import { JobData } from '../../API/JobData'
import { Skill } from '../job/Skill'


const JobNavigation = (props) => {

    const handlePageChange = (page) => {
        props.setPage(page);
    }

    return (
        <div id="JobNavigation" class="container-fluid p-3 component-shadow mb-3 bg-white">
            <div class="row">
                <div class="col-auto me-auto">
                    <p><span class="bold">{props.results}</span> results found</p>
                </div>
                <div class="col-auto">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            
                            
                            {
                                props.page > 0 && (
                                    <>
                                        <li class="page-item" onClick={() => props.setPage(props.page-1)}>
                                            <p class="page-link" aria-label="Previous">
                                                <BsChevronLeft />
                                            </p>
                                        </li>
                                        <li class="page-item" onClick={() => props.setPage(props.page-1)}><p class="page-link">{props.page}</p></li>
                                    </>
                                )
                            }
                            <li class="page-item active"><p class="page-link">{props.page+1}</p></li>
                            {
                                props.page < props.pageCount-1 && (
                                    <>
                                        <li class="page-item" onClick={() => props.setPage(props.page+1)}><p class="page-link">{props.page+2}</p></li>
                                        <li class="page-item" onClick={() => props.setPage(props.page+1)}>
                                            <p class="page-link" aria-label="Next">
                                                <BsChevronRight />
                                            </p>
                                        </li>
                                    </>
                                )
                            }
                            
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}


const JobCard = (props) => {

    const [user, setUser] = useState(false);
    const [applied, setApplied] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleUserData = async () => {
        await axios.get('http://localhost:3001/jobs/'+props.details._id+'/isapplied',{
            headers: {'token': localStorage.getItem('token')}
        })
        .then((response) => {
            setApplied(response.data.applied);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleApply = async () => {
        console.log('SENDING APPLICATION', localStorage.getItem('token'));
        await axios.post('http://localhost:3001/jobs/'+props.details._id+'/apply', null,{
            headers: {'token': localStorage.getItem('token')}
        })
        .then((response) => {
            setApplied(true);
        })
        .catch((error) => {
            console.log(error)
            alert('Error: Could not apply')
        })
    }

    useEffect(() => {
        if (localStorage.getItem('token')){
            setUser(true);
            handleUserData();
        }
    }, [])

    return (
        <div class="card job-card mb-2">
            {/* TITLE AND BUTTONS */}
            <div class="card-header">
                <div class="row">
                    <div class="col-auto">
                        <a href="#">
                            <img src={Logo} class="img-thumbnail" width={60}></img>
                        </a>
                    </div>
                    <div class="col-auto me-auto">
                        <h5 class="card-title">{props.details.jobTitle}</h5>
                        <p>
                            <a href="#" class="card-link">{props.details.companyName}</a>
                            {/* <span>, {this.state.details.City}, </span>
                            <span>, {this.state.details.Country}, </span> */}
                        </p>
                    </div>
                    <div class="col-auto ms-auto">
                        {
                            user && (
                                <>
                                    {
                                        applied ? (
                                            <button class="btn btn-primary me-3 disabled">Applied</button>
                                        ) : (
                                            <button class="btn btn-primary me-3" onClick={handleApply}>Apply</button>
                                        )
                                    }
                                    <SaveButton saved={saved} setSaved={setSaved}/>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            <Link to={"/job/" + props.details.id} class="card-body-link">
                <div class="card-body">
                        {/* DETAILS */}
                        <div class="row border-bottom">
                            <div class="col me-auto">
                                <p>{props.details.jobDescription}</p>
                            </div>
                            <div class="col-lg-2 col-sm-12">
                                <b>PKR {props.details.minPay}</b>
                            </div>
                        </div>
                        {/* SKILLS */}
                        <div class="row mt-2 px-3">
                            {props.details.skills.map(skill => <Skill skill={skill} />)}
                        </div>
                        {/* TOOLTIPS */}
                        <div class="row justify-content-end">
                            {/* EDUCATION */}
                            <div class="col-auto">
                                <OverlayTrigger
                                key={props.details._id + "-job-edu"}
                                placement='top'
                                overlay={
                                    <Tooltip id={props.details._id + "-job-edu"}>
                                        {props.details.education} level
                                    </Tooltip>
                                }
                                >
                                    <div style={{cursor: "pointer"}}>
                                        <BsFillBookFill/>
                                    </div>
                                </OverlayTrigger>
                            </div>
                            {/* LOCATION */}
                            <div class="col-auto">
                                <OverlayTrigger
                                key={props.details._id + "-job-loc"}
                                placement='top'
                                overlay={
                                    <Tooltip id={props.details._id + "-job-loc"}>
                                        {props.details.jobLocation}
                                    </Tooltip>
                                }
                                >
                                    <div style={{cursor: "pointer"}}>
                                        <BsFillGeoAltFill/>
                                    </div>
                                </OverlayTrigger>
                            </div>
                            {/* AGE */}
                            <div class="col-auto">
                                <OverlayTrigger
                                key={props.details._id + "-job-age"}
                                placement='top'
                                overlay={
                                    <Tooltip id={props.details._id + "-job-age"}>
                                        Posted {props.details.dateCreated} ago
                                    </Tooltip>
                                }
                                >
                                    <div style={{cursor: "pointer"}}>
                                        <BsFillCalendarEventFill/>
                                    </div>
                                </OverlayTrigger>
                            </div>
                        </div>
                </div>
            </Link>

        </div>
    )
}

export const JobListing = (props) => {

    const [joblist, setJoblist] = useState([]);
    const [results, setResults] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    console.log('JOB LISTING', props.filters);
    useEffect(() => {
        let parameters = {...props.filters, page: page};
        axios.get("http://localhost:3001/jobs",{params: parameters})
        .then((response) => {
            setResults(response.data.results);
            setPageCount(response.data.pageCount)
            setJoblist(response.data.jobs);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [page, props.filters])

    return (
        <div id="JobListing" class="container-fluid px-0">
            <JobNavigation page={page} setPage={setPage} pageCount={pageCount} results={results} />
            {joblist.map(job => <JobCard details={job} key={job._id}/>)}
        </div>
    )
}