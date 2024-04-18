import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Logo from "../assets/logo4.png";
import { useLocation, Link, Outlet } from "react-router-dom";
import axios from "axios";
import DeleteDialog from "../UI/deleteDialog";
import { useNavigate } from "react-router-dom";

import {
  Bars3Icon,
  XMarkIcon,
  TrashIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const navigate = useNavigate();
  const [deleteState, setDeleteState] = useState(false);
  const [error, setError] = useState(false);
  const isLoggedIn=localStorage.getItem('expr')


  const location = useLocation();
  let landing;
  if(isLoggedIn){
   landing =
    location.pathname.endsWith("/") ||
    location.pathname.endsWith("/faqs") ||
    location.pathname.endsWith("/use-cases");
  }else{
   landing= location.pathname.endsWith("/") ||
    location.pathname.endsWith("/faqs") ||
    location.pathname.endsWith("/use-cases") || location.pathname.endsWith("/upgrade") || location.pathname.endsWith("/demo") ;

  }

    let navigation;
    if(!landing){
  navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      current: location.pathname.endsWith("/dashboard"),
    },
    {
      name: "Upgrade",
      href: "/upgrade",
      current: location.pathname.endsWith("/upgrade"),
    },
    {
      name: "My Reports",
      href: "/dashboard/reports",
      current: location.pathname.endsWith("/reports"),
    },
    {
      name: "Profile",
      href: "/profile",
      current: location.pathname.endsWith("/profile"),
    },
    {
      name: "Sender Data",
      href: "/dashboard/sender-list",
      current: location.pathname.endsWith("/sender-list"),
    },
    {
      name: "Receiver Data",
      href: "/dashboard/receiver-list",
      current: location.pathname.endsWith("/receiver-list"),
    },
  ];

}else {
  navigation = [
    {
      name: "Pricing",
      href: "/upgrade",
      current: location.pathname.endsWith("/upgrade"),
    },
    {
      name: "Use Cases",
      href: "/use-cases",
      current: location.pathname.endsWith("/use-cases"),

    },
    {
      name: "Get Started",
      href: "/login",
      // current: location.pathname.endsWith("/login"),
    },

  ];
}

  const deleteHandler = async () => {
    const token = localStorage.getItem("expr");
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/delete-account`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        localStorage.clear();
        navigate("/");
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <DeleteDialog
        state={deleteState}
        onClose={() => setDeleteState(false)}
        onConfirm={deleteHandler}
      />
      <Disclosure
        as="nav"
        className="z-50 "
        style={{ backgroundColor: "#101010" }}
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                 
                {!landing && (
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  
                  </div>
                )}
               
                <div className="flex items-center justify-center sm:items-stretch sm:justify-start ">
                  <div className={`${landing ? "" : "ml-28"} flex-shrink-0 md:mt-3 mt-0 items-center md:-ml-16  inline md:w-72 w-40 md:me-0 me-20`}>
                    <Link to={"/"}>
                      <img
                        className="md:h-72 h-24 mt-3 cursor-pointer "
                        src={Logo}
                        alt="Your Company"
                        // style={{marginInlineEnd:'48rem'}}
                      />
                    </Link>
                  </div> 
                  <div className="hidden sm:ml-6 ">
                    <div className="flex space-x-4 ">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium "
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {!landing && (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <button to="">
                            <div class="relative w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                              <svg
                                class="absolute w-11 h-11 text-gray-400 -left-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          </button>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/"
                                onClick={() => localStorage.clear()}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "px-4 py-2 text-sm text-gray-700 flex justify-between"
                                )}
                              >
                                Sign out
                                <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => {
                                  setDeleteState(true);
                                }}
                                to="/"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  " px-4 py-2 text-sm text-gray-700 flex justify-between"
                                )}
                              >
                                Delete Account
                                <TrashIcon className="w-6 ml-8 h-6" />
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                  {landing && (
                    <>
                      <div className="sm:inline-flex hidden">
                        <Link
                          to="/upgrade"
                          className="md:text-sm text-xs font-semibold leading-6 text-gray-100 md:mr-4 mr-2"
                        >
                          Pricing
                        </Link>
                        <Link
                          to="/use-cases"
                          className="md:text-sm text-xs font-semibold leading-6 text-gray-100 md:mr-4 mr-2"
                        >
                          Use Cases
                        </Link>
                        <Link
                          to="/login"
                          className="md:text-sm text-xs font-semibold leading-6 text-gray-100"
                        >
                          Get Started <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden ">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Outlet />
    </>
  );
}
