import React, { useEffect, useState } from "react";
import slip2 from "../../assets/pdf2.png";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import "./reports.css";

function Reports() {
  const [files, setFiles] = useState([]);
  const [filesPdf, setFilePdf] = useState();
  const [show, setShow] = useState(false);
  const [error,setError]=useState(false)
  useEffect(() => {
    const getReceipts = async () => {
      const token = localStorage.getItem("expr");
      try {
        const response = await axios.get("http://localhost:5000/get-files", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming response.data is an array of file information
        const filesInfo = response.data;

        const urls = filesInfo.map((file) => {
          // If fileData is the actual PDF binary data
          const blob = new Blob([file.fileData], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          return { ...file, url }; // Append the URL to the file information
        });

        console.log(urls); // Now 'urls' contains objects with file info and URLs
        setFiles(urls);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    getReceipts();
  }, []);

  const getFile = async (id) => {};

  const handleView = async (id) => {
    console.log(`View item ${id}`);
    const token = localStorage.getItem("expr");
    console.log(id);
    try {
      const response = await axios.get(
        `http://localhost:5000/get-files/${id}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming response.data is an array of file information
      console.log(response.data);
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setFilePdf(pdfUrl);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id) => {
    console.log(process.env.REACT_APP_API_URL);
    const token=localStorage.getItem("expr")

    try{
    const response=await axios.delete(
      `${process.env.REACT_APP_API_URL}/del-file/${id}`,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log(response)
    const updatedContacts = files.filter(
      (file) => file.fileId !== id
    );
    setFiles(updatedContacts);

    }catch(err){
      setError(true)
    }
  };

  return (
    <>
      {filesPdf && (
        <div className="overlay cursor-pointer" onClick={() => setFilePdf("")}>
          <div className="iframeContainer">
            <iframe
              src={filesPdf}
              style={{ width: "100%", height: "400px" }}
              title={`Expense Report`}
            ></iframe>
          </div>
        </div>
      )}
      <div
        style={{ backgroundColor: "#f8f8f8" }}
        className="h-auto min-h-full absolute w-full"
      >
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl py-5 text-center">
          Reports History
        </h1>
        <div className="grid lg:grid-cols-5 gap-10 p-20 md:grid-cols-3 sm:grid-cols-2 grid-cols-2">
          {files.map((item) => (
            <div key={item.fileId}>
              <button
                onClick={() => {
                  setShow(true);
                }}
              >
                <img
                  src={slip2}
                  className="md:h-36 md:w-36 object-fill cursor-pointer"
                  alt=""
                />
              </button>
              <div className="flex justify-between px-4 lg:ml-2 sm:ml-3 ml-1">
                <button
                  onClick={() => handleView(item.fileId)}
                  className="bg-gray-300 py-1 rounded-sm px-2 ml-2"
                >
                  <EyeIcon className="sm:h-5 sm:w-5 h-3 w-3" />
                </button>
                <button
                  onClick={() => handleDelete(item.fileId)}
                  className="bg-red-600 py-1 px-2 mr-16 rounded-sm xl:mr-24"
                >
                  <TrashIcon className="sm:h-5 sm:w-5 h-3 w-3 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Reports;
