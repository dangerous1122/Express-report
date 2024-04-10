import React from "react";
import Button from "../../../UI/Button";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

function Hero(props) {
  const light = props.color ? "" : "#101010";
  return (
    <div
      className={`${props.color ? "bg-white" : "bg-gray-800"}`}
      style={{ backgroundColor: light }}
    >
      <div className="relative isolate px-6  lg:px-8">
        <div
          className={`${
            props.color
              ? "max-w-4xl  sm:py-20 lg:py-16 py-10"
              : "max-w-full py-32 sm:py-20 lg:py-16 text-center"
          } `}
        >
          <div className="lg:px-20 px-0">
            <h1
              className={` lg:text-6xl font-bold tracking-tight text-3xl ${
                props.color ? "text-gray-900" : "text-gray-100 "
              } `}
            >
              {props.text}
            </h1>
            <p
              className={`mt-6 text-lg leading-8 ${
                props.color ? "text-gray-600" : "text-gray-300"
              } `}
            >
              {props.para}
            </p>
            <div
              className={`${
                props.color
                  ? "mt-10 flex items-center gap-x-6"
                  : "mt-10 flex items-center gap-x-6 justify-center"
              }`}
            >
              <Link to="/login">
                <Button />
              </Link>
              <Link
                to="/demo"
                className="text-md font-semibold leading-6 "
                style={{ color: "#ca0a66" }}
              >
                Try Demo <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
