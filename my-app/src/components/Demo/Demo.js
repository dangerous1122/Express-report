import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import FileSpace from "./components/FileSpace";
import DragComponent from "./components/DragComponent";
import Modal from "../../UI/Dialog";
import Details from "../dashboard/components/sep-section";
import { HTML5Backend,touch } from "react-dnd-html5-backend";
import EmailOption from "../dashboard/components/EmailOption";
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import img from "../../assets/demo.pdf";

function Demo() {
  const backend = isMobile ? TouchBackend : HTML5Backend;
  const [openModal, setOpenModal] = useState(false);
  const [openMail, setOpenMail] = useState(false);
  const [output, setOutput] = useState(false);
  const [id, setid] = useState(0);

  const infoModal = (arr) => {
    console.log(arr);
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
        <h1 className="text-4xl font-bold tracking-tight sm:text-4xl text-gray-900 my-5 text-center">
          Welcome to Express Reports Demo{" "}
        </h1>
        <p className="text-gray-600 text-center text-lg font-semibold mb-12   rounded-md">
          Drag both receipts in the box and click 'Generate Report'
        </p>
        {!output && (
          <DndProvider backend={backend}>
            <DragComponent id={id} />
            <FileSpace onReceive={infoModal} />
          </DndProvider>
        )}
        <div className="flex justify-around px-24 ">
          {output && <iframe src={img} className="w-3/4  h-80"></iframe>}
          {/* {output && <iframe src={img} className="w-1/4  h-80"></iframe>} */}
        </div>
        {openModal && <Details value={true} onSubmit={mailHander} />}
        {openMail && <EmailOption />}
      </div>
    </>
  );
}

export default Demo;
