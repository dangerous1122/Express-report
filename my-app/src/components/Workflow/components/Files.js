import React from "react";

function Files(props) {
  console.log('props',props.urls)
  const blobUrl = props.urls ? URL.createObjectURL(props.urls) : "";

  return (
    <div className="grid grid-cols-1 my-5">
      {props.urls &&
          <div className="">
            <iframe
              src={blobUrl}
              className="md:w-96"
              style={{width:'', height: "400px" }}
              title={`Expense Report `}
            ></iframe>
          </div>
}
    </div>
  );
}

export default Files;
