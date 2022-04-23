import { useState } from "react";



const ExperienceInput = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
      setShow(true)
  }
  return <>
    { show === true && <>
      <div class="form-group mt-3">
        <label for="exampleFormControlInput1">Company Name</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder=""
        />
      </div>
      <div class="form-group mt-3">
        <label for="exampleFormControlInput1">Title</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder=""
        />
      </div>
      <div class="form-group mt-3">
        <label for="exampleFormControlInput1">Major</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder=""
        />
      </div>
      <div class="form-group mt-3">
        <label for="exampleFormControlInput1">Starting month </label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder=""
        />
      </div>
      <div class="form-group mt-3">
        <label for="exampleFormControlInput1">Starting Year</label>
        <input
          type="number"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder=""
        />
      </div>
      <div class="form-group mt-3">
        <label for="exampleFormControlInput1">Ending month</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder=""
        />
      </div>
      <div class="form-group mt-3">
        <label for="exampleFormControlInput1">Ending Year</label>
        <input
          type="number"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder=""
        />
      </div>
      <div class="form-group mt-3">
        <label for="exampleFormControlInput1">Description</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder=""
        />
      </div>
    </> }
    { show === false && <button className="btn btn-primary mt-3" onClick={handleClick}>Experience + </button>}
  </>
};

export default ExperienceInput;
