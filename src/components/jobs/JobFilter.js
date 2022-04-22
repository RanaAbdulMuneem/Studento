import './JobFilter.css'

import {Component, useState} from 'react'
import {Accordion} from 'react-bootstrap'
import {AiOutlinePlusCircle} from 'react-icons/ai'

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

class CheckControls extends Component {
    constructor(props){
        super(props)
        let init_checkboxes = [];
        for (let i=0; i < Math.min(props.values.length, 5); i++){
            init_checkboxes.push(
                {value: props.values[i], checked: false}
            )
        }
        console.log("initial", init_checkboxes)
        this.state = {
            dynamic: props.dynamic,
            new_check: '',
            checkboxes: init_checkboxes
        }
        
        
        this.handleType = this.handleType.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleType(event) {
        this.setState({new_check: event.target.value})
    }

    handleSubmit(event) {
        let updatedCheckboxes = this.state.checkboxes
        updatedCheckboxes.unshift({value: this.state.new_check, checked: true})
        updatedCheckboxes = updatedCheckboxes.slice(0, 5)
        this.setState({
            checkboxes: updatedCheckboxes,
            new_check: ''
        })
        event.preventDefault()
    }

    handleChange(position) {
        let updatedCheckboxes = this.state.checkboxes
        updatedCheckboxes[position].checked = !updatedCheckboxes[position].checked
        console.log("updated", updatedCheckboxes)
        this.setState({checkboxes: updatedCheckboxes})
    }
    render() {
        return (
            <div>
                {this.state.checkboxes.map(
                    ({value, checked}, index) =>
                    (
                        <div class="form-check">
                            <input 
                            key={"chk-" + value}
                            class="form-check-input" 
                            type="checkbox" 
                            value={value} 
                            id={"chck-" + value} 
                            checked={checked}
                            onChange={() => this.handleChange(index)}
                             />
                            <label class="form-check-label" for={"chck-" + value}>
                                {value}
                            </label>
                        </div>
                    )
                )}
                {this.state.dynamic &&
                    <form onSubmit={this.handleSubmit} class="mt-2">
                        <div class="input-group pe-2 mb-3 align-items-center">
                            <input 
                            type="text" 
                            value={this.state.new_check} 
                            class="form-control form-for-checkbox" 
                            onChange={this.handleType}
                            placeholder="Other ..."
                            />
                            <AiOutlinePlusCircle class="plus-icon"/>
                        </div>
                    </form>
                }
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
                        <CheckControls dynamic={false} values={types} />
                    {/* {types.map(type => <CheckControls label={type} />)}    */}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Domain</Accordion.Header>
                    <Accordion.Body>
                        <CheckControls dynamic={true} values={domains} />
                        {/* <DynamicCheckControls checks={domains} /> */}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Skills</Accordion.Header>
                    <Accordion.Body>
                        <CheckControls dynamic={true} values={skills} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
