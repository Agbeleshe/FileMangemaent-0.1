import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Toplinks from "./Toplinks";
import MobileSidebar from "./MobileSidebar";
import MobileHeader from "./MobileHeader";
import MobileToplinks from "./MobileToplinks";

export default function Layout() {
  return (
    <div className="bg-mainColor h-screen w-screen overflow-hidden flex flex-row font-Poppins">
      <Sidebar />
      <MobileSidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <MobileHeader />
        <div className="m-7  ">
          <Toplinks />
          <MobileToplinks/>
        </div>
        <div className="flex-1 p-6 min-h-0 overflow-auto mt-[25vh] md:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
