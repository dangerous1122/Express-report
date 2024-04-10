import React from "react";
import Button from "../../../UI/Button";

function EmailOption(props) {
  return (
    <div className="flex justify-between xl:px-80 lg:px-64 md:px-32 mt-10 items-center my-10 sm:mx-0 mx-2">
      <p className="text-sm  tracking-tight text-center sm:text-xl font-semibold md:mr-6 mr-2">Do you want this report to be mailed to you?</p>
      <div className="flex">
      <Button onClick={props.onClick} text={'Yes'}/>
      </div>
    </div>
  );
}

export default EmailOption;
