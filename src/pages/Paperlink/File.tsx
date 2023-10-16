import React, { useEffect, useState, useRef } from "react";
import Calender from "../../assests/Calendar.png";
import SearchGreen from "../../components/svg-icons/SearchGreen";
import { UsersInfo } from "./resources/UsersInfo";
import Loader from "./resources/Loader";
import ErrorMessage from "./resources/ErrorMessage";
import { TfiClose } from "react-icons/tfi";
import SearchBar from "./resources/SearchBar";
import convertDateTime from "./resources/DateConverter";
import useFetchUsers from "../../hooks/APIrequest/useFetchUsers";
import usePagination from "../../hooks/Paginations/usePagination";
import FileTabRow from "./resources/FileTabrow/FileTabRow";
import Arrow from "../../components/svg-icons/Arrow";
import DateRangePickerCalendarExample from "../../hooks/Others/DateRangePicker";

const makeStyle = (status: string) => {
  if (status === "Active") {
    return {
      color: "green",
    };
  } else if (status === "Removed") {
    return {
      color: "red",
    };
  } else if (status === "Suspended") {
    return {
      color: "skyblue",
    };
  } else {
    return {
      color: "gray",
    };
  }
};

const File = () => {
  const [inputClick, setInputClick] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [records, setRecords] = useState(false);
  const [filterAll, setFilterAll] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [tabs, setTabs] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(""); // Initialize with a default filter value
  const [selectedDate, setSelectedDate] = useState(false);
  const [timeFilter, setTimeFilter] = useState<any>([null, null]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //fetch from axios api
  const { users, error, loading, setIsDatePicked, isDatePicked } =
    useFetchUsers(searchValue, selectedFilter, timeFilter[0], timeFilter[1]);

  //paginated data
  const {
    currentPost,
    paginationButtons,
    prevButton,
    nextButton,
    viewAllButton,
  } = usePagination(
    1,
    searchValue,
    selectedFilter,
    users,
    filterAll,
    isDatePicked!
  );

  console.log("is date picked: ", isDatePicked);

  const totalPages = calculateTotalPages(users);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setFilterAll(!filterAll);
  };

  //this is the client side logic for search just incase something happens to the server the admin can still fetch available users

  console.log(users);
  // Page calculation
  function calculateTotalPages(users: UsersInfo[]) {
    let totalPages = 0;
    for (const user of users) {
      totalPages += user.pages;
    }
    return totalPages;
  }

  //for openSearch
  const handleInputClick = () => {
    setInputClick(!inputClick);
    setSearchValue("");
    setFilterAll(false);
    console.log(filterAll);
  };

  // display of no records
  useEffect(() => {
    if (currentPost.length === 0 && inputClick) {
      setRecords(true);
    } else {
      setRecords(false);
    }
  }, [currentPost, inputClick]);

  // Function to handle clicking on a user row and display additional information
  const handleMobileUserClick = (userId: number) => {
    setSelectedUserId(selectedUserId === userId ? null : userId); // Toggle selected user
  };

  //tabs redirect
  const handleTabs = (userId: any) => {
    setSelectedUserId(userId);
    setTabs(false);
  };

  //handle modal of the date open
  const handleSelectedDate = () => {
    setSelectedDate(true);
  };

  //handle modal of the date close
  const handleCloseSelectedDate = () => {
    setSelectedDate(false);
    console.log(selectedDate);

    // //condition to close modal TEST COMMAND
    // if (event.target === event.currentTarget) {
    //    setSelectedDate(!selectedDate);
    //    console.log(selectedDate);
    // }
  };
  //handling the date picker
  const getDateValuesFunc = (start: number, end: number) => {
    setTimeFilter([start, end]);
    start && end && handleCloseSelectedDate();

    // emergency
    // setTimeout(() => {
    //   handleCloseSelectedDate();
    // }, 1000);
    // console.log(start, end);
  };

  //for status
  const handleStatusFilter = (e: any) => {
    const selectedValue = e.target.getAttribute("data-value"); // Get the data-value attribute
    setSelectedFilter(selectedValue); // Update the selected filter state
    setSearchValue(selectedValue); // Clear the search value
    console.log(selectedFilter);

    //to see evry data concerning that field you use filter all which will reomve pagination
    setFilterAll(true);
  };

  return (
    <div className="mb-[150px] border-radius-[0.9375rem] bg-white width-[65.75rem] h-auto overflow-hidden font-Poppins rounded-t-lg">
      {tabs ? (
        <>
          <div className="bg-secondaryColor flex justify-between height-[5.3125rem] px-4 py-2 rounded-t-lg">
            <div
              className={`border-b-0 text-lightGray font-medium leading-normal ${
                inputClick ? "text-xs" : "text-lg"
              } md:text-2xl`}
            >
              File Manager
            </div>
            <div className="border-b-0 flex gap-3">
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
          <div className="hidden md:inline">
            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : (
              <table className="w-full table-hover user-table">
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
                    <th className="border-b p-2  text-left font-bold text-darkGray text-sm">
                      File Name
                    </th>
                    <th className="border-b p-2 text-left  font-bold text-darkGray text-sm">
                      Upload By
                    </th>
                    <th className="border-b px-4 py-3 text-center font-bold text-darkGray text-sm ">
                      Pages
                      <span className=" px-2 p-1 justify-center gap-5  rounded-full bg-blue text-white text-xs ml-2">
                        {totalPages}
                      </span>
                    </th>
                    <th className="p-2 relative  text-center font-bold text-darkGray text-sm flex items-center z-10">
                      <span className="flex justify-center items-center align-middle">
                        <div
                          className="flex gap-2 font-extrabold items-center cursor-pointer justify-center w-full px-4 pt-5 text-sm  text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={toggleDropdown}
                        >
                          <p>Status</p>
                          <Arrow />
                        </div>
                      </span>
                      {isOpen && (
                        <div className="absolute top-[70px] inline-block outline-none m-auto ease-in-out duration-1000 h-auto z-10 w-full left-0 cursor-pointer bg-gray-200 shadow-lg">
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
                {/* Desktop view */}
                <tbody className="cursor-pointer">
                  {currentPost.map((user: any) => (
                    <tr
                      key={user.id}
                      className=" border-gray-200 hover:bg-gray-100"
                    >
                      <td className=" border-t py-4 p-2 text-left font-Poppins text-lightGray">
                        <div className="flex flex-col px-2">
                          <p className="text-lightGray font-Poppins text-left font-normal leading-normal px-2 text-sm">
                            {convertDateTime(user.createdAt)}
                          </p>
                        </div>
                      </td>
                      <td className=" border-t py-4 text-left text-lightGray  hover:text-green-500 font-Poppins text-sm font-normal">
                        <a
                          href={`https://dev.paperlink.app/pdf/${user.paperLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user.fileName}
                        </a>
                      </td>
                      <td
                        onClick={() => handleTabs(user.id)}
                        className=" border-t py-4 text-cente px-2 hover:text-red-500 underline  text-blue-500 font-Poppins text-sm font-normal"
                      >
                        {user.user.email}
                      </td>
                      <td className=" border-t py-4 text-center text-lightGray font-Poppins text-sm font-normal px-4">
                        {user.pages}
                      </td>
                      <td className=" border-t py-4 text-center text-lightGray font-Poppins text-sm font-normal  px-2">
                        <span
                          className="status"
                          style={makeStyle(user.fileAction)}
                        >
                          {/* we need to use Status which the API end point is not provided yet */}
                          {user.fileAction}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!records ? (
              ""
            ) : (
              <div className="text-center py-4 w-full bg-green-300 text-2xl text-green-700">
                Search complete. No record found
              </div>
            )}
          </div>
          {/* Mobile view */}
          <div className="md:hidden overflow-y-auto">
            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : (
              <div className="md:hidden max-h-[400px] p-3 text-xs">
                {currentPost.map((user: any) => (
                  <div
                    onClick={() => handleMobileUserClick(user.id)} // Handle user row click
                    key={user.id}
                    className="flex gap-2 justify-between p-3 shadow-lg hover:shadow-2xl hover:bg-gray-200 rounded-md my-2 "
                  >
                    {selectedUserId === user.id && (
                      <div className="flex flex-col justify-start items-start align-middle flex-1 ">
                        <span className="text-black flex text-[12px]">
                          {convertDateTime(user.createdAt)}
                        </span>
                        <div className=" flex text-[12px] px-2  text-lightGray hover:text-green-500">
                          <a
                            href={`https://dev.paperlink.app/pdf/${user.paperLink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {user.file.fileName}
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col justify-start items-start align-middle flex-1 ">
                      <div className="text-black flex text-[12px]">
                        Pages: {user.pages}
                      </div>

                      <span
                        className="text-black text-[12px] font-extrabold"
                        style={makeStyle(user.fileAction)}
                      >
                        {user.fileAction}
                      </span>
                      <span
                        onClick={() => handleTabs(user.id)}
                        className="active:text-red-500 underline text-[12px] text-blue-800"
                      >
                        {user.user.email}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!records ? (
              ""
            ) : (
              <div className="text-center py-4 w-full bg-green-300 text-2xl text-green-700">
                Search complete. No record found
              </div>
            )}
          </div>
          <div className="w-full bg-slate-100 flex justify-center mt-3 ">
            {prevButton} {paginationButtons} {viewAllButton} {nextButton}{" "}
          </div>
        </>
      ) : (
        <>
          <div>
            <FileTabRow selectedUserId={selectedUserId} users={users} />
          </div>
        </>
      )}
    </div>
  );
};

export default File;
