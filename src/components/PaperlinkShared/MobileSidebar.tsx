import React from "react";
import { DASHBOARD_SIDEBAR_LINKS } from "../../constants/mobileNav";

const MobileSidebar = () => {
  return (
    <div className="">
      {/* Sidebar */}
      <div className="md:hidden z-20 fixed bottom-5 w-[90%] left-0 right-0 mx-auto bg opacity-90  rounded-full p-3">
        <div className="flex justify-between px-2 text-center items-center">
          {DASHBOARD_SIDEBAR_LINKS.map((index) => (
            <div
              key={index.key}
              className="flex font-bold hover:bg-blue p-2 rounded-full h-[30px] w-[30px] text-center justify-center items-center"
            >
              {index.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
