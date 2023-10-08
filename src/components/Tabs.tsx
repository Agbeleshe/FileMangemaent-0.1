import React, { useState, useEffect } from "react";
import folder from "../assests/folder.png";
import { Billing } from "../pages/Paperlink/resources/Billing";
import axiosInstance from "../utils/axiosInstance";
import Loader from "../pages/Paperlink/resources/Loader";

//Date conversion
function convertDateTime(dateTimeString: string) {
  const originalDate = new Date(dateTimeString);
  const formattedDate = originalDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const formattedTime = originalDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="text-lightGray font-Poppins  font-normal leading-normal px-3 text-sm ">
      {formattedDate} {formattedTime}
    </div>
  );
}

//year and month for the user.reciept
function extractYearAndMonth(dateTimeString: string) {
  const originalDate = new Date(dateTimeString);
  const year = originalDate.getFullYear();
  const month = originalDate.toLocaleDateString("en-US", { month: "numeric" });
  // Combine year and month into a single string
  const yearAndMonth = `${year}-${month}`;
  return yearAndMonth;
}

interface TabsProps {
  selectedUser: any | undefined;
  users: any[];
}

const Tabs: React.FC<TabsProps> = ({ selectedUser }) => {
  const [users, setUsers] = useState<Billing[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get<{ data: Billing[] }>("/billings")
      .then((res) => {
        setUsers(res.data.data);
        setLoading(false); // Set loading to false after the data has been fetched
        // console.log("Selectedusers :", selectedUser);
        // console.log(" userId :", users)
      })
      .catch((err) => {
        setLoading(false); // Also set loading to false in case of an error
        console.error("There was an error fetching data:", err);
      });
  }, []);

  const filteredUsers = users.filter((user) => selectedUser.id === user.userId);
  // console.log("filtered: ",filteredUsers)

  return (
    <div className="bg-white h-auto overflow-hidden font-Poppins pb-[150px] ">
      <div className="border-b w-full flex gap-11">
        <p className="font-medium text-darkGray text-sm px-5 py-2 md:py-5 ">
          Date/Time
        </p>
        <p className="font-medium text-darkGray text-sm px-5 py-2 md:py-5 ml-5">
          #invoice
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div>
          {filteredUsers.map((user) => (
            <div className="hover:bg-gray-100 flex" key={user.id}>
              <div className="border-gray-200 px-3 py-5 font-Poppin">
                <div className="text-lightGray font-Poppins font-normal leading-normal text-sm ">
                  {convertDateTime(user.updatedAt)}
                </div>
              </div>
              <div className="text-left text-green-500 font-Poppins text-sm font-normal px-5 py-5 flex items-center">
                <span className="">{extractYearAndMonth(user.updatedAt)} </span>
                <a href={user.reciept} className="flex">
                  <span className="ml-5">
                    <img src={folder} alt="" />
                  </span>
                </a>
              </div>
            </div>
          ))}
          {filteredUsers.length < 1 && (
            <div className="flex justify-center mt-1 bg-slate-100 text-gray-400 w-full text-xs md:text-sm p-2 items-center align-middle h-full">
              Sorry, No Invoice available for this user!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tabs;
