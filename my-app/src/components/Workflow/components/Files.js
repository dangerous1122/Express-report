import React from "react";

function Files(props) {
  const blobUrl = props.urls ? URL.createObjectURL(props.urls) : "";

  return (
    <div className="grid grid-cols-1 my-5">
      {props.urls && (
        <div className="">
          <iframe
            src={blobUrl}
            className="md:w-96 md:border-0 border-4"
            style={{ width: "300px", height: "400px" }}
            title={`Expense Report `}
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Files;
