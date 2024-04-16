import React from "react";
import Actions from "./components/Actions";
import { Sidebar } from "./components/SideBar";

function dashboard() {
  return (
    <div className="grid grid-cols-5  overflow-hidden bg-slate-50 h-full">
      <div className="lg:col-span-1 lg:inline hidden ">
      <Sidebar/>
      </div>
      <div className="lg:col-span-4 col-span-5 inline  md:mt-0 mt-16 bg-slate-50 ">
        <div className="overflow-y-hidden">
          <Actions />
        </div>
      </div>
    </div>
  );
}

export default dashboard;
