import React, { useState } from "react";

const linksmall =
  "flex items-center gap-2 font-light px-3 py-2 hover:no-underline  text-base";
const activeLinkStyle = "bg-black text-white";
const defaultLinkStyle = "text-neutral-400";

interface Tab {
  label: string;
  path: string;
  id: number;
}

const TABS: Tab[] = [
  { label: "Paperlink", path: "/PaperLink", id: 1 },
  { label: "Signinlink", path: "/SigninLayout", id: 2 },
  { label: "Timelink", path: "/TimeLayout", id: 3 },
  { label: "RXlink", path: "/RxLayout", id: 4 },
  { label: "Hostlink", path: "/HostLayout", id: 5 },
];

export default function Toplinks() {
  const [activeTab, setActiveTab] = useState<number>(TABS[0].id);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.id);
  };

  return (
    <div className=" ">
      <div className="hidden md:flex md:bg-white md:h-[45px] md:overflow-hidden md:rounded-[0.4rem] md:font-poppins md:flex-row md:justify-between md:align-center">
        {TABS.map((tab: Tab) => {
          return (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab)}
              className={`flex ${linksmall} ${
                activeTab === tab.id ? activeLinkStyle : defaultLinkStyle
              } flex-1 justify-center items-center`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
