import React, { useState } from "react";
import FileSpace from "./components/FileSpace";
import DragComponent from "./components/DragComponent";
import Modal from "../../UI/Dialog";
import Details from "../dashboard/components/sep-section";
import { HTML5Backend, touch } from "react-dnd-html5-backend";
import EmailOption from "../dashboard/components/EmailOption";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import { DndProvider, MultiBackend } from "react-dnd-multi-backend";
import { TouchTransition, MouseTransition } from "dnd-multi-backend";
import img from "../../assets/demo.pdf";

function Demo() {
  // const backend = isMobile ? TouchBackend : HTML5Backend;

  const HTML5toTouch = {
    backends: [
      {
        backend: HTML5Backend,
        transition: MouseTransition,
      },
      {
        backend: TouchBackend,
        preview: true,
        transition: TouchTransition,
      },
    ],
  };
  const [openModal, setOpenModal] = useState(false);
  const [openMail, setOpenMail] = useState(false);
  const [output, setOutput] = useState(false);
  const [id, setid] = useState(0);

  const infoModal = (arr) => {
    if (arr.length >= 1) {
      setid(arr[arr.length - 1].id);
    }
    setTimeout(() => {
      if (arr.length === 2) setOpenModal(true);
    }, 1000);
  };

  const mailHander = () => {
    setOpenModal(false);
    setOpenMail(true);
    setOutput(true);
  };

  return (
    <>
      <div className="flex justify-center  flex-col">
        <h1 className="text-4xl font-bold tracking-tight sm:text-4xl text-gray-900 mt-20 text-center">
          Welcome to Express Reports Demo{" "}
        </h1>
        <p className="text-gray-600 text-center text-lg font-semibold mb-12 rounded-md md:hidden inline">
          Swipe both receipts in the box and click 'Generate Report'
        </p>
        <p className="text-gray-600 text-center text-lg font-semibold mb-12 rounded-md md:inline hidden">
          Drag both receipts in the box and click 'Generate Report'
        </p>
        {!output && (
          <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <DragComponent id={id} />
            <FileSpace onReceive={infoModal} />
          </DndProvider>
        )}
        <div className="flex justify-around px-16 md:px-24 ">
          {output && (
            <iframe
              src={img}
              className="md:w-3/4 w-full   md:h-80 h-48 md:border-0 border-4 border-black"
            ></iframe>
          )}
          {/* {output && <iframe src={img} className="w-1/4  h-80"></iframe>} */}
        </div>
        {openModal && <div className="lg:w-full w-9/12 mx-auto mt-10"><Details value={true} onSubmit={mailHander} />        </div>
      }
       {output && <p className="text-center font-medium my-10 bg-green-300 py-2 px-3 mx-auto">You received an Email of your expense report and your receipts</p>}
        {/* {openMail && <EmailOption />} */}
      </div>
    </>
  );
}

export default Demo;
