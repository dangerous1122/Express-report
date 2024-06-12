import React from "react";
import Actions from "./components/Actions";
import { Sidebar } from "./components/SideBar";

function dashboard() {
  return (
    <div className="grid grid-cols-5 bg-slate-50 min-h-full  ">
      <div className="lg:col-span-1 lg:inline hidden h-full  ">
        <Sidebar />
      </div>
      <div className="lg:col-span-4 col-span-5 inline  md:mt-16 mt-16 bg-slate-50 min-h-lvh overflow-hidden  ">
        <Actions />
      </div>
    </div>
  );
}

export default dashboard;
