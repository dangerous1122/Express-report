import React, { useEffect, useState } from "react";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import FileUpload from "./components/FileUpload";
import { getData } from "../../utils/Slices/dataSlice";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Loading from "../../UI/Loading.js";
import "../Workflow/components/fileUpload.css";
import { payment } from "../../utils/Slices/paymentSlice";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

import img from "../../assets/premium.png";
function Workflow() {
  const [reportData, setReportData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isNext, setIsNext] = useState(false);
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState("a");
  const [check, setCheck] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const onNext = (val) => {
    setIsNext(val);
  };

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
    if (reportData) {
      setIsLoading(() => false);
    }
  }, [reportData]);

  if (
    reportData &&
    reportData.subscription.hass === false &&
    reportData.freeTrial === false
  ) {
    return (
      <>
        <div className="flex justify-center flex-col">
          <p className="lg:text-3xl text-xl font-bold tracking-tight mx-auto mt-48 mb-5">
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
      <div className=" relative justify-center flex-col bg-slate-50 overflow-y-hidden min-h-screen scrollbar-hide">
        <div
          className={`bg-white absolute top-0 left-0 w-full h-full z-10 delay-75  ${
            isLoading ? "fade-in visible" : "fade-in"
          }`}
        ></div>
        <Loading load={isLoading} />{" "}
        {reportData && reportData.subscription.hass && (
          <span className="absolute md:text-lg text-sm font-semibold right-3 top-3">
            Reports left:{" "}
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
            processing === "a" ? "text-gray-600" : ""
          }  sm:text-4xl mt-24  text-center`}
          style={{ color: "#ca0a66" }}
        >
          {processing === "a" &&
            "Upload your receipts (png,jpeg,jpg images or pdf accepted)"}
          {processing === "b" && ""}
          {processing === "d" && "All ready to go"}
          {processing === "e" && "Processing your receipt..."}
          {processing === "c" && "Processing complete...see your report below"}
        </h2>
        {processing === "e" && (
          <p className="text-gray-800 text-center font-bold mt-5">Do not Refresh or Exit the page</p>
        )}
        <div for="" className="">
          <div class="flex flex-col mx-auto items-center justify-center lg:pt-5 pt-1 lg:pb-6 pb-3">
            {processing === "b" || processing === "c" ? (
              ""
            ) : (
              <>
                {!isNext && (
                  <div className="">
                    <CloudArrowUpIcon className="w-20 h-20  mx-auto text-slate-600" />
                  </div>
                )}
              </>
            )}
            <FileUpload
              onProcess={(a) => setProcessing(a)}
              onCheck={() => {
                setCheck(() => !check);
              }}
              onNext={(val) => onNext(val)}
            />
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </div>
      </div>
    </>
  );
}

export default Workflow;
