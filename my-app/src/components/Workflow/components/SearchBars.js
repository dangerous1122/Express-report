import React, { useEffect, useState } from "react";
import { fetchSenders } from "../../../utils/Slices/senderSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function SearchBars(props) {
  const [contacts, setContacts] = useState([]);
  const [receiverContacts, setReceiverContacts] = useState([]);
  const [selected, setSelected] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]); // Store filtered contacts

  const [active, setActive] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch( );

  const setSelectedContact = (obj) => {
    setSelected(obj);
    if (props.placeholder === "search from sender list") {
      props.onSender(obj);
    } else {
      props.onReceiver(obj);
    }
  };

  useEffect(() => {
    dispatch(fetchSenders("sender")).then((actionResult) => {
      if (fetchSenders.fulfilled.match(actionResult)) {
        const data = actionResult.payload.data;
        setContacts(data);
      } else if (fetchSenders.rejected.match(actionResult)) {
      }
    });
  }, [location, dispatch]);

  useEffect(() => {
    dispatch(fetchSenders("receiver")).then((actionResult) => {
      if (fetchSenders.fulfilled.match(actionResult)) {
        const data = actionResult.payload.data;
        setReceiverContacts(data);
      } else if (fetchSenders.rejected.match(actionResult)) {
      }
    });
  }, [location, dispatch]);

  const listHandler = (event) => {
    const value = event.target.value.toLowerCase();
    if (value && props.placeholder === "search from sender list") {
      const filtered = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(value) ||
          (contact.address && contact.address.toLowerCase().includes(value))
      );
      setFilteredContacts(filtered);
      setActive(true);
    } else if (value && props.placeholder === "search from receiver list") {
      const filtered = receiverContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(value) ||
          (contact.address && contact.address.toLowerCase().includes(value))
      );
      setFilteredContacts(filtered);
      setActive(true);
    } else {
      setFilteredContacts(contacts); // Reset to all contacts when search is cleared
      setActive(false);
    }
  };
  return (
    <>
      {!selected && (
        <form class="md:max-w-lg max-w-none mx-auto" onSubmit={(e) => e.preventDefault()}>
          <div class="flex">
            <div class="relative lg:w-full w-full ">
              <input
                type="search"
                className="block p-2.5 lg:mt-7 mt-3 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-md   border border-gray-500   dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder={props.placeholder}
                onChange={listHandler}
              />

              <button
                type="submit"
                class="absolute lg:top-10 top-6 end-1 pe-1 text-sm font-medium  text-white bg-gray-50 rounded-e-lg  border-gray-500  "
              >
                <svg
                  class="w-4 h-4 text-gray-700 border-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </div>
          </div>
          {active &&
            filteredContacts &&
            filteredContacts.map((contact, index) => (
              <div
                className="flex justify-between lg:w-auto w-[248px]  h-full bg-white border-2 p-2 cursor-pointer hover:bg-gray-100"
                key={index}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex ">
                  <p className="font-semibold lg:text-base text-xs text-gray-800">Name: </p>
                  <p className="text-gray-700 lg:ml-1 ml-0 lg:text-base text-xs text-nowrap">{ contact.name}</p>
                </div>
                <div className="flex justify-end text-nowrap">
                  <p className="font-semibold text-gray-800 lg:text-base text-xs">Company: </p>
                  <p className="text-gray-700 lg:ml-1 ml-0 lg:text-base text-xs text-nowrap">{" " + contact.address}</p>
                </div>
              </div>
            ))}
        </form>
      )}
      {selected && (
        <div className="flex justify-around lg:mb-0 mb-3 h-full lg:w-auto w-[250px] mt-3 bg-white border-2 p-2 cursor-pointer  shadow-md rounded-md">
          <div className="flex ">
            <p className="font-semibold lg:text-base text-xs">Name: </p>
            <p className="ml-1 lg:text-base text-xs text-nowrap">{selected.name}</p>
          </div>
          <div className="flex">
            <p className="font-semibold lg:text-base text-xs">Company: </p>
            <p className="ml-1 lg:text-base text-xs text-nowrap">{selected.address}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchBars;
