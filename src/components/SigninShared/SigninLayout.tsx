import React from "react";
import Toplinks from "../PaperlinkShared/Toplinks";
import SigninHeader from "./SigninHeader";
import { Outlet } from "react-router-dom";
import SignInSidebar from "./SignInSidebar";
export default function SigninLayout() {
  return (
    <div className="bg-mainColor h-screen w-screen overflow-hidden flex flex-row font-Poppins">
      <SignInSidebar />
      <div className="flex flex-col flex-1 ">
        <SigninHeader />

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
