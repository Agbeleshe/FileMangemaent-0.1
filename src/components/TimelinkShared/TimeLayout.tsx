import React from "react";
import Toplinks from "../PaperlinkShared/Toplinks";
import TimeLinkHeader from "./TimeLinkHeader";
import TimeLinkSidebar from "./TimeLinkSidebar";
import { Outlet } from "react-router-dom";
export default function TimeLinkLayout() {
  return (
    <div className="bg-mainColor h-screen w-screen overflow-hidden flex flex-row font-Poppins">
     
     <TimeLinkSidebar />
      <div className="flex flex-col flex-1 ">
      <TimeLinkHeader />

        <div className="m-7  ">
          <Toplinks />
        </div>
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
