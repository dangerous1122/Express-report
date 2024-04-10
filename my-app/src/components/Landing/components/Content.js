import React from "react";
import s1 from "../../../assets/s1.PNG";
import s2 from "../../../assets/s2.PNG";
import s3 from "../../../assets/s3.PNG";
import s4 from "../../../assets/s4.PNG";

function Content() {
  const steps = [
    {
      title: "Step 1-Upload",
      description: "You simply upload all your receipts in image or pdf .",
      img: s1,
    },
    {
      title: "Step 2-Scan & Sort",
      description:
        "Our AI will read the info from receipts & start sorting it.",
      img: s2,
    },
    {
      title: "Step 3-Extract",
      action: "Extract",
      description:
        "AI will only extract the relevant info and prepare a full expense report organized with date, amount, type of expense.",
      img: s3,
    },
    {
      title: "Step 4-Report ready",
      action: "Extract",
      description:
        "You can download report or have it directly emailed to you.",
      img: s4,
    },
    // Add more steps here as needed
  ];

  return (
    <div style={{ backgroundColor: "#f8f8f8" }}>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 xl:gap-20 py-20 px-16 gap-10 ">
        {steps.map((step, index) => (
          <div className="">
            <div
              key={index}
              className="bg-white text-slate-950 p-4 text-center text-lg font-semibold rounded-lg shadow-lg mx-auto h-40"
            >
              <img src={step.img} className="w-32 mx-auto" />
             
            </div>
            <h2 className=" text-2xl mt-3 text-center mb-2 font-semibold text-blue-700">{step.title}</h2>
            <p className="text-start text-lg">
            {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
