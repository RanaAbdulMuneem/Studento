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

import { timeAgo } from '../../utils/Parser'


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
    return (
        <div class="card job-card mb-2">
            {/* TITLE AND BUTTONS */}
            <div class="card-header">
                <div class="row">
                    <div class="col-auto">
                        <a href="#">
                            {
                                props.job.company.photo &&
                                <img src={`http://localhost:3001/images/${props.job.company.photo}`} class="img-thumbnail" width={60}></img>
                            }
                        </a>
                    </div>
                    <div class="col-auto me-auto">
                        <h5 class="card-title">{props.job.jobTitle}</h5>
                        <p>
                            <Link to={`/companies/${props.job.company._id}`}>{props.job.company.name}</Link>
                            <span>, {props.job.company.city}, </span>
                            <span>{props.job.company.country}</span>
                        </p>
                    </div>
                    <div class="col-auto ms-auto">
                        {
                            props.user && (
                                <>
                                    {
                                        
                                        
                                        props.applied ? (
                                            <button class="btn btn-danger me-3" onClick={() => props.handleApply(props.job._id, false)}>Unapply</button>
                                        ) : (
                                            <button class="btn btn-primary me-3" onClick={() => props.handleApply(props.job._id, true)}>Apply</button>
                                        )
                                    }
                                    <SaveButton saved={props.saved} setSaved={() => props.handleSave(props.job._id)}/>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* IF THERE IS TIME THEN IMPLEMENT */}
            {/* <Link to={"/job/" + props.job.id} class="card-body-link"> */}
            <Link to='/jobs' class="card-body-link">
                <div class="card-body">
                        {/* DETAILS */}
                        <div class="row">
                            <strong>{props.job.jobType}</strong>
                        </div>
                        <div class="row border-bottom">
                            <div class="col me-auto">
                                <p>{props.job.jobDescription}</p>
                            </div>
                            <div class="col-lg-2 col-sm-12">
                                <b>PKR {props.job.minPay}</b>
                            </div>
                        </div>
                        {/* SKILLS */}
                        <div class="row mt-2 px-3">
                            {props.job.skills.map(skill => <Skill skill={skill} key={props.job._id + skill}/>)}
                        </div>
                        {/* TOOLTIPS */}
                        <div class="row justify-content-end">
                            {/* EDUCATION */}
                            <div class="col-auto">
                                <OverlayTrigger
                                key={props.job._id + "-job-edu"}
                                placement='top'
                                overlay={
                                    <Tooltip id={props.job._id + "-job-edu"}>
                                        {props.job.education} level
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
                                key={props.job._id + "-job-loc"}
                                placement='top'
                                overlay={
                                    <Tooltip id={props.job._id + "-job-loc"}>
                                        {props.job.jobLocation}
                                    </Tooltip>
                                }
                                >
                                    <div style={{cursor: "pointer"}}>
                                        <BsFillGeoAltFill/>
                                    </div>
                                </OverlayTrigger>
                            </div>
                            {/* DAYS AGO */}
                            <div class="col-auto">
                                <OverlayTrigger
                                key={props.job._id + "-job-age"}
                                placement='top'
                                overlay={
                                    <Tooltip id={props.job._id + "-job-age"}>
                                        Posted {timeAgo(props.job.dateCreated)} ago
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
    const [loading, setLoading] = useState(true);


    const handleApply = async (job_id, status) => {
        await axios.post('http://localhost:3001/students/'+props.user.id+'/apply?job='+job_id, null,{
            headers: {'token': localStorage.getItem('token')}
        })
        .then((response) => {
            if (status)
                props.setAppliedList(oldList => [...oldList, job_id]);
            else {
                props.setAppliedList(oldList => oldList.filter(job => job !== job_id));
            }
        })
        .catch((error) => {
            console.log(error)
            alert('Error: Could not apply')
        })
    }
    const handleSave = async (job_id) => {
        await axios.post('http://localhost:3001/students/'+props.user.id+'/save?job='+job_id, null,{
            headers: {'token': localStorage.getItem('token')}
        })
        .then((response) => {
            if (response.data.saved)
                props.setSavedList(oldList => [...oldList, job_id]);
            else
                props.setSavedList(oldList => oldList.filter(job => job !== job_id));
        })
        .catch((error) => {
            console.log(error)
            alert('Error: Could not save')
        })
    }


    const handleLoadJobs = async () => {
        let parameters = {...props.filters, page: page};
        axios.get("http://localhost:3001/jobs",{params: parameters})
        .then((response) => {
            setResults(response.data.results);
            setPageCount(response.data.pageCount)
            setJoblist(response.data.jobs);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        handleLoadJobs();
    }, [page, props.filters])

    useEffect(() => {

    }, [props.appliedList])

    if (loading) {
        return <h1>Loading ...</h1>
    }
    return (
        <div id="JobListing" class="container-fluid px-0">
            <JobNavigation page={page} setPage={setPage} pageCount={pageCount} results={results} />
            {joblist.map(job => 
            <JobCard 
            job={job} 
            key={job._id} 
            user={props.user && true}
            applied={props.appliedList.includes(job._id)}
            saved={props.savedList.includes(job._id)}
            handleApply={handleApply}
            handleSave={handleSave}
            />)}
        </div>
    )
}