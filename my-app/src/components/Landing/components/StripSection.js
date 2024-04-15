import React from "react";
import "./strip.css";

function StripSection() {
  return (
    <div style={{ backgroundColor: "f8f8f8" }}>
      <h2
        className="md:text-4xl text-2xl py-20 font-bold tracking-tight text-gray-900 sm:text-4xl text-center"
        style={{ backgroundColor: "#f8f8f8" }}
      >
        Who can use this App
      </h2>
      <div class="slider-container my-8 rounded-md ">
        <div
          class="slide-text xl:text-3xl xl:-top-1 md:text-2xl md:top-3 font-semibold"
          style={{ color: "#ca0a66" }}
        >
          Pharmacists &#160; &#160; &#160; &#160; &#160; Electricians &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160;
          Regional Managers &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; Event Planners &#160; &#160;
          &#160; &#160; &#160; &#160; &#160; &#160; Sales Reps &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; Bookkeepers &#160; &#160;
          &#160; &#160; &#160; &#160; &#160; &#160; Contractors &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; Doctors &#160; &#160; &#160; &#160; &#160; &#160; &#160;
          Accountants &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; Travel Nurses  &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; Travel Nurses &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; Travel Nurses
        </div>
      </div>
    </div>
  );
}

export default StripSection;
