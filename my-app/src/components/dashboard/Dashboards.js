import React from "react";
import Header from "../Layout";
import Actions from "./components/Actions";
import Details from "./components/sep-section";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/SideBar";

function dashboard() {
  return (
    <div className="grid grid-cols-5  overflow-hidden">
      <div className="lg:col-span-1 col-span-2">
      <Sidebar/>
      </div>
      <div className="lg:col-span-4 col-span-3  bg-slate-50">
        <div className="overflow-y-hidden">
          <Actions />
          {/* <Details/> */}
        </div>
      </div>
    </div>
  );
}

export default dashboard;
