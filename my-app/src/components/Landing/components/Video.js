import React from "react";
import video from "../../../assets/vid2.mp4";

function Video() {
  return (
    <div
      className="flex justify-center py-5"
      style={{ backgroundColor: "#ededed" }}
    >
      <div
        className=" lg:mx-40 mx-0 w-full h-1/2 bg-white text-center text-white rounded-md"
        style={{ height: "" }}
      >
        <div className="shadow-xl md:px-0 p-4">
          <video height="300" controls>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default Video;
