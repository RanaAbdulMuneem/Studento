import './JobFilter.css'

import {Component, useState, useEffect} from 'react'
import {Accordion} from 'react-bootstrap'
import {CheckBoxControls} from '../utils/CheckBoxControls'

const Salary = (props) => {

    const [value, setValue] = useState(0);
    useEffect(() => {
        props.setMinPay(value);
    }, [value])
    
    return (
        <div>
            <label htmlFor="min_pay" class="form-label filter-header">Minimum Pay</label>
            <input 
                type="range"
                class="form-range" 
                min="0" max="100000" 
                id="min_pay"
                value={value}
                onChange={e => setValue(e.target.value)}
                step="1000"
            />
            <p class="pay">
                {"PKR " + value.toLocaleString("en-US")}
            </p>
        </div>
    )
}


//OBSOLETE
// const RadioControls = (props) => {
//     return (
//         <div class="form-check">
//             <input class="form-check-input" type="radio" name={props.name} id={props.label} />
//             <label class="form-check-label" for={props.label}>
//                 {props.label}
//             </label>
//         </div>
//     )
// }

const EducationLevels = (props) => {
    //const [value, setValue] = useState(undefined);

    return (
        <div>
            {props.levels.map(
                level => 
                    <div class="form-check" key={level}>
                        <input class="form-check-input" type="radio" name="radio-education" value={level} id={level} onChange={e => props.setEducation(e.currentTarget.value)}/>
                        <label class="form-check-label" htmlFor={level}>
                            {level}
                        </label>
                    </div>                    
            )}
        </div>
    )
}

export const JobFilter = (props) => {
    const educationLevels = [
        "Highschool",
        "Freshman",
        "Sophomore",
        "Junior",
        "Senior"
    ]
    const types = [
        "Internship",
        "Part-time",
        "Freelance",
    ]
    const domains = [
        "Education",
        "E-commerce",
        "Healthcare",
        "Software Engineering",
        "Game Development",
        "Accounting",
        "Welfare"
    ]
    const skillSet = [
        "Graphic Design",
        "Python",
        "React",
        "Photography",
        "Communication"
    ]

    const [minPay, setMinPay] = useState(0);
    const [education, setEducation] = useState(undefined);
    const [type, setType] = useState([]);
    const [domain, setDomain] = useState([]);
    const [skills, setSkills] = useState([]);

    const handleApply = () => {
        props.setFilters({
            ...props.filters,
            minPay: minPay,
            education: education,
            type: type,
            domain: domain,
            skills: skills,
        })
    }

    return (
        <div id="JobFilter" class="col p-3 component-shadow mb-5">
            <div class="row px-0 mx-0">
                <div class="col me-auto"><h3 class="mb-5">Filter by:</h3></div>
                <div class="col-auto">
                    <button onClick={handleApply} class="btn btn-primary">Apply Filter</button>
                </div>
            </div>
            <Salary setMinPay={setMinPay}/>
            <hr />
            <Accordion flush alwaysOpen defaultActiveKey={["0", "1", "2", "3"]}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Education Level</Accordion.Header>
                    <Accordion.Body>
                    {/* {educationLevels.map(level => <RadioControls setEducation={setEducation} name="radio-education" label={level} />)} */}
                    <EducationLevels levels = {educationLevels} setEducation={setEducation} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Job Type</Accordion.Header>
                    <Accordion.Body>
                        <CheckBoxControls dynamic={false} values={types} maxNumber={5} setList={setType}/>
                    {/* {types.map(type => <CheckControls label={type} />)}    */}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Domain</Accordion.Header>
                    <Accordion.Body>
                        <CheckBoxControls dynamic={true} values={domains} maxNumber={5} setList={setDomain}/>
                        {/* <DynamicCheckControls checks={domains} /> */}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Skills</Accordion.Header>
                    <Accordion.Body>
                        <CheckBoxControls dynamic={true} values={skillSet} maxNumber={5} setList={setSkills}/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
