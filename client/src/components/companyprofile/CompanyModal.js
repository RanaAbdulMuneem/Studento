import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

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
  // const [location, setLocation] = useState(props.company.location);
  const [city, setCity] = useState(props.company.city);
  const [country, setCountry] = useState(props.company.country);
  const [photo, handlePhoto] = useState('');

  const handleEdit = (e) => {
    e.preventDefault();

    if (!name || !email || !noOfEmployees || !description || !yearFounded || !city || !country) {
      alert("Please fill all the fields");
      return
    }
    const formData = new FormData();
    formData.append("photo", photo)
    formData.append("name", name);
    formData.append("email", email);
    formData.append("yearFounded", yearFounded);
    formData.append("noOfEmployees", noOfEmployees);
    formData.append("description", description);
    formData.append("city", city);
    formData.append("country", country);

    axios.patch(`http://localhost:3001/companies/${props.company._id}/edit`, formData, {headers: {token: props.user.token}})
    .then((response) => {
      props.setCompany(response.data);
    })
    .catch((error) => {
      console.log(error);
      alert(error.response.data);
    })
  };
  
  useEffect(() => {
    setName(props.company.name);
    setEmail(props.company.email);
    setNoOfEmployees(props.company.noOfEmployees);
    setDescription(props.company.description);
    setYearFounded(props.company.yearFounded);
    setCity(props.company.city);
    setCountry(props.company.country);
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
          <form
            className="container"
            onSubmit={handleEdit}
            encType="multipart/form-data"
          >
            <label class="form-label">
              Upload Company logo
            </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="photo"
              class="form-control"
              onChange={(e) => handlePhoto(e.target.files[0])}
            />
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
              <label for="exampleFormControlInput1">City</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Country</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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