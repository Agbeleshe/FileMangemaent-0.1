import React, { useEffect, useState } from "react";
import Calender from "../../assests/Calendar.png";
import SearchGreen from "../../components/svg-icons/SearchGreen";
import { TfiClose } from "react-icons/tfi";
import Loader from "./resources/Loader";
import ErrorMessage from "./resources/ErrorMessage";
import SearchBar from "./resources/SearchBar";
import useLedger from "../../hooks/APIrequest/useLedger";
import useUserPagination from "../../hooks/Paginations/useUserPagination";
import convertDateTime from "./resources/DateConverter";
import Arrow from "../../components/svg-icons/Arrow";
import UserTabrow from "../Paperlink/resources/UserTabeow/UserTabrow";

//no record icon
import noRecords from "../../assests/noRecords.json";
import Lottie from "lottie-react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { selectActiveTabLabel, setActiveTabLabel } from "../../store/tab-slice";

//hook for seting tabs to default paperLink
import useCustomActiveTabs from "../../hooks/Others/useCustomActiveTabs";

import { Ledger } from "./resources/Ledger";
import "./User.css";
import DateRangePickerCalendarExample from "../../hooks/Others/DateRangePicker";
import { Console } from "console";
import Empty from "./resources/Empty";

const makeStyle = (action: string) => {
  if (action === "complete") {
    return {
      color: "green",
    };
  } else if (action === "sign") {
    return {
      color: "skyblue",
    };
  } else if (action === "confirm") {
    return {
      color: "blue",
    };
  } else if (action === "Delete") {
    return {
      color: "red",
    };
  } else {
    return {
      color: "gray",
    };
  }
};

