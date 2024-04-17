import React, { useEffect, useState } from "react";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import FileUpload from "./components/FileUpload";
import { getData } from "../../utils/Slices/dataSlice";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Loading from "../../UI/Loading.js";
import "../Workflow/components/fileUpload.css";
import { payment } from "../../utils/Slices/paymentSlice";

import img from "../../assets/premium.png";
function Workflow() {
  const [reportData, setReportData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState("a");
  const [check, setCheck] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe) {
      return;
    }

    try {
      const actionResult = await dispatch(
        payment(process.env.REACT_APP_STRIPE_KEY)
      );
      const { url } = actionResult.payload;

      if (url) {
        window.location.href = url;
      } else {
        console.log("No URL received for Stripe Checkout.");
      }
    } catch (error) {
      console.error("Payment submission error:", error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    dispatch(getData()).then((data) => {
      setReportData(data.payload.user);
    });
  }, [check, dispatch]);

 useEffect(() => {
  if(reportData){
    setIsLoading(()=>false);
  }
 
 }, [reportData])
 

  if (
    reportData &&
    reportData.subscription.hass === false &&
    reportData.freeTrial === false
  ) {

    return (
      <>
        <div className="flex justify-center flex-col">
          <p className="text-3xl font-bold tracking-tight mx-auto mt-48 mb-5">
            {"Your Plan has Expired :("}
          </p>
          <button
            className="py-2 px-3 text-white rounded-sm bg-blue-600 mx-auto"
            onClick={handleSubmit}
          >
            <span className="flex">
              Upgrade
              <img src={img} className="h-6 w-6 ml-2"></img>
            </span>
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex relative justify-center flex-col">
        <div
          className={`bg-white absolute top-0 left-0 w-full h-full z-10 delay-75 ${
            isLoading ? "fade-in visible" : "fade-in"
          }`}
        ></div>
        <Loading load={isLoading} />{" "}
        {reportData && (
          <span className="absolute md:text-lg text-sm font-semibold right-3 top-3">
            FileCount:{" "}
            <span
              className={`${
                reportData.subscription.gereratedReports > 4
                  ? "text-green-700"
                  : "text-red-600"
              }`}
            >
              {reportData.subscription.gereratedReports}
            </span>
          </span>
        )}
        <h2
          className={`md:text-3xl md:mx-0 mx-5 text-xl font-bold tracking-tight ${
            processing === "a" ? "text-gray-900" : "text-green-600"
          }  sm:text-4xl mt-10  text-center`}
        >
          {processing === "a" &&
            "Upload your receipts in images or pdf to get started"}
          {processing === "b" && "Processing your receipts.."}
          {processing === "c" && "Congrats..Your receipt has been generated"}
        </h2>
        <label for="" className="">
          <div class="flex flex-col mx-auto items-center justify-center pt-5 pb-6">
            {processing === "b" || processing === "c" ? (
              ""
            ) : (
              <DocumentArrowUpIcon className="w-20 h-20 mb-10" />
            )}
            <FileUpload
              onProcess={(a) => setProcessing(a)}
              onCheck={() => {
                setCheck(() => !check);
              }}
            />
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </div>
    </>
  );
}

export default Workflow;
