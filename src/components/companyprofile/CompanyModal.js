import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const CompanyEditModalBtn = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <form className="container">
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
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Number of employees</label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Year founded</label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
              />
            </div>

            <div class="form-group mt-3">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
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
