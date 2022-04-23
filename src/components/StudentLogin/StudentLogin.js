import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import LogIn from "../forms/LogIn";

import img from "../../images/work-mess.png";
import bg from "../../images/bg-1.svg";

import NewLogIn from "../forms/NewLogin";

const StudentLogin = () => {
  return (
    <div className="p-5">
      {/* <LogIn header="Student Login" background={bg} image={img} type="student"></LogIn> */}
      <NewLogIn header="Student Login" background={bg} image={img} type="student"></NewLogIn>
    </div>
  );
};

export default StudentLogin;
