// YourDropTargetComponent.js
import React, { useState,useEffect } from "react";
import { useDrag } from "react-dnd";
import slip from "../../../assets/1.png";
import slip2 from "../../../assets/2.png";


const DragComponent = (props) => {
  console.log("props.id: ", props.id);
  const [img1show, setImg1Show] = useState(true);
  const [img2show, setImg2Show] = useState(true);
  const img1 = { img: slip, id: 1 };
  const img2 = { img: slip, id: 2 };
  useEffect(() => {
    console.log("props.id: ", props.id);
    if (props.id === 1) {
      setImg1Show(false);
    } else if (props.id === 2) {
      setImg2Show(false);
    }
  }, [props.id]); 

  const [{ is1Dragging }, dragRef1] = useDrag(() => ({
    type: "image", // A unique type for the item
    item: img1,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [{ is2Dragging }, dragRef2] = useDrag(() => ({
    type: "image", // A unique type for the item
    item: img2,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className="grid  grid-cols-2 gap-10 lg:py-9 xl:px-96 lg:px-56 md:px-32 md:my-1 mb-1 sm:px-1 sm:my-2 -my-5 px-10 xl:-mt-10 xl:mb-7">
      {img1show && (
        <div ref={dragRef1} className="h-32  md:h-40 sm:h-32  rounded-md">
          <img className="object-fit w-52 h-40 md:h-40 sm:h-32 xl:h-56" src={slip} />
        </div>
      )}
      {img2show && (
        <div ref={dragRef2} className="h-32 md:h-40 sm:h-32  rounded-md">
          <img className="object-fit w-52 h-40 sm:h-32 xl:h-56" src={slip2} />
        </div>
      )}
    </div>
  );
};

export default DragComponent;
