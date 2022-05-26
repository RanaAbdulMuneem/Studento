import './Job.css'

import { JobData } from "../../API/JobData"

import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import {BsFillCalendarEventFill} from 'react-icons/bs'

import { SaveButton } from "../utils/Buttons"
import { Skill } from './Skill'

import axios from 'axios'

export const Job = () => {
    const [jobDetails, setJobDetails] = useState({});
    const [companyDetails, setCompanyDetails] = useState({})
    const id = useParams().id;

    useEffect(() => {
        axios.get('http://localhost:3001/jobs/'+id)
        .then((response) => {
            if (response.data) {
                setJobDetails(response.data);
                console.log(jobDetails);
            }
            else {
                console.log("Job doesnt exist");
            }
        })
        .catch((error) => {
            console.log(error);
        })
        axios.get('http://localhost:3001/companies/'+jobDetails.company)
        .then((response) => {
            if (response.data) {
                setCompanyDetails(response.data);
                console.log(companyDetails);
            }
            else {
                console.log("Company doesnt exist");
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])


    return (
        <div class="job container-fluid">
            <div class="row align-items-center py-3 mb-3 border-bottom border-dark">
                <div class="col me-auto">
                    <h1>{jobDetails.jobTitle}</h1>
                </div>
                {
                    localStorage.getItem("token") && (
                        <div class="col-auto">
                            <button class="btn btn-primary me-3">Apply</button>
                            <SaveButton />
                        </div>
                    )
                }
            </div>
            <div class="row">
                <div class="col-lg-9 info-panel">
                    <div class="row align-items-center py-1 mb-2">
                        <div class="col me-auto">
                            <h4>
                                <Link to={"/job/" + jobDetails._id}>
                                    <span>{companyDetails.name}</span>
                                </Link>
                                <span>, {companyDetails.city}, </span>
                                <span>{companyDetails.country}</span>
                            </h4>
                        </div>
                        <div class="col-auto">
                            <h6>
                                <div class="d-flex flex-row align-items-center">
                                    <BsFillCalendarEventFill class="me-1"/>
                                    Posted {jobDetails.dateCreated} ago
                                </div>
                            </h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <table class="table table-hover w-100">
                                <tbody>
                                    <tr>
                                        <th>Pay</th>
                                        <td>{jobDetails.minPay}</td>
                                    </tr>
                                    <tr>
                                        <th>Location</th>
                                        <td>{jobDetails.jobLocation}</td>
                                    </tr>
                                    <tr>
                                        <th>Type</th>
                                        <td>{jobDetails.jobType}</td>
                                    </tr>
                                    <tr>
                                        <th>Domain</th>
                                        <td>{jobDetails.jobDomain}</td>
                                    </tr>
                                    <tr>
                                        <th>Min. Education</th>
                                        <td>{jobDetails.education}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-lg-8">
                            <p>{jobDetails.jobDescription}</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <h4>Skills</h4>
                    {
                        jobDetails.skills && (
                            <div class="row px-2">
                                {jobDetails.skills.map(skill => <Skill skill={skill} key={skill}/>)}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}