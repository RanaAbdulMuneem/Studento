import './ForgetPassword.css'

import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ForgetPassword = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div class="forgot-password">
      <a variant="success" onClick={handleShow} className="m-1" style={{cursor: "pointer"}}>
        Forgot Password?
      </a>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton className="fp-header">
          <Modal.Title>Password Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="container">
            <div class="row mb-2">
              <div class="form-group mt-3">
                  <label for="exampleFormControlInput1">Enter recovery email</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
              </div>
            </div>
            <div class="row">
              <div class="col-auto ms-auto">
                <button class="btn btn-secondary" onClick={handleClose}>
                  Send recovery email
                </button>
              </div>
            </div>

          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ForgetPassword;
