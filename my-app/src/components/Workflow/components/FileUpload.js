import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowUpCircleIcon,
  DocumentPlusIcon,
  XCircleIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import "./fileUpload.css";
import ErrorModal from "../../../UI/ErrorModal.js";
import Details from "../../dashboard/components/sep-section";
import EmailOption from "../../dashboard/components/EmailOption";
import Loading from "../../../UI/Loading.js";
import fille from "../../../assets/file.png";
import Files from "./Files.js";
import SearchBars from "./SearchBars";

function FileUpload(props) {
  const [file, setFiles] = useState("");
  const [next, setNext] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [data, setData] = useState("");
  const [openMail, setOpenMail] = useState(false);
  const [fileLimit, setFileLimit] = useState(false);
  const [id, setId] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pdfUrls, setPdfUrls] = useState();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    props.onCheck();
    if (file.length === 24) {
      setFileLimit(true);
    }
    if (file.length < 25) {
      if (event.target.files && event.target.files.length > 0) {
        setFiles((prevFiles) => [
          ...prevFiles,
          ...Array.from(event.target.files), // Convert FileList to an array and spread into the new array
        ]);
        setOpenMail(false);
        setPdfUrls("");

        setTimeout(() => {
          setModalState(() => true);
        }, 1000);
      }
    }
  };

  const onAskMail = async (val) => {
    const maxFileSize = 5 * 1024 * 1024;
    const token = localStorage.getItem("expr");
    window.scrollTo(0, 0);

    setModalState(false);
    setOpenMail(false);
    setNext(false)

    setIsLoading(true);
    props.onProcess("e");

    let urls = [];
    for (const fil of file)  {
      if (file.size > maxFileSize) {
        alert(
          `File ${file.name} is too large. The maximum size allowed is 5MB.`
        );
        continue;
      }

      const formData = new FormData();
      formData.append("file", fil);
      formData.append("data", JSON.stringify(data));
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/doc-upload`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        // const fileBlob = new Blob([response.data], { type: "application/pdf" });
        urls.push(response.data);
      } catch (error) {
        setError(true);
        setFiles("");
        setIsLoading(false);
        setOpenMail(false);
        setPdfUrls("");
        props.onProcess("b");
        return;
      }
    }

    if (!error) {
      // setPdfUrls(urls);

      try {
        const d = JSON.stringify(data);
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/pdf/${d}`,
          urls,
          {
            responseType: "blob",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setId({ id: response.headers["x-file-id"] });
        const uri = { id: response.headers["x-file-id"] };
        console.log("uri", uri);

        const fileBlob = new Blob([response.data], { type: "application/pdf" });
        setPdfUrls(fileBlob);

        if (val === true) {
          console.log("here");
          console.log("urls: ", uri);
          const files = await blobUrlToFile(fileBlob, "yourPdfName.pdf");
          const formData = new FormData();
          formData.append("files", files);

          console.log("urls: ", uri);
          const token = localStorage.getItem("expr");
          // setOpenMail(false);

 
          setTimeout(async() => {
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/send-mail`,
              uri,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
          }, 16000);


      
          setEmailSent(true);
          setIsLoading(false);
          setOpenMail(false);
        }
      } catch (err) {
        console.log(err);
      }
      props.onProcess("c");
      setFiles("");
      setIsLoading(false);
    }
  };

  const mailHandler = async (data) => {
    data.fileCount = file.length;
    setOpenMail(true);
    props.onProcess("d");
    setData(data);
  };

  useEffect(() => {
    if (file.length === 0) {
      setFiles("");

      setModalState(false);
    }
  }, [pdfUrls, file]);

  const removeItem = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => index !== i));
  };

  async function blobUrlToFile(blobUrl, filename) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], filename, { type: "application/pdf" });
  }

  const sendMail = async () => {
    setIsLoading(true);
    console.log("idd: ", id);
    const files = await blobUrlToFile(pdfUrls, "yourPdfName.pdf");
    const formData = new FormData();
    formData.append("files", files);

    const token = localStorage.getItem("expr");
    // setOpenMail(false);

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/send-mail`,
      id,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    setEmailSent(true);
    setIsLoading(false);
    setOpenMail(false);
  };

  return (
    <>
      <ErrorModal
        state={error}
        onClose={() => {
          setError(false);
        }}
      />
      {fileLimit && (
        <div
          className=" absolute  top-10 p-4 mb-4 mx-20 text-sm text-white rounded-lg bg-red-600"
          role="alert"
        >
          <span className="font-medium">
            You can upload upto 25 files at one time!
          </span>
        </div>
      )}
      <div
        className={`bg-white absolute top-0 left-0 w-full h-full z-10 delay-75 ${
          isLoading ? "fade-in visible" : "fade-in"
        }`}
      ></div>
      <Loading load={isLoading} />

      {(!next && file.length) > 0 && (
        <div>
          <ul className="flex flex-wrap around md:gap-4 gap-4 relative mt-5 mb-10 md:mx-52 mx-10">
            {file.map((fil, index) => (
              <li key={index}>
                <button
                  className="absolute ml-1   z-30"
                  onClick={() => removeItem(index)}
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
                <img
                  className="md:w-20 md:h-20 h-16 w-16 relative transition-transform"
                  src={fille}
                ></img>

                <small className="text-center block">{fil.name}</small>
              </li>
            ))}
          </ul>
        </div>
      )}

      {emailSent && (
        <p className="md:text-xl text-sm mx-10  tracking-tight text-center flex justify-center flex-col sm:text-xl my-5 text-gray-700 font-semibold">
          <div className="text-gray-700 bg-green-300 mx-auto px-3 py-2 rounded-sm mb-3">
            Done!
          </div>
          "We emailed you the detailed Expense Report + all your Receipts
          compiled in one file."
        </p>
      )}

      <Files urls={pdfUrls} />

      {!next && !pdfUrls && (
        <>
          {!isLoading && (
            <>
              <label
                for="uploadFile1"
                className={`${
                  file
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-green-600 hover:bg-green-500"
                }   text-white text-sm px-4 py-2.5 outline-none rounded w-max cursor-pointer mx-auto flex `}
              >
                <>
                  {file ? (
                    <DocumentPlusIcon className="w-7 h-7 animate-bounce" />
                  ) : (
                    <ArrowUpCircleIcon className="w-5 mr-3" />
                  )}
                </>
                {file ? "" : "Add File"}
                <input
                  type="file"
                  multiple
                  id="uploadFile1"
                  class="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <p className="text-center font-medium md:text-lg text-sm md:mt-10 md:mx-44 mx-8  text-gray-900 py-2 px-4 bg-white rounded-sm mt-5">
                <span className="md:text-lg text-sm text-black font-semibold ">
                  Tip:{" "}
                </span>
                Please upload all the receipts you want on the report. Because,
                once the report is generated and you want to add/delete an
                expense on the report then you will need to generate a new
                report.
              </p>
              <button
                className="mx-auto flex bg-blue-700 text-white  px-8 py-2.5 rounded hover:bg-blue-600 my-5 text-sm"
                onClick={() => {
                  setNext(true);        
                    window.scrollTo(0, 0);
                  props.onNext(true);
                  props.onProcess("b");
                }}
              >
                Next
                <span className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d="M3.288 4.818A1.5 1.5 0 0 0 1 6.095v7.81a1.5 1.5 0 0 0 2.288 1.276l6.323-3.905c.155-.096.285-.213.389-.344v2.973a1.5 1.5 0 0 0 2.288 1.276l6.323-3.905a1.5 1.5 0 0 0 0-2.552l-6.323-3.906A1.5 1.5 0 0 0 10 6.095v2.972a1.506 1.506 0 0 0-.389-.343L3.288 4.818Z" />
                  </svg>
                </span>
              </button>
            </>
          )}
        </>
      )}


      {next && !error && !openMail && !emailSent && (
        <Details value={false} onSubmit={mailHandler} />
      )}
      {!emailSent && !error && openMail && <EmailOption onClick={onAskMail} />}
      {/* {!emailSent && !error && openMail && <EmailOption onClick={sendMail} />} */}

      {pdfUrls && (
        <button
          onClick={() => navigate("/dashboard")}
          className="mx-auto bg-gray-700 text-white my-10 px-5 py-2.5 rounded-sm hover:bg-gray-600 flex text-sm"
        >
          <ArrowUturnLeftIcon className="w-4 h-4 mr-3 text-white mt-0.5" /> Back
          to Dashboard
        </button>
      )}
    </>
  );
}

export default FileUpload;
