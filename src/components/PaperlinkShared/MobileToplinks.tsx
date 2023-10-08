import { useState } from "react";

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

const MobileToplinks = () => {
  const [activeTab, setActiveTab] = useState<number>(TABS[0].id);

  const defaultLinkStyle =
    "p-5 bg-gray-300 rounded-xl  font-bold w-[150px] h-15";
  const activeLinkStyle =
    "p-5 bg-black rounded-xl  shadow-sm font-bold w-[150px] h-15 text-white";

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.id);
  };

  return (
    <div className="md:hidden mt-[15vh] w-[90%] mx-auto h-auto p-3 fixed bg-bl ">
      <div className="flex overflow-x-auto w-full gap-5">
        {TABS.map((tab: Tab) => {
          return (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab)}
              className={`shadow-md   ${
                activeTab === tab.id ? activeLinkStyle : defaultLinkStyle
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default MobileToplinks;
