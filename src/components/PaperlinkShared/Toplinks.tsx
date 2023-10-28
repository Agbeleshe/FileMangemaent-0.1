import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTabLabel, selectActiveTabLabel } from "../../store/tab-slice";
import { selectSelectedLinkKey } from "../../store/selectedLinkKeySlice"; // Import the selector for SelectedLinkKey

const linksmall =
  "flex items-center gap-2 font-light px-3 py-2 hover:no-underline text-base";

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

const QnAJunologix: Tab[] = [
  { label: "Junologix", path: "/Junologix", id: 1 },
  { label: "TaxIO", path: "/TaxIO", id: 2 },
  { label: "DataIO", path: "/DataIO", id: 3 },
  { label: "ScheduleIO", path: "/ScheduleIO", id: 4 },
];

export default function Toplinks() {
  const activeTab = useSelector(selectActiveTabLabel);
  const selectedLinkKey = useSelector(selectSelectedLinkKey);

  const dispatch = useDispatch();

  const handleTabClick = (tab: Tab) => {
    dispatch(setActiveTabLabel(tab.label));
  };

  return (
    <div className=" ">
      <div className="hidden md:flex md:bg-white md:h-[45px] md:overflow-hidden md:rounded-[0.4rem] md:font-poppins md:flex-row md:justify-between md:align-center">
        {selectedLinkKey === "QnAJunologix"
          ? QnAJunologix.map((tab: Tab) => {
              return (
                <button
                  key={tab.path}
                  onClick={() => handleTabClick(tab)}
                  className={`flex ${linksmall} ${
                    activeTab === tab.label ? activeLinkStyle : defaultLinkStyle
                  } flex-1 justify-center items-center`}
                >
                  {tab.label}
                </button>
              );
            })
          : TABS.map((tab: Tab) => {
              return (
                <button
                  key={tab.path}
                  onClick={() => handleTabClick(tab)}
                  className={`flex ${linksmall} ${
                    activeTab === tab.label ? activeLinkStyle : defaultLinkStyle
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
