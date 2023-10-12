import React, { useState } from "react";
import Calender from "../../assests/Calendar.png";
import folder from "../../assests/folder.png";

import Loader from "./resources/Loader";

import useBilling from "../../hooks/APIrequest/UseBilling";
import ErrorMessage from "./resources/ErrorMessage";

import SearchGreen from "../../components/svg-icons/SearchGreen";
import SearchBar from "./resources/SearchBar";
import { TfiClose } from "react-icons/tfi";

import useAccRcvPagination from "../../hooks/Paginations/useAccRcvPagination";
import RecievableTabRow from "./resources/RecievableTabrow/RecievableTabRow";
import DateRangePickerCalendarExample from "../../hooks/Others/DateRangePicker";

//year and month for the user.reciept
function extractYearAndMonth(dateTimeString: string) {
  const originalDate = new Date(dateTimeString);
  const year = originalDate.getFullYear();
  const month = originalDate.toLocaleDateString("en-US", { month: "numeric" });
  // Combine year and month into a single string
  const yearAndMonth = `${year}-${month}`;
  return yearAndMonth;
}

const AccountReceive = () => {
  const [selectedFilter, setSelectedFilter] = useState(""); // Initialize with a default filter value

  const [inputClick, setInputClick] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterAll, setFilterAll] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [tabs, setTabs] = useState(true);
  //Date State
  const [selectedDate, setSelectedDate] = useState(false);
  const [timeFilter, setTimeFilter] = useState<any>([null, null]);

  const { loading, users, error, setIsDatePicked, isDatePicked } = useBilling(
    searchValue,
    selectedFilter,
    timeFilter[0],
    timeFilter[1]
  );

  const {
    currentPost,
    paginationButtons,
    nextButton,
    prevButton,
    viewAllButton,
  } = useAccRcvPagination(
    1,
    searchValue,
    selectedFilter,
    users,
    filterAll,
    isDatePicked!
  );

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleInputClick = () => {
    setInputClick(!inputClick);
    setSearchValue("");
  };

  //filename and file action are not part o
  // const filteredUsers = filterAll
  //   ? users.filter(
  //       (user: any) =>
  //         user.user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         user.updatedAt.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         user.user.role.toLowerCase().includes(searchValue.toLowerCase())
  //       // || user.status.toLowerCase().includes(searchValue.toLowerCase())
  //     )
  //   : currentPost.filter(
  //       (user: any) =>
  //         user.user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         user.updatedAt.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         user.user.role.toLowerCase().includes(searchValue.toLowerCase())
  //       // || user.status.toLowerCase().includes(searchValue.toLowerCase())
  //     );

  const results = currentPost.length > -1;

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
      <div className="text-lightGray font-Poppins font-normal leading-normal px-3 text-xs md:text-sm flex flex-row gap-1">
        <span>{formattedDate}</span> <span>{formattedTime}</span>
      </div>
    );
  }

  //tabs redirect
  const handleTabs = (userId: any) => {
    setSelectedUserId(userId);
    setTabs(false);
  };

  //Date Selection LOogic

  //handle modal of the date open
  const handleSelectedDate = () => {
    setSelectedDate(true);
  };

  //handle modal of the date close
  const handleCloseSelectedDate = () => {
    setSelectedDate(false);
    console.log(selectedDate);
  };

  const getDateValuesFunc = (start: number, end: number) => {
    setTimeFilter([start, end]);
    start && end && handleCloseSelectedDate();

    // emergency
    // setTimeout(() => {
    //   handleCloseSelectedDate();
    // }, 1000);
    // console.log(start, end);
  };

  return (
    <div className=" bg-white width-[65.75rem] h-auto overflow-hidden font-Poppins rounded-t-lg mb-[150px]">
      {tabs ? (
        <>
          {" "}
          <div className="bg-secondaryColor  flex justify-between height-[5.3125rem] px-4 py-2 rounded-t-lg">
            <div
              className={`md:hidden  text-lightGray flex w-full border-b-0  font-medium leading-normal text-lg md:text-2xl
          } `}
            >
              Account
              <span className={`px-2  ${inputClick ? "hidden" : ""} `}>
                Receivable
              </span>
            </div>
            <div
              className={`hidden md:flex w-full border-b-0  font-medium leading-normal text-2xl `}
            >
              Account <span className="px-2">Receivable</span>
            </div>

            <div className="border-b-0 flex gap-3 justify-end ">
              {inputClick && (
                <div className="relative bottom-0 border-1 border-green-300 ">
                  <SearchBar
                    onSearch={(value) => handleSearch(value)} // Pass a callback to handle search value changes
                    inputClick={inputClick}
                    placeholder="Search users..." // Customize the placeholder if needed
                    buttonText="Search" // Customize the button text if needed
                  />
                </div>
              )}
              {!inputClick ? (
                <button
                  onClick={handleInputClick}
                  className="inline-flex items-center justify-center h-7 w-7 md:w-12 md:h-12 flex-shrink-0 fill-current bg-white rounded-full shadow-drop outline-none"
                >
                  <SearchGreen />
                </button>
              ) : (
                <button
                  onClick={handleInputClick}
                  className="inline-flex items-center justify-center h-7 w-7 md:w-12 md:h-12 flex-shrink-0 fill-current bg-slate-700 transition-all ease-in-out duration-700 hover:bg-red-500 rounded-full shadow-drop outline-none"
                >
                  <TfiClose color="white" />
                </button>
              )}
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div>
              {/* Desktop view */}
              <div className="hidden md:flex">
                <table className="w-full table-hover user-table ">
                  <thead>
                    <tr className="">
                      <th className=" p-5 px-8 text-left font-bold text-darkGray text-sm flex items-center">
                        <span
                          className="flex   gap-2  w-full h-full "
                          onClick={handleSelectedDate}
                        >
                          Date/Time
                          <img src={Calender} alt="" />
                        </span>

                        {/* date modal */}
                        {selectedDate && (
                          <div className="">
                            <div
                              onClick={handleCloseSelectedDate}
                              className="absolute bg-black opacity-25 inset-0 h-[130vh] z-20"
                            ></div>

                            <div
                              onClick={handleCloseSelectedDate}
                              className="absolute inset-0 backdrop-blur-sm h-[130vh] z-30"
                            ></div>
                            <DateRangePickerCalendarExample
                              getDateValue={getDateValuesFunc}
                              setIsDatePicked={setIsDatePicked}
                              selectedDate={selectedDate}
                            />
                          </div>
                        )}
                      </th>
                      <th className=" border-gray-100 p-2 text-left font-medium text-darkGray text-sm">
                        Account Email
                      </th>
                      <th className="border-b p-2  border-gray-100  text-left font-medium text-darkGray text-sm">
                        Business Name
                      </th>
                      <th className="border-b border-gray-100 px-4 py-3 text-left font-medium text-darkGray text-sm">
                        #invoice
                      </th>
                      <th className="border-b border-gray-100 p-2 text-left font-medium text-darkGray text-sm">
                        Total
                      </th>
                    </tr>
                  </thead>
                  {results ? (
                    <tbody className="cursor-pointer">
                      {currentPost.map((user) => (
                        <tr
                          key={user.id}
                          className="border-gray-100 hover:bg-gray-100"
                        >
                          <td className="border-t px-5 border-gray-100 py-4 p-2 text-left font-Poppins text-lightGray ">
                            {convertDateTime(user.createdAt)}
                          </td>
                          <td
                            onClick={() => handleTabs(user.id)}
                            className="border-t border-gray-100 py-4 text-left  text-blue-800 hover:underline hover:text-red-500 font-Poppins text-sm font-normal"
                          >
                            {user.user.email}
                          </td>
                          <td className="border-t border-gray-100 py-4 text-left text-lightGray  font-Poppins text-sm font-normal">
                            {user.user.companyName}
                          </td>

                          <td className="border-t py-4  border-gray-100 text-left text-lightGray font-Poppins text-sm font-normal px-6 flex items-center">
                            <a href={user.reciept} className="flex">
                              {extractYearAndMonth(user.updatedAt)}
                              <span className="ml-5">
                                <img src={folder} alt="" />
                              </span>
                            </a>
                          </td>

                          <td className="border-t border-gray-100 py-4 text-left text-purple-500 font-Poppins text-sm font-normal px-3">
                            <span className="status">${user.total}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    ""
                  )}
                </table>
              </div>
              {/* mobile view */}
              {results && (
                <div className="md:hidden h-auto text-xs">
                  <div className=" p-3 shadow-xl">
                    {currentPost.map((user) => (
                      <div className="bg-white hover:bg-slate-200 shadow-xl rounded-xl gap-3 mb-5  ">
                        <div className="border-b bg-green-100  text-white px-2 rounded-tr-xl rounded-tl-xl ">
                          <h1 className=" p-2 flex justify-between  text-green-600 ">
                            Date created: {convertDateTime(user.createdAt)}
                          </h1>
                        </div>
                        <div
                          onClick={() => handleTabs(user.id)}
                          className="border-b hover:bg-green-500 hover:text-white px-3 text-center "
                        >
                          <h1>Account Email</h1>
                          <h3>{user.user.email}</h3>
                        </div>
                        <div className="border-b hover:bg-green-500 hover:text-white px-3 text-center ">
                          <h1>Business name</h1>
                          <h3>{user.user.role}</h3>
                        </div>
                        <div className="border-b hover:bg-green-500 hover:text-white px-3 text-center ">
                          <h1>Invoice </h1>
                          <h3>Demo</h3>
                        </div>
                        <div className="border-b flex justify-between p-2 hover:bg-green-500 hover:text-white px-3 text-center ">
                          <h1>Total:</h1>
                          <h3>demo</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!currentPost && error && <ErrorMessage message={error} />}
              {!currentPost && inputClick === true && (
                <div className="text-center py-4 w-full bg-green-300 text-2xl text-green-700">
                  Search complete. No record found
                </div>
              )}
              <div className="w-full bg-slate-100 flex justify-center ">
                {prevButton} {paginationButtons} {viewAllButton} {nextButton}
              </div>
            </div>
          )}
        </>
      ) : (
        <RecievableTabRow selectedUserId={selectedUserId} users={users} />
      )}
    </div>
  );
};

export default AccountReceive;
