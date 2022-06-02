import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

const CompanyEditModalBtn = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState(props.company.name);
  const [email, setEmail] = useState(props.company.email);
  const [noOfEmployees, setNoOfEmployees] = useState(
    props.company.noOfEmployees
  );
  const [description, setDescription] = useState(props.company.description);
  const [yearFounded, setYearFounded] = useState(props.company.yearFounded);
  const [location, setLocation] = useState(props.company.location);

  const handleEdit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/editcompanyprofile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        yearFounded: yearFounded,
        noOfEmployees: noOfEmployees,
        description: description,
        location: location,
      }),
    });

    alert("Profile updated");
  };
  useEffect(() => {
    setName(props.company.name);
    setEmail(props.company.email);
    setNoOfEmployees(props.company.noOfEmployees);
    setDescription(props.company.description);
    setYearFounded(props.company.yearFounded);
    setLocation(props.company.location);
  }, [props.company]);

  useEffect(() => {
    setName(props.company.name);
    setEmail(props.company.email);
    setNoOfEmployees(props.company.noOfEmployees);
    setDescription(props.company.description);
    setYearFounded(props.company.yearFounded);
  }, [props.company]);

  return (
    <>
      <Button variant="success" onClick={handleShow} className="m-1 btn-lg">
        Company Profile Edit
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Change Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="container" onSubmit={handleEdit}>
            <label class="form-label" for="customFile">
              Upload Company logo
            </label>
            <input type="file" class="form-control" id="customFile" />
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Company Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Number of employees</label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                value={noOfEmployees}
                onChange={(e) => setNoOfEmployees(e.target.value)}
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Year founded</label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                value={yearFounded}
                onChange={(e) => setYearFounded(e.target.value)}
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Location</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div class="form-group mt-3">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <button className="btn btn-warning mt-2" type="submit">
                Edit
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CompanyEditModalBtn;
