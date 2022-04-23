import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ForgetPassword = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a variant="success" onClick={handleShow} className="m-1">
        Forget Password
      </a>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <form className="container">
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Enter reset email</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForgetPassword;
