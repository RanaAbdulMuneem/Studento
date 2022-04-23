import { useState } from "react";
import {CheckBoxControls}  from "../utils/CheckBoxControls"
const CreateJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobDomain, setDomain ] = useState("")
  const [minPay, setMinPay ] = useState("")
  const skills = [
    "Graphic Design",
    "Python",
    "React",
    "Photography",
    "Communication"
]

  return (
    <div>
      <h4 className="mt-5">Create Job</h4>
      <form>
        <div class="form-group mt-4">
          <label for="exampleFormControlInput1">Job Title</label>
          <input
            type="text"
            class="form-control mt-2"
            id="exampleFormControlInput1"
            placeholder="eg Software Engineer"
          />
        </div>
        <div class="form-group mt-4">
          <label for="exampleFormControlInput1">Company Name</label>
          <input
            type="text"
            class="form-control mt-2"
            id="exampleFormControlInput1"
            placeholder="abc.com"
          />
        </div>
        <div class="form-group mt-4">
          <label for="exampleFormControlSelect1">Job Type</label>
          <select class="form-control mt-2" id="exampleFormControlSelect1">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Freelance</option>
          </select>
        </div>
        <div class="form-group mt-4">
          <label for="exampleFormControlSelect1">Minimium Education</label>
          <select class="form-control mt-2" id="exampleFormControlSelect1">
            <option>Highschool</option>
            <option>Freshman</option>
            <option>Sophomore</option>
            <option>Junior</option>
            <option>Senior</option>
          </select>
        </div>
        <div class="form-group mt-4">
          <label for="exampleFormControlSelect1">Domain</label>
          <select class="form-control mt-2" id="exampleFormControlSelect1">
            <option>Education</option>
            <option>E-commerce</option>
            <option>Healthcare</option>
            <option>Software Engineering</option>
            <option>Game Development</option>
          </select>
        </div>
        <div class="form-group mt-4">
          <label for="exampleFormControlSelect1">Minimium Education</label>
          <select class="form-control mt-2" id="exampleFormControlSelect1">
            <option>Highschool</option>
            <option>Freshman</option>
            <option>Sophomore</option>
            <option>Junior</option>
            <option>Senior</option>
          </select>
        </div>
        <div class="form-group mt-4">
          <label for="exampleFormControlSelect1">Domain</label>
          <select class="form-control mt-2" id="exampleFormControlSelect1">
            <option>Education</option>
            <option>E-commerce</option>
            <option>Healthcare</option>
            <option>Software Engineering</option>
            <option>Game Development</option>
          </select>
        </div>
        
        <div class="form-group mt-4">
        <label for="exampleFormControlInput1">Skills</label>
        <CheckBoxControls dynamic={true} values={skills} maxNumber={5}/>
        </div>

        <div class="form-group mt-4">
          <label for="exampleFormControlInput1">Minimum Pay ( RS )</label>
          <input
            type="number"
            class="form-control mt-2"
            id="exampleFormControlInput1"
            placeholder="100,000"
          />
        </div>
        <div class="form-group mt-4">
          <label for="exampleFormControlSelect1">Job Location</label>
          <select class="form-control mt-2" id="exampleFormControlSelect1">
            <option>Remote</option>
            <option>Hybrid</option>
            <option>Onsite</option>
          </select>
        </div>
        <div class="form-group mt-4">
          <label for="exampleFormControlTextarea1">Job Description</label>
          <textarea
            class="form-control mt-2"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <button className="btn btn-success mt-3">Post Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
