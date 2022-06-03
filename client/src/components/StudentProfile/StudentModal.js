import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ExperienceInput from "./ExperienceInput";
import axios from "axios";

const StudentEditModalBtn = (props) => {
  const [name, setName] = useState(props.studentDetails.name);
  const [skills, setSkills] = useState(props.studentDetails.skills);
  const [location, setLocation] = useState(props.studentDetails.location);
  const [age, setAge] = useState(props.studentDetails.age);
  const [primaryRole, setPrimaryRole] = useState(props.studentDetails.primaryRole);
  const [gender, setGender] = useState(props.studentDetails.gender);
  const [achievements, setAchievements] = useState(props.studentDetails.achievements);
  const [experience, setExperience] = useState(props.studentDetails.experience);
  const [university, setUniversity] = useState(props.studentDetails.university);
  const [degree, setDegree] = useState(props.studentDetails.degree);
  const [major, setMajor] = useState(props.studentDetails.major);
  const [graduationYear, setGraduationYear] = useState(props.studentDetails.graduationYear);
  const [universityDescription, setUniversityDescription] = useState(props.studentDetails.universityDescription);
  const [photo, handlePhoto] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (e) => {
    e.preventDefault();
    if (!name || !skills || !location || !age || !primaryRole || !university || !degree || !major || !graduationYear || !universityDescription || !experience || !achievements) {
       alert("please fill in all details")
       return;
    }
    let newDetails = {};
    name && (newDetails.name = name);
    age && (newDetails.age = parseInt(age));
    gender && (newDetails.gender = gender);
    location && (newDetails.location = location);
    primaryRole && (newDetails.primaryRole = primaryRole);
    university && (newDetails.university = university);
    universityDescription && (newDetails.universityDescription = universityDescription);
    degree && (newDetails.degree = degree);
    major && (newDetails.major = major);
    achievements && (newDetails.achievements = achievements);
    experience && (newDetails.experience = experience);
    skills && (newDetails.skills = skills);
    graduationYear && (newDetails.graduationYear = graduationYear);
    photo && ( newDetails.photo = photo);
    
    const formData = new FormData();
    for (const key in newDetails) {
      formData.append(key, newDetails[key]);
    }

    axios.patch(`http://localhost:3001/students/${props.studentDetails._id}/edit`, formData, {headers: {token: props.user.token}})
    .then((response) => {
      props.setDetails(response.data);
    })
    .catch((error) => {
      console.log(error);
      alert(error.response.data);
    })
  };

  useEffect(() => {
    setName(props.studentDetails.name);
    setAge(props.studentDetails.age);
    setGender(props.studentDetails.gender);
    setLocation(props.studentDetails.location);
    setSkills(props.studentDetails.skills);
    setPrimaryRole(props.studentDetails.primaryRole);
    setAchievements(props.studentDetails.achievements);
    setExperience(props.studentDetails.experience);
    setUniversity(props.studentDetails.university);
    setDegree(props.studentDetails.degree);
    setMajor(props.studentDetails.major);
    setGraduationYear(props.studentDetails.graduationYear);
    setUniversityDescription(props.studentDetails.universityDescription);
  }, [props.studentDetails]);
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
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="container" onSubmit={handleEdit}>
            <label class="form-label" for="customFile">
              Upload Profile Image
            </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="photo"
              class="form-control"
              onChange={(e) => handlePhoto(e.target.files[0])}
            />
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Name</label>
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
              <label for="exampleFormControlInput1">Age</label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="form-control"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">location</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Primary role</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={primaryRole}
                onChange={(e) => setPrimaryRole(e.target.value)}
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Unversity</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Degree</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Major</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Graduation Year</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">
                University Description
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                value={universityDescription}
                onChange={(e) => setUniversityDescription(e.target.value)}
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Achievements</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Skills</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleFormControlInput1">Experience</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder=""
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-warning mt-3">
              {" "}
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StudentEditModalBtn;
