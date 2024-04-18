import React, { useEffect, useState } from "react";
import {  useDispatch } from "react-redux";
import { getData } from "../../utils/Slices/dataSlice";
import { Sidebar } from "../dashboard/components/SideBar";

const Profile = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    dispatch(getData()).then((data) => {
      console.log(data.payload.user);
      setProfileData(data.payload.user);
      console.log("first", profileData.email);
    });
  }, []);

  return (
    <div className="grid grid-cols-5  h-screen bg-slate-50">
    <div className="lg:col-span-1 lg:inline hidden h-full ">
      <Sidebar />
    </div>
    <div className="lg:col-span-4 col-span-5 inline  h-full md:mt-0 mt-16  ">
    <div className="flex flex-col bg-slate-50" style={{ height: "88vh" }}>
      <h1 className="text-3xl mt-8 font-bold tracking-tight text-gray-900 sm:text-4xl  text-center">
        Your Profile
      </h1>
      <div className="flex flex-col justify-center bg-white  mx-auto p-6 shadow-md rounded-xl sm:px-12  mt-16">
        <div className="space-y-4 text-center divide-y ">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-xl mb-3">
              {profileData && profileData.email}
            </h2>
            <p className="px-5 font-semibold text-xs sm:text-base dark:text-gray-600">
              Free Trial:
              {profileData && profileData.freeTrial === false ? (
                <span className="-my-1 ml-5 bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
                  Already Used
                </span>
              ) : (
                <span className="-my-1 ml-5 bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700  border border-green-400">
                  Available
                </span>
              )}
            </p>
          </div>
          <div className="flex justify-center pt-2 space-x-4 align-center">
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="GitHub"
              className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
            ></a>
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="Dribble"
              className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
            ></a>
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="Twitter"
              className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
            ></a>
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="Email"
              className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
            ></a>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Profile;
