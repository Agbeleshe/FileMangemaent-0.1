import React from "react";
import logo from "../../assests/logo.svg";
import { DASHBOARD_SIDEBAR_LINKS } from "../../constants/navigation";
import { Link, useLocation } from "react-router-dom";

const linkClass ="flex items-center gap-2 mb-1 shadow-[#77C360] font-light px-3 py-3 hover:no-underline rounded-md text-sm ";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    //for Desktop view
    <div className="hidden md:width-[17.4375rem] md:bg-white md:shadow-md md:px-6 md:font-poppins md:flex md:flex-col">
      <div className="flex items-center justify-center gap-2 px-1 mb-5 ">
        <img src={logo} alt="site logo" className="" />
      </div>
      

      <div className="flex flex-col gap-1 mt-4">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} pathname={pathname} />
        ))}
      </div>
    </div>
  );
}

function SidebarLink({ link, pathname }: { link: any; pathname: string }) {
  const isActive = pathname === link.path;

  return (
    <div
      className={`
        text-neutral-400
        ${isActive ? "bg-green-500 shadow-md text-white" : ""}
        ${linkClass}
      `}
    >
      <Link to={link.path} className="flex items-center gap-2">
        <div className="text-xl">{link.icon}</div>
        {link.label}
      </Link>
    </div>
  );
}