const User = () => {
  const [inputClick, setInputClick] = useState(false);
  const [filterAll, setFilterAll] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [records, setRecords] = useState(false);
  const [tabs, setTabs] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(""); // Initialize with a default filter value
  const [selectedDate, setSelectedDate] = useState(false);
  const [timeFilter, setTimeFilter] = useState<any>([null, null]);

  //To set default on paperlink and also to set the active tob for the switch to define endponit
  const { customActiveTab } = useCustomActiveTabs();
  const activeTab = useSelector(selectActiveTabLabel);
  const dispatch = useDispatch();
  dispatch(setActiveTabLabel(customActiveTab));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { loading, users, error, setIsDatePicked, isDatePicked } = useLedger(
    searchValue,
    selectedFilter,
    timeFilter[0],
    timeFilter[1]
  );

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const {
    currentPost,
    paginationButtons,
    nextButton,
    prevButton,
    viewAllButton,
  } = useUserPagination(
    1,
    searchValue,
    selectedFilter,
    users,
    filterAll,
    isDatePicked!
  );
  //console.log(users, "from User.tsx");

  // For Postman URL and calculating total pages
  const totalPages = calculateTotalPages(users);

  const handleSearch = (value: string) => {
    // Remove extra spaces by using regex
    const cleanedValue = value.replace(/\s+/g, " ").trim();
    setFilterAll(!filterAll);

    setSearchValue(cleanedValue);
    // setFilterAll(true);
  };

  // Page calculation
  function calculateTotalPages(users: Ledger[]) {
    let totalPages = 0;
    for (const user of users) {
      totalPages += user.file.pages;
    }

    return totalPages;
  }
  console.log(users);
  // useEffect to fetch info from the Postman URL
  const handleInputClick = () => {
    setInputClick(!inputClick);
    setSearchValue("");
    setFilterAll(false);
    console.log(filterAll);
  };

  const handleStatusFilter = (e: any) => {
    const selectedValue = e.target.getAttribute("data-value"); // Get the data-value attribute
    setSelectedFilter(selectedValue); // Update the selected filter state
    setSearchValue(selectedValue); // Clear the search value
    console.log(selectedValue);
    //to see evry data concerning that field you use filter all which will reomve pagination

    setFilterAll(true);
  };

  //because length start fron 0
  const recordFound = currentPost.length > -1;
  console.log(currentPost, "currentPost");
  // display of no records
  useEffect(() => {
    if (currentPost.length > -1 && inputClick) {
      setRecords(true);
    } else {
      setRecords(false);
    }
  }, [currentPost, inputClick]);

  console.log(users);

  // Function to handle clicking on a user row and display additional information
  const handleMobileUserClick = (userId: number) => {
    setSelectedUserId(selectedUserId === userId ? null : userId); // Toggle selected user
  };

  //tabs redirect
  const handleTabs = (userId: any) => {
    setSelectedUserId(userId);
    setTabs(true);
  };

  console.log("Search Value:", searchValue);
  console.log("Data to Filter:", users); // or currentPost
  console.log("current post Users:", currentPost);

  //data filteration logic will be here
  const handleCloseSelectedDate = () => {
    setSelectedDate(false);
    console.log(selectedDate);
  };

  const getDateValuesFunc = (start: number, end: number) => {
    setTimeFilter([start, end]);
    start && end && handleCloseSelectedDate();
  };

  //handle modal of the date open
  const handleSelectedDate = () => {
    setSelectedDate(true);
  };

  console.log(error, "Error in the user");

  return (
    <div className="mb-20">
      {!tabs ? (
        <div>
          <div className=" md:mb-0 border-radius-[0.9375rem] bg-white width-[65.75rem] h-auto overflow-hidden font-Poppins rounded-t-lg">
            <div className="bg-secondaryColor flex justify-between md:h-[4.1875rem] rounded-t-lg px-4 py-2">
              <div className="border-b-0 text-lightGray font-medium leading-normal text-lg md:text-2xl">
                User Log
              </div>
              <div className="border-b-0 flex gap-3 items-center">
                {!inputClick ? (
                  ""
                ) : (
                  <div className="relative md:bottom-0 md:border-1 border-green-300 ">
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
            {/* Sourrounding every body (both mobile and desktop) */}
            {activeTab === "Paperlink" ? (
              <>
                <div className="md:overflow-x-auto">
                  {/* Table for wide screens */}
                  {loading ? (
                    <div className="hidden md:inline">
                      <Loader />
                    </div>
                  ) : (
                    <div className="hidden md:block">
                      {recordFound && (
                        <table className="md:w-full md:table-hover md:user-table">
                          {!error && (
                            <thead>
                              <tr>
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
                                <th className="border-b p-2 text-left font-medium text-darkGray text-sm">
                                  User
                                </th>
                                <th className="border-b p-2 text-left font-medium text-darkGray text-sm">
                                  Account Email
                                </th>
                                <th className="border-b p-2 text-left font-meduim text-darkGray font-normal text-sm">
                                  Paperlink
                                </th>
                                <th className="border-b px-4 py-3 text-center font-medium text-darkGray text-sm">
                                  Pages
                                  <span className="px-2 p-1 justify-center gap-5 rounded-full bg-blue text-white text-xs ml-2">
                                    {totalPages}
                                  </span>
                                </th>

                                <th className="p-2 relative  text-center font-bold text-darkGray text-sm flex items-center z-10">
                                  <span className="flex justify-center items-center align-middle">
                                    <div
                                      className="flex gap-2 font-extrabold items-center cursor-pointer justify-center w-full px-4 pt-5 text-sm  text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                      onClick={toggleDropdown}
                                    >
                                      <p>Action</p>
                                      <Arrow />
                                    </div>
                                  </span>
                                  {isOpen && (
                                    <div className="absolute top-[65px] inline-block outline-none m-auto ease-in-out duration-1000 h-auto z-10 w-full left-0 cursor-pointer bg-gray-200 shadow-lg">
                                      <div
                                        onClick={handleStatusFilter}
                                        data-value="complete" // Assign a data attribute to store the value
                                        className="p-4 hover:bg-slate-600 ease-in-out duration-300 hover:text-white"
                                      >
                                        complete
                                      </div>
                                      <div
                                        onClick={handleStatusFilter}
                                        data-value="sign" // Assign a data attribute to store the value
                                        className="p-4 hover:bg-slate-600 ease-in-out duration-300 hover:text-white"
                                      >
                                        sign
                                      </div>
                                      <div
                                        onClick={handleStatusFilter}
                                        data-value="confirm" // Assign a data attribute to store the value
                                        className="p-4 hover:bg-slate-600 ease-in-out duration-300 hover:text-white"
                                      >
                                        confirm
                                      </div>
                                      <div
                                        onClick={handleStatusFilter}
                                        data-value="" // Assign a data attribute to store the value
                                        className="p-4 hover:bg-slate-600 ease-in-out duration-300 hover:text-white"
                                      >
                                        All
                                      </div>
                                      <div
                                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={toggleDropdown}
                                      >
                                        <TfiClose />
                                      </div>
                                    </div>
                                  )}
                                </th>
                              </tr>
                            </thead>
                          )}
                          {/* i removed 200px pb from bellow */}
                          <tbody className="cursor-pointer  ">
                            {currentPost.map((user: any) => (
                              <tr
                                key={user.id}
                                className="border-gray-200 hover:bg-gray-100"
                              >
                                <td className="border-t py-4 p-1 text-left font-Poppins text-lightGray">
                                  {convertDateTime(user.updatedAt)}
                                </td>
                                <td className="border-t py-4 p-2 text-left text-lightGray font-Poppins text-sm font-normal">
                                  {user.guestName ? (
                                    user.guestName
                                  ) : (
                                    <p className="text-gray-300 cursor-not-allowed">
                                      No Guest Name
                                    </p>
                                  )}
                                </td>

                                <td
                                  onClick={() => handleTabs(user.id)}
                                  className=" border-t py-4 p-2 text-blue-800 active:text-green-400 text-left hover:text-red-500 font-Poppins text-sm font-normal"
                                >
                                  {user.fileOwnerEmail}
                                </td>
                                <td className="border-t py-4 p-2 text-left text-lightGray hover:text-green-500 font-Poppins text-sm font-normal px-3">
                                  <a
                                    href={`https://dev.paperlink.app/pdf/${user.file.paperLink}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {user.fileName}
                                  </a>
                                </td>
                                <td className="border-t py-4 p-2 text-center text-lightGray font-Poppins text-sm font-normal px-6">
                                  {user.file.pages}
                                </td>
                                <td className="border-t py-4 text-center text-lightGray font-Poppins text-sm font-normal px-3">
                                  <span
                                    className="status"
                                    style={makeStyle(user.action)}
                                  >
                                    {user.action}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      {/* the correct logic to show no users please make this a hook next time to avoid copy and paste */}
                      {!error && users.length === 0 && !loading && (
                        // when there are no records
                         <Empty activeTab={activeTab} searchValue={searchValue}/>
                      )}
                      {error && <ErrorMessage message={error} />}
                    </div>
                  )}

                  {/* Mobile view Display mb-[200px] */}

                  {loading ? (
                    <div className="md:hidden">
                      <Loader />
                    </div>
                  ) : (
                    // i also removed padding bottom from here
                    <div className="md:hidden max-h-[400px] text-xs overflow-y-auto">
                      {recordFound &&
                        currentPost.map((user: any) => (
                          <div
                            onClick={() => handleMobileUserClick(user.id)} // Handle user row click
                            key={user.id}
                            className="flex gap-2 justify-between p-3 shadow-lg hover:shadow-2xl hover:bg-gray-200 rounded-md my-2"
                          >
                            {selectedUserId === user.id && (
                              <div className="flex flex-col justify-start items-start align-middle flex-1">
                                <span className="text-black flex text-[12px]">
                                  {convertDateTime(user.updatedAt)}
                                </span>
                                <div
                                  // onClick={() => handleTabs(user.id)}
                                  className="text-blue-800 underline flex text-[12px] p-2 "
                                >
                                  {user.user.email}
                                </div>
                              </div>
                            )}
                            <div className="flex flex-col justify-start items-start align-middle flex-1">
                              <span className="text-black flex text-[12px]]">
                                {user.file.paperLink}
                              </span>
                              <div className="text-black text-center flex text-[12px]">
                                Pages: {user.file.pages}
                              </div>
                              <div className="text-black flex text-[12px]">
                                User: {user.guestName}
                              </div>
                              <span
                                className="text-black text-[12px] font-extrabold"
                                style={makeStyle(user.action)}
                              >
                                {user.action}
                              </span>
                            </div>
                          </div>
                        ))}
                      {/* if there are no search */}
                      {records && (
                        <div className="h-[50vh] w-full mx-auto flex text-center font-extralight mt-3 flex-col">
                          <h2>
                            Search complete! Sorry, No Records Found for "
                            {searchValue}"
                          </h2>
                          <div className="h-[100%] w-full flex justify-center ">
                            <Lottie animationData={noRecords} />
                          </div>
                        </div>
                      )}
                      {error && <ErrorMessage message={error} />}
                    </div>
                  )}
                </div>
                {/* Pagination for all view */}
                <div className="w-full bg-slate-100 flex justify-center">
                  {prevButton} {paginationButtons} {viewAllButton} {nextButton}
                </div>
              </>
            ) : (
             <Empty activeTab={activeTab} searchValue={undefined}/>
            )}
          </div>
        </div>
      ) : (
        <div>
          <UserTabrow selectedUserId={selectedUserId} users={users} />
        </div>
      )}
    </div>
  );
};
export default User;
