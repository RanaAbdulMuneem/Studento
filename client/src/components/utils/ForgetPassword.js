import "./ForgetPassword.css";

import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const ForgetPassword = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [studentEmail, setStudentEmail] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    alert(studentEmail);
    console.log(studentEmail);

    axios
      .post(`http://localhost:3001/students/password-reset`, {
        studentEmail,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
    //--------------------------------------
    // const response = await fetch("localhost:3001/students/password-reset", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     studentEmail,
    //   }),
    // });

    // const data = await response.json();

    // if (data.status === "ok") {
    //   console.log("hello");
    // }

    //   axios
    //     .post(`localhost:3001/students/password-reset`, {
    //       studentEmail,
    //     })
    //     .then((response) => {})
    //     .catch((error) => {
    //       alert(error.response.data);
    //       console.log("error berror");
    //     });
    //   console.log("password reset");
  };

  return (
    <div class="forgot-password">
      <a
        variant="success"
        onClick={handleShow}
        className="m-1"
        style={{ cursor: "pointer" }}
      >
        Forgot Password?
      </a>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton className="fp-header">
          <Modal.Title>Password Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="container" onSubmit={handlePasswordReset}>
            <div class="row mb-2">
              <div class="form-group mt-3">
                <label for="exampleFormControlInput1">
                  Enter recovery email
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder=""
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                />
              </div>
            </div>
            <div class="row">
              <div class="col-auto ms-auto">
                <button class="btn btn-secondary" onClick={handlePasswordReset}>
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
