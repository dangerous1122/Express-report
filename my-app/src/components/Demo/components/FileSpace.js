import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { CheckCircleIcon } from "@heroicons/react/24/outline";


function FileSpace(props) {

  

  const [droppedFiles, setDroppedFiles] = useState([]);

  const [{ canDrop, isOver }, dropRef1] = useDrop(() => ({
    accept: "image",
    drop: (item, monitor) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const handleDrop = (item) => {
    setDroppedFiles((currentFiles) => [...currentFiles, item]);
  };

  useEffect(() => {
    props.onReceive(droppedFiles);
  }, [droppedFiles]);

  return (
    <div className="flex justify-center md:mb-1 md:mt-15 md:px-24 mt-16 ">
      {droppedFiles.length < 2 && (
        <>
        
        <div
          ref={dropRef1}
          className={`${
            isOver ? "bg-gray-800 text-gray-200" : "bg-gray-300 text-gray-700"
          }  rounded-sm px-10 py-5 text-lg font-medium shadow-md md:inline  `}
        >
          {isOver ? "Release to drop" : "Bring your files here"}
        </div>
        </>
      )}
      {droppedFiles.length === 2 && (
        <div className=" text-gray-700 rounded-sm px-10 py-5 text-lg font-medium shadow-md bg-green-600">
          <CheckCircleIcon className="h-10 w-10 text-white " />
        </div>
      )}
    </div>
  );
}

export default FileSpace;
