import './JobListing.css'

import { Component} from 'react'
import { Link } from 'react-router-dom'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

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
    return (
        <div id="JobNavigation" class="container-fluid p-3 component-shadow mb-3 bg-white">
            <div class="row">
                <div class="col-auto me-auto">
                    <p><span class="bold">{props.results}</span> results found</p>
                </div>
                <div class="col-auto">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <BsChevronLeft />
                            </a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <BsChevronRight />
                            </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}


class JobCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            details: props.details
        }
        this.hitSave = this.hitSave.bind(this)
    }

    hitSave(event) {
        this.setState({saved: !this.state.saved})
    }
    
    render () {
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
                            <h5 class="card-title">{this.state.details.position}</h5>
                            <p>
                                <a href="#" class="card-link">{this.state.details.company}</a>
                                <span>, {this.state.details.city}, </span>
                                <span>{this.state.details.country}</span>
                            </p>
                        </div>
                        <div class="col-auto ms-auto">
                            <button class="btn btn-primary me-3">Apply</button>
                            <SaveButton />
                        </div>
                    </div>
                </div>
                <Link to={"/job/" + this.props.details.id} class="card-body-link">
                    <div class="card-body">
                            {/* DETAILS */}
                            <div class="row border-bottom">
                                <div class="col me-auto">
                                    <p>{this.state.details.description}</p>
                                </div>
                                <div class="col-lg-2 col-sm-12">
                                    <b>{this.state.details.pay}</b>
                                </div>
                            </div>
                            {/* SKILLS */}
                            <div class="row mt-2 px-3">
                                {this.state.details.skills.map(skill => <Skill skill={skill} />)}
                            </div>
                            {/* TOOLTIPS */}
                            <div class="row justify-content-end">
                                {/* EDUCATION */}
                                <div class="col-auto">
                                    <OverlayTrigger
                                    key={this.state.details.id + "-job-edu"}
                                    placement='top'
                                    overlay={
                                        <Tooltip id={this.state.details.id + "-job-edu"}>
                                            {this.state.details.education} level
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
                                    key={this.state.details.id + "-job-loc"}
                                    placement='top'
                                    overlay={
                                        <Tooltip id={this.state.details.id + "-job-loc"}>
                                            {this.state.details.location}
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
                                    key={this.state.details.id + "-job-age"}
                                    placement='top'
                                    overlay={
                                        <Tooltip id={this.state.details.id + "-job-age"}>
                                            Posted {this.state.details.age} ago
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
}

export const JobListing = () => {
    return (
        <div id="JobListing" class="container-fluid px-0">
            <JobNavigation results="54,241" />
            {JobData.map(job => <JobCard details={job} />)}
        </div>
    )
}