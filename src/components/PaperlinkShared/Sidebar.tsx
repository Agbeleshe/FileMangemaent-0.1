import React from "react";
import logo from "../../assests/logo.svg";
import { useState, useEffect } from "react";
import { DASHBOARD_SIDEBAR_LINKS } from "../../constants/navigation";
import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { setSelectedLinkKey } from '../../store/selectedLinkKeySlice'; // Import your slice
import { selectSelectedLinkKey } from '../../store/selectedLinkKeySlice'; // Import the selector


const linkClass =
  "flex items-center gap-2 mb-1 shadow-[#77C360] font-light px-3 py-3 hover:no-underline rounded-md text-sm";

type LinkType = {
  key: string;
  path: string;
  icon: React.ReactNode;
  label: string;
};

type SidebarProps = {};

type SidebarLinkProps = {
  link: LinkType;
  pathname: string;
  selectedLinkKey: string;
  handleLinkClick: (key: string) => void;
};

export default function Sidebar(props: SidebarProps) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // Access selectedLinkKey from the Redux store using the selector
  const selectedLinkKey = useSelector(selectSelectedLinkKey);


  const handleLinkClick = (key: string) => {
    dispatch(setSelectedLinkKey(key));
    console.log(selectedLinkKey)
    // You can perform other actions related to the selected link here
  };
  


  return (
    <div className="hidden md:width-[17.4375rem] md:bg-white md:shadow-md md:px-6 md:font-poppins md:flex md:flex-col">
      <div className="flex items-center justify-center gap-2 px-1 mb-5">
        <img src={logo} alt="site logo" className="" />
      </div>

      <div className="flex flex-col gap-1 mt-4">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink
            key={link.key}
            link={link}
            pathname={pathname}
            selectedLinkKey={selectedLinkKey}
            handleLinkClick={handleLinkClick}
          />
        ))}
      </div>
    </div>
  );
}

function SidebarLink(props: SidebarLinkProps) {
  const { link, pathname, selectedLinkKey, handleLinkClick } = props;
  const isActive = pathname === link.path;

  return (
    <div
      onClick={() => {
        handleLinkClick(link.key);
      }}
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
