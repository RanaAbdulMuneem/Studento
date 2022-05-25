import './Job.css'

import { JobData } from "../../API/JobData"

import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import {BsFillCalendarEventFill} from 'react-icons/bs'

import { SaveButton } from "../utils/Buttons"
import { Skill } from './Skill'

export const Job = () => {
    const details = JobData[useParams().id]
    return (
        <div class="job container-fluid">
            <div class="row align-items-center py-3 mb-3 border-bottom border-dark">
                <div class="col me-auto">
                    <h1>{details.position}</h1>
                </div>
                <div class="col-auto">
                    <button class="btn btn-primary me-3">Apply</button>
                    <SaveButton />
                </div>
            </div>
            <div class="row">
                <div class="col-lg-9 info-panel">
                    <div class="row align-items-center py-1 mb-2">
                        <div class="col me-auto">
                            <h4>
                                <Link to={"/job/" + details.id}>
                                    <span>{details.company}</span>
                                </Link>
                                <span>, {details.city}, </span>
                                <span>{details.country}</span>
                            </h4>
                        </div>
                        <div class="col-auto">
                            <h6>
                                <div class="d-flex flex-row align-items-center">
                                    <BsFillCalendarEventFill class="me-1"/>
                                    Posted {details.age} ago
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
                                        <td>{details.pay}</td>
                                    </tr>
                                    <tr>
                                        <th>Location</th>
                                        <td>{details.location}</td>
                                    </tr>
                                    <tr>
                                        <th>Type</th>
                                        <td>{details.type}</td>
                                    </tr>
                                    <tr>
                                        <th>Domain</th>
                                        <td>{details.domain}</td>
                                    </tr>
                                    <tr>
                                        <th>Min. Education</th>
                                        <td>{details.education}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-lg-8">
                            <p>{details.description}</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3">
                    <h4>Skills</h4>
                    <div class="row px-2">
                        {details.skills.map(skill => <Skill skill={skill} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}