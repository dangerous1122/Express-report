import React, { useState } from "react";
import Button from "../../../UI/Button";

function EmailOption(props) {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

  };

  return (
    <>
      <p className="text-gray-400 text-start">Check the box below</p>
      <div class=" lg:ml-0 mx-7 flex items-center  border-gray-200 rounded dark:border-gray-700">
        <input
          id="bordered-checkbox-1"
          type="checkbox"
          value=""
          name="bordered-checkbox"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded    focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label
          for="bordered-checkbox-1"
          class="w-full py-4 ms-2 text-sm font-medium  text-gray-900 dark:text-gray-300"
        >
          Email the Expense report + all my receipts compiled in one PDF file
        </label>
      </div>

      <button className="mx-auto bg-gray-700 text-white my-10 px-5 py-2.5 rounded-sm hover:bg-gray-600"     onClick={() => props.onClick(isChecked)}
>


        Generate Report{" "}
      </button>
    </>

    // <div className="flex justify-between xl:px-80 lg:px-64 md:px-32 mt-10 items-center my-10 sm:mx-0 mx-6">
    //   <p className="text-sm  tracking-tight text-center sm:text-xl font-semibold md:mr-6 mr-2">Do you want this report to be mailed to you?</p>
    //   <div className="flex">
    //   <Button onClick={props.onClick} text={'Yes'}/>
    //   </div>
    // </div>
  );
}

export default EmailOption;
