import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SearchBars from "../../Workflow/components/SearchBars";

export default function Details(props) {
  const val = props.value;
  const [senderName, setSenderName] = useState("");
  const [senderSelected, setsenderSelected] = useState("");
  const [recSelected, setRecSelected] = useState("");
  const [add, setAdd] = useState(-1);
  const [senderCompany, setSenderCompany] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [recName, setRecName] = useState("");
  const [recCompany, setRecCompany] = useState("");
  const [recEmail, setRecEmail] = useState("");
  const [recPhone, setRecPhone] = useState("");

  const formSections = [
    {
      title: "Add Sender Details",
      fields: [
        {
          label: "Full name * ",
          name: "full-name",
          id: "full-name",
          value: val ? "John Doe" : senderName,
          type: "text",
          autoComplete: "given-name",
          onChange: (e) => {
            setSenderName(e.target.value);
          },
        },

        {
          label: "Company & Address",
          name: "company",
          id: "company",
          value: val ? "John Doe" : senderCompany,
          type: "text",
          autoComplete: "organization",
          onChange: (e) => {
            setSenderCompany(e.target.value);
          },
        },
        {
          label: "Email",
          name: "email",
          id: "email",
          value: val ? "johndoe@gmail.com" : senderEmail,
          type: "email",
          autoComplete: "email",
          onChange: (e) => {
            setSenderEmail(e.target.value);
          },
        },
        {
          label: "Phone number",
          name: "phone-number",
          id: "phone-number",
          value: val ? "12345678" : senderPhone,
          type: "tel",
          autoComplete: "tel",
          onChange: (e) => {
            setSenderPhone(e.target.value);
          },
        },
      ],
    },
    {
      title: "Add Receiver Details  ",
      fields: [
        {
          label: "Full name *",
          name: "full-name",
          value: val ? "abc" : recName,

          id: "full-name",
          type: "text",
          autoComplete: "given-name",
          onChange: (e) => {
            setRecName(e.target.value);
          },
        },

        {
          label: "Company & Address",
          name: "company",
          value: val ? "abc.inc" : recCompany,
          id: "company",
          type: "text",
          autoComplete: "organization",
          onChange: (e) => {
            setRecCompany(e.target.value);
          },
        },
        {
          label: "Email",
          name: "email",
          value: val ? "abc@gmail.com" : recEmail,
          id: "email",
          type: "email",
          autoComplete: "email",
          onChange: (e) => {
            setRecEmail(e.target.value);
          },
        },
        {
          label: "Phone number",
          name: "phone-number",
          value: val ? "123" : recPhone,
          id: "phone-number",
          type: "tel",
          autoComplete: "tel",
          onChange: (e) => {
            setRecPhone(e.target.value);
          },
        },
      ],
    },
  ];

  const senderSelectedHandler = (val) => {
    setsenderSelected(val);
    console.log("senderrr");
  };

  const receiverSelectedHandler = (val) => {
    setRecSelected(val);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      senderName: senderSelected ? senderSelected.name : senderName,
      senderCompany: senderSelected ? senderSelected.address : senderCompany,
      senderPhone: senderSelected ? senderSelected.contact : senderPhone,
      senderEmail: senderSelected ? senderSelected.email : senderEmail,
      recName: recSelected ? recSelected.name : recName,
      recCompany: recSelected ? recSelected.address : recCompany,
      recPhone: recSelected ? recSelected.contact : recPhone,
      recEmail: recSelected ? recSelected.email : senderEmail,
    };
    props.onSubmit(data);
  };

  return (
    <form onSubmit={submitHandler} className=" mt-0 my-5">
      <div className="grid lg:grid-cols-2">
        {formSections.map((section, index) => (
          <div
            key={index}
            className={`isolate ${
              val ? "bg-white" : "bg-slate-50"
            } md:px-20 px-0`}
          >
            {add < index && (
              <>
                <div className="mx-auto lg:max-w-2xl max-w-none text-center ">
                  <h2
                    className="font-bold tracking-tight text-gray-800 text-lg md:text-2xl"
                    style={{ color: "#ca0a66" }}
                  >
                    {section.title}
                  </h2>
                  <SearchBars
                    placeholder={`${
                      index === 0
                        ? "search from sender list"
                        : "search from receiver list"
                    }`}
                    onSelected={(s) => {
                      console.log("se: ", s);
                    }}
                    onSender={senderSelectedHandler}
                    onReceiver={receiverSelectedHandler}
                  />
                </div>
                {((!senderSelected && index === 0) ||
                  (!recSelected && index === 1)) && (
                  <div className="mx-auto md:mt-16 mt-4 max-w-xl sm:mt-8 lg:mb-0 mb-5">
                    <div className="grid grid-cols-1 gap-x-2 lg:gap-y-6 gap-y-3 md:grid-cols-2">
                      {section.fields.map((field) => (
                        <div key={field.id}>
                          <label
                            htmlFor={field.id}
                            className="block text-sm font-semibold leading-6 text-gray-900"
                          >
                            {field.label}
                          </label>
                          <div className="lg:mt-2.5 mt-0">
                            <input
                              type={field.type}
                              name={field.name}
                              value={field.value}
                              id={field.id}
                              onChange={field.onChange}
                              autoComplete={field.autoComplete}
                              className="block lg:w-full w-auto rounded-md lg:border border-2 px-3.5 py-2 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 focus:border-0 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            {add >= index && (
              <CheckCircleIcon className="h-12 w-12 mx-auto my-auto mt-20 text-white rounded-sm bg-green-400 px-3 py-2" />
            )}
            {val && (
              <>
                {add < index && (
                  <button
                    type="button"
                    className="px-3 py-2 xl:ml-48 lg:ml-32 md:ml-64 sm:ml-16    my-5 text-sm font-semibold   bg-blue-600 rounded-md text-white"
                    onClick={() => {
                      setAdd(index);
                    }}
                  >
                    Click to Add Details
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        {(!val || add >= 1) && (
          <div className="flex lg:mx-96 mx-auto">
            <button className="flex px-7 rounded-md bg-gray-800  py-2.5 text-center text-sm  text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-auto lg:mt-10 mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.06.025Z"
                  clipRule="evenodd"
                />
              </svg>
              Back
            </button>
            <button
              type="submit"
              className="flex px-5 rounded-md  bg-blue-600  py-2.5 text-center text-sm  text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-auto lg:mt-10 mt-5"
            >
              Continue{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 ml-1"
              >
                <path d="M3.288 4.818A1.5 1.5 0 0 0 1 6.095v7.81a1.5 1.5 0 0 0 2.288 1.276l6.323-3.905c.155-.096.285-.213.389-.344v2.973a1.5 1.5 0 0 0 2.288 1.276l6.323-3.905a1.5 1.5 0 0 0 0-2.552l-6.323-3.906A1.5 1.5 0 0 0 10 6.095v2.972a1.506 1.506 0 0 0-.389-.343L3.288 4.818Z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
