import React, { useState } from "react";
import Tabs from "./RcvTabs";
import Tab1 from "./RcvTab1";
import Tab2 from "./RcvTab2";

interface FileTabRowProps {
  selectedUserId: number | null;
  users: any[]; // Replace 'YourUserType' with the actual type of your users
}

const FileTabRow: React.FC<FileTabRowProps> = ({ selectedUserId, users }) => {
  const selectedUser = users.find((user) => user.userId === selectedUserId);
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="border-radius-[0.9375rem] bg-white width-[65.75rem]  h-auto overflow-hidden font-Poppins">
      <div className="bg-secondaryColor flex justify-between height-[5.3125rem] px-4 py-2 rounded-t-lg pb-0">
        <div className="hidden md:inline border-b-0 text-lightGray font-medium leading-normal text-2xl">
          Accounts
        </div>
        <div className="flex w-full justify-end items-baseline">
          <div className="flex justify-between  items-baseline w-[80%] mx-auto end-0 h-full pt-5">
            <div className="flex justify-between gap-4 md:gap-7 border-b w-full text-sm md:text-[15px] ">
              <button
                className={`flex  ${
                  activeTab === "tab1"
                    ? "border-b-2 border-black "
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick("tab1")}
              >
                <p className="md:inline hidden mr-2">Account </p> Profile
              </button>
              <button
                className={`${
                  activeTab === "tab2"
                    ? "border-b-2 border-black "
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick("tab2")}
              >
                Subscription
              </button>
              <button
                className={`${
                  activeTab === "tab3"
                    ? "border-b-2 border-black "
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick("tab3")}
              >
                Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs for mobile view */}
      <div className="md:hidden  w-full ">
        <div className="flex justify-between  w-full h-auto"></div>
      </div>

      {activeTab === "tab1" && (
        <div>
          {/* Content for Tab 1 */}
          <Tab1 selectedUser={selectedUser} users={users} />
        </div>
      )}
      {activeTab === "tab2" && (
        <div>
          {/* Content for Tab 2 */}
          {/* Your tab 2 content here */}
          <Tab2 selectedUser={selectedUser} users={users} />
        </div>
      )}
      {activeTab === "tab3" && (
        <div>
          {/* Content for Tab 3 */}
          {/* Your tab 3 content here */}
          <Tabs selectedUser={selectedUser} users={users} />
        </div>
      )}
    </div>
  );
};

export default FileTabRow;
