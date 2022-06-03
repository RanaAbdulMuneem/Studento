import { useState, useEffect } from "react";
import { CheckBoxControls } from "../utils/CheckBoxControls";
import {useLocation, useNavigate} from "react-router-dom"
import axios from "axios"


const CreateJob = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [jobTitle, setJobTitle] = useState("");
  const [education, setEducation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobDomain, setJobDomain] = useState("");
  const [minPay, setMinPay] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    if (!user || user.type != 'company') {
      localStorage.clear('user');
      navigate('/');
      return;
    }
  }, []);

  const handleSubmit = (e) => {
       e.preventDefault();
       console.log(jobTitle, education, jobType, jobLocation, jobDescription, jobDomain, minPay, skills, user.id);

       const job = {
         jobTitle,
         education,
         jobType,
         jobLocation,
         jobDescription,
         jobDomain,
         minPay,
         skills,
       };
       
       axios.post(`http://localhost:3001/companies/${user.id}/add-job`, job, {headers: {token: user.token}})
       .then((response) => {
         alert(response.data);
       })
       .catch((error) => {
         console.log(error);
         alert(error.response.data);
       })    
    alert("Job posted")
  }

  return (
    <div>
      <h4 className="mt-5">Create Job</h4>
      <form onSubmit={handleSubmit}>
        <div class="form-group mt-4">
          <label for="exampleFormControlInput1">Job Title</label>
          <input
            type="text"
            class="form-control mt-2"
            id="exampleFormControlInput1"
            placeholder="eg Software Engineer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>

        <div class="form-group mt-4">
          <label for="exampleFormControlSelect1">Job Type</label>
          <select
            class="form-control mt-2"
            id="exampleFormControlSelect1"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>
        <div class="form-group mt-4">
          <label for="exampleFormControlSelect1">Minimium Education</label>
          <select
            class="form-control mt-2"
            id="exampleFormControlSelect1"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Highschool">Highschool</option>
            <option value="Freshman">Freshman</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
        <div class="form-group mt-4">
          <label for="exampleFormControlSelect1">Domain</label>
          <select
            class="form-control mt-2"
            id="exampleFormControlSelect1"
            value={jobDomain}
            onChange={(e) => setJobDomain(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Education">Education</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Game Development">Game Development</option>
          </select>
        </div>

        <div class="form-group mt-4">
          <label for="exampleFormControlInput1">Skills ( separate skills by "," )</label>
          {/* <CheckBoxControls dynamic={true} values={skills} maxNumber={5}/> */}

          <input
            type="text"
            class="form-control mt-2"
            id="exampleFormControlInput1"
            placeholder="Python, Java, C++"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <div class="form-group mt-4">
          <label for="exampleFormControlInput1">Minimum Pay ( RS )</label>
          <input
            type="number"
            class="form-control mt-2"
            id="exampleFormControlInput1"
            placeholder="100000"
            value={minPay}
            onChange={(e) => setMinPay(e.target.value)}
          />
        </div>
        <div class="form-group mt-4">
          <label for="exampleFormControlSelect1">Job Location</label>
          <select
            class="form-control mt-2"
            id="exampleFormControlSelect1"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
          </select>
        </div>
        <div class="form-group mt-4">
          <label for="exampleFormControlTextarea1">Job Description</label>
          <textarea
            class="form-control mt-2"
            id="exampleFormControlTextarea1"
            rows="3"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
        </div>

        <button className="btn btn-success mt-3" type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
