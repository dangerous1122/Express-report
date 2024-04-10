import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Details(props) {
  const val = props.value;
  const [senderName, setSenderName] = useState("");
  const [add, setAdd] = useState(-1);
  const [senderCompany, setSenderCompany] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [recName, setRecName] = useState("");
  const [recCompany, setRecCompany] = useState("");
  const [recEmail, setRecEmail] = useState("");
  const [recPhone, setRecPhone] = useState("");
  console.log(add);

  const formSections = [
    {
      title: "Sender Details (Optional)",
      fields: [
        {
          label: "Full name",
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
          label: "Company & Sender",
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
      title: "Receiver Details (Optional) ",
      fields: [
        {
          label: "Full name",
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
          label: "Company & Sender",
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

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      senderName,
      senderCompany,
      senderPhone,
      senderEmail,
      recName,
      recCompany,
      recPhone,
      recEmail,
    };
    props.onSubmit(data);
  };

  return (
    <form onSubmit={submitHandler} className=" mt-9 my-5">
      <div className="grid lg:grid-cols-2">
        {formSections.map((section, index) => (
          <div key={index} className="isolate bg-white px-20">
            {add < index && (
              <>
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                    {section.title}
                  </h2>
                </div>
                <div className="mx-auto mt-16 max-w-xl sm:mt-8">
                  <div className="grid grid-cols-1 gap-x-2 gap-y-6 sm:grid-cols-2">
                    {section.fields.map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={field.id}
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          {field.label}
                        </label>
                        <div className="mt-2.5">
                          <input
                            type={field.type}
                            name={field.name}
                            value={field.value}
                            id={field.id}
                            onChange={field.onChange}
                            autoComplete={field.autoComplete}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
          <button
            type="submit"
            className="block px-5 rounded-md bg-blue-600  py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-auto mt-10"
          >
            Generate Report
          </button>
        )}
      </div>
    </form>
  );
}
