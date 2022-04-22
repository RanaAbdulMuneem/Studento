import './Home.css'

import { Tooltip, OverlayTrigger } from "react-bootstrap"
import { Link } from "react-router-dom"
import {BsCheckAll} from 'react-icons/bs'

import FastLogo from '../../images/fast_logo.jpg'
import HomeImage from '../../images/home-image.jpg'

const CompanyCard = (props) => {
    const src = "./"
    console.log(props.company.logo)
    return (
            <Link to="/">
                <OverlayTrigger
                key={props.company.name + "-card"}
                placement='bottom'
                overlay={
                    <Tooltip id={props.company.name + "-card"}>
                        {props.company.name}
                    </Tooltip>
                }
                >
                    <img src={props.company.logo} class="company-card-logo"/>
                </OverlayTrigger>
            </Link>
    )
}


export const Home = () => {
    const top_companies = [
        {name: "FAST-NUCES", logo: FastLogo},
        {name: "FAST-NUCES", logo: FastLogo},
        {name: "FAST-NUCES", logo: FastLogo},
        {name: "FAST-NUCES", logo: FastLogo},
        {name: "FAST-NUCES", logo: FastLogo},
    ]
    return (
        <div id="home" class="container-fluid">
            {/* HOOK */}
            <div class="row my-5 px-2 py-5">
                <div class="col">
                    <h1 class="display-1 mb-5">Studento</h1>
                    <p class="info">Occaecat ut eiusmod pariatur sint culpa in culpa Lorem minim veniam dolore ad laborum deserunt.</p>
                    <p class="info">Cupidatat eiusmod laboris consectetur est magna.</p>
                    <div class="row mt-5">
                        <div class="col-auto">
                            <Link to="/studentlogin">
                                <button class="btn button-student w-100">For students</button>
                            </Link>    
                        </div>
                        <div class="col-auto">
                            <Link to="/companylogin">
                                <button class="btn button-company">For companies</button>
                            </Link>
                        </div>
                    </div>
                    <div class="row mt-5 align-items-center">
                        <div class="col-auto">
                            <h5>Just want to explore?</h5>
                        </div>
                        <div class="col">
                            <Link to="/jobs">
                                <button class="btn button-jobs">Checkout Jobs</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div class="col-auto align-self-center px-0">
                    <img src={HomeImage} class="img-fluid home-image"/>
                </div>
            </div>
            <hr />
            {/* TOP COMPANIES */}
            <div class="row mb-3">
                <h2 class="text-center">Top Companies</h2>
            </div>
            <div class="row justify-content-center mb-5">
                {top_companies.map(
                    company =>
                    (
                        <div class="col-auto">
                            <CompanyCard company={company} />        
                        </div>
                    )
                )}
            </div>
            <hr />
            {/* PROS */}
            <div class="row mb-3">
                <h2 class="text-center">Why Studento?</h2>
            </div>
            <div class="row mt-5 justify-content-center mb-5">
                <div class="col-lg-3 col-md-4 col-sm-6 px-2">
                    <div class="row bg-dark text-light mx-0" >
                        <div>
                            <span>
                                <BsCheckAll class="pros-icon me-3"/>
                            </span>
                            <span class="pros-header">
                                Lorem Ipsum
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <p class="pros-desc">Lorem ea consequat pariatur ut adipisicing et cillum aute cillum ea qui ad occaecat proident.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 px-2">
                    <div class="row bg-dark text-light mx-0" >
                        <div>
                            <span>
                                <BsCheckAll class="pros-icon me-3"/>
                            </span>
                            <span class="pros-header">
                                Lorem Ipsum
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <p class="pros-desc">Lorem ea consequat pariatur ut adipisicing et cillum aute cillum ea qui ad occaecat proident.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 px-2">
                    <div class="row bg-dark text-light mx-0" >
                        <div>
                            <span>
                                <BsCheckAll class="pros-icon me-3"/>
                            </span>
                            <span class="pros-header">
                                Lorem Ipsum
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <p class="pros-desc">Lorem ea consequat pariatur ut adipisicing et cillum aute cillum ea qui ad occaecat proident.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 px-2">
                    <div class="row bg-dark text-light mx-0" >
                        <div>
                            <span>
                                <BsCheckAll class="pros-icon me-3"/>
                            </span>
                            <span class="pros-header">
                                Lorem Ipsum
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <p class="pros-desc">Lorem ea consequat pariatur ut adipisicing et cillum aute cillum ea qui ad occaecat proident.</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}