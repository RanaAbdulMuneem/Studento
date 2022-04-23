import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import LogIn from "../forms/LogIn";
import img from "../../images/board-work.png";
import bg from "../../images/bg-5.svg";

const CompanyLogin = () => {
  return (
    <div className="p-5">
      {/* <LogInForm2></LogInForm2> */}
      <LogIn header="Company Login" background={bg} image={img} type="company"></LogIn>
    </div>
  );
};

export default CompanyLogin;
