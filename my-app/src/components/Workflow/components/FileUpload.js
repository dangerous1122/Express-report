import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowUpCircleIcon,
  DocumentPlusIcon,
  XCircleIcon,
  ArrowUturnLeftIcon
} from "@heroicons/react/24/outline";
import "./fileUpload.css";
import ErrorModal from "../../../UI/ErrorModal.js";
import Details from "../../dashboard/components/sep-section";
import EmailOption from "../../dashboard/components/EmailOption";
import Loading from "../../../UI/Loading.js";
import fille from "../../../assets/file.png";
import Files from "./Files.js";

function FileUpload(props) {
  const [file, setFiles] = useState("");
  const [modalState, setModalState] = useState(false);
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

  const mailHandler = async (data) => {
    data.fileCount = file.length;
    const maxFileSize = 5 * 1024 * 1024;
    const token = localStorage.getItem("expr");

    setModalState(false);
    setOpenMail(true);
    setIsLoading(true);
    props.onProcess("b");

    let urls = [];
    for (const fil of file) {
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

        const fileBlob = new Blob([response.data], { type: "application/pdf" });
        setPdfUrls(fileBlob);
      } catch (err) {
      }
      props.onProcess("c");
      setFiles("");
      setIsLoading(false);
    }
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

      {file.length > 0 && (
        <div>
          <h3>Added Files:</h3>
          <ul className="grid md:grid-cols-5 grid-cols-3 gap-9 relative mt-5 mb-10">
            {file.map((fil, index) => (
              <li key={index}>
                <button
                  className="absolute ml-1   z-30"
                  onClick={() => removeItem(index)}
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
                <img
                  className="w-20 h-20 relative transition-transform"
                  src={fille}
                ></img>

                <small className="text-center block">{fil.name}</small>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Files urls={pdfUrls} />

      {!pdfUrls && (
        <>
          {!isLoading && (
            <>
              <label
                for="uploadFile1"
                className={`${
                  file
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-blue-700 hover:bg-blue-500"
                }   text-white text-sm px-4 py-2.5 outline-none rounded w-max cursor-pointer mx-auto flex `}
              >
                <>
                  {file ? (
                    <DocumentPlusIcon className="w-7 h-7 animate-bounce" />
                  ) : (
                    <ArrowUpCircleIcon className="w-5 mr-3" />
                  )}
                </>
                {file ? "" : "Upload"}
                <input
                  type="file"
                  multiple
                  id="uploadFile1"
                  class="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <p className="text-center font-medium md:text-lg text-sm md:mt-10 md:mx-36 mx-8  text-gray-900 py-2 px-4 bg-blue-100 rounded-md mt-5">
                <span className="md:text-lg text-sm text-black font-semibold ">Tip: </span>
                Please make sure to check and upload all the receipts you want
                on the report. Because, once the report is generated & if you
                want to add/delete an expense on the report then you will need
                to generate a new report.
              </p>
            </>
          )}
        </>
      )}

      {modalState && !error && <Details value={false} onSubmit={mailHandler} />}
      {!emailSent && !error && pdfUrls && <EmailOption onClick={sendMail} />}

      {emailSent && (
        <p className="text-xl  tracking-tight text-center sm:text-xl my-5 text-gray-700 font-semibold">
          <div className="text-gray-700 bg-green-300 ml-96 mr-96 px-3 py-2 rounded-sm mb-3">
            Done!
          </div>
          "We emailed you the detailed Expense Report + all your Receipts
          compiled in one file."
        </p>
      )}
      {pdfUrls && (
        <button
          onClick={() => navigate("/dashboard")}
          className="py-1 px-2 bg-blue-700 text-sm hover:bg-blue-500 text-white rounded-md flex"
        >
        <ArrowUturnLeftIcon className="w-4 h-4 mr-3 text-white"/> Back to Dashboard
        </button>
      )}
    </>
  );
}

export default FileUpload;
