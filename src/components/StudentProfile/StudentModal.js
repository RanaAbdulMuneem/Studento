import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const StudentEditModalBtn = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        className="btn-lg btn btn-success mt-2"
      >
        Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Change Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="container">
            <label class="form-label" for="customFile">
              Upload Profile Image
            </label>
            <input type="file" class="form-control" id="customFile" />
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Age</label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlSelect1">Gender</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option>M</option>
                <option>F</option>
              </select>
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">City</label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Country</label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Primary role</label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Eg. Software Engineer, Business Analyst"
              />
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

export default StudentEditModalBtn;
