import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";


export default function Modal(props) {
  const [open, setOpen] = useState(props.state);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(props.val ? props.val.email : "");
  const [phone, setPhone] = useState(props.val ? props.val.contact : "");
  const [address, setAddress] = useState(props.val ? props.val.address : "");

  useEffect(() => {
    if(props.val){
      setName(props.val.name);
      setEmail(props.val.email);
      setPhone(props.val.contact); 
      setAddress(props.val.address);
    }else{
      setName('');
      setEmail('');
      setPhone(''); 
      setAddress(''); 
    }
  }, [props.val]);

  const cancelButtonRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !name.trim().length > 0 &&
      !email.trim().length > 0 &&
      !phone.length > 0 &&
      !address.trim().length > 0
    ) {
      return;
    }

    let data = {
      name,
      email,
      contact: phone,
      address,
    };

    props.onAdd(data);
    setName("");
    setEmail("");
    setPhone(""); // Assuming 'contact' is correct and not 'phone'
    setAddress("");
    props.onclose(false);
  };

  return (
    <Transition.Root show={props.state} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center  text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg py-2">
                <div className="isolate bg-white px-6  lg:px-8">
                  <form
                    onSubmit={submitHandler}
                    className="mx-auto mt-16 max-w-xl sm:mt-20"
                  >
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-2">
                      <div className="col-span-1">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Full name
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            value={name}
                            autoComplete="family-name"
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            className="block w-full rounded-md border-2 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="">
                          <label
                            htmlFor="company"
                            className="block text-sm font-semibold leading-6 text-gray-900 mt-5"
                          >
                            Address & Company
                          </label>
                          <div className="mt-2.5">
                            <input
                              type="text"
                              name="company"
                              id="company"
                              value={address}
                              autoComplete="organization"
                              onChange={(e) => {
                                setAddress(e.target.value);
                              }}
                              className="block w-full rounded-md border-2 px-3.5 py-2 focus:border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-1">
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Email
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            autoComplete="email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            className="block w-full rounded-md border-2 px-3.5 py-2 focus:border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold leading-6 text-gray-900 mt-5"
                        >
                          Phone Number
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="phoneNumber"
                            name="email"
                            id="email"
                            value={phone}
                            autoComplete="email"
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                            className="block w-full rounded-md border-2 px-3.5 py-2 text-gray-900 focus:border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-10">
                      <button
                        type="submit"
                        className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center focus:border-0 text-sm font-semibold text-white shadow-sm hover:bg-blu-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-white pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start"></div>
                </div>
                <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => props.onclose()}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
