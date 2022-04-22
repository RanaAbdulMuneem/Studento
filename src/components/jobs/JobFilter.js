import './JobFilter.css'

import {Component, useState} from 'react'
import {Accordion} from 'react-bootstrap'
import {CheckBoxControls} from '../utils/CheckBoxControls'

class Salary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({value: Number(event.target.value)})
    }
    
    render() {
        return (
            <div>
                <label for="min_pay" class="form-label filter-header">Minimum Pay</label>
                <input 
                    type="range"
                    class="form-range" 
                    min="0" max="100000" 
                    id="min_pay"
                    onChange={this.handleChange}
                    step="1000"
                />
                <p class="pay">
                    {"PKR " + this.state.value.toLocaleString("en-US")}
                </p>
            </div>
        )
    }
}



const RadioControls = (props) => {
    return (
        <div class="form-check">
            <input class="form-check-input" type="radio" name={props.name} id={props.label} />
            <label class="form-check-label" for={props.label}>
                {props.label}
            </label>
        </div>
    )
}

export const JobFilter = () => {
    const education = [
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
    const skills = [
        "Graphic Design",
        "Python",
        "React",
        "Photography",
        "Communication"
    ]
    return (
        <div id="JobFilter" class="col p-3 component-shadow mb-5">
            <h3 class="mb-5">Filter by:</h3>
            <Salary />
            <hr />
            <Accordion flush alwaysOpen defaultActiveKey={["0", "1", "2", "3"]}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Education Level</Accordion.Header>
                    <Accordion.Body>
                    {education.map(level => <RadioControls name="radio-education" label={level} />)}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Job Type</Accordion.Header>
                    <Accordion.Body>
                        <CheckBoxControls dynamic={false} values={types} maxNumber={5}/>
                    {/* {types.map(type => <CheckControls label={type} />)}    */}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Domain</Accordion.Header>
                    <Accordion.Body>
                        <CheckBoxControls dynamic={true} values={domains} maxNumber={5}/>
                        {/* <DynamicCheckControls checks={domains} /> */}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Skills</Accordion.Header>
                    <Accordion.Body>
                        <CheckBoxControls dynamic={true} values={skills} maxNumber={5}/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
