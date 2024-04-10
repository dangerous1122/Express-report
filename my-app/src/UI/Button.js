import React from "react";

function Button(props) {
  return (
    <button className="rounded bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" onClick={props.onClick}>
      {props.text ? props.text : "Get Started for Free"}
    </button>
  );
}

export default Button;
