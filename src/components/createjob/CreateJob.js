
import {useState} from "react"
const CreateJob = () => {
   
  const [jobTitle,setJobTitle ] = useState("")
  const [companyName,setCompanyName] = useState("")
  const [jobType, setJobType] = useState("")
  const [jobLocation, setJobLocation] = useState("")
  const [jobDescription, setJobDescription ] = useState("")
  
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
          </select>
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
