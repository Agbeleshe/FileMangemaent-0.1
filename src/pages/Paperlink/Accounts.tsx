import React, { useState, useEffect } from "react";
import { TfiClose } from "react-icons/tfi";
import Loader from "./resources/Loader";
import ErrorMessage from "./resources/ErrorMessage";
import SearchBar from "./resources/SearchBar";
import SearchGreen from "../../components/svg-icons/SearchGreen";
import WhitePlus from "../../components/svg-icons/WhitePlus";
import Tabrow from "../../utils/Tabrow";
import Calender from "../../assests/Calendar.png";
import useInFor from "../../hooks/APIrequest/UseInFor";
import convertDateTime from "./resources/DateConverter";
import AddAccount from "./resources/AddAccount";
import useAccountPagination from "../../hooks/Paginations/useAccountPagination";
import Arrow from "../../components/svg-icons/Arrow";
import useAccApi from "../../hooks/APIrequest/useAccApi";
import DateRangePickerCalendarExample from "../../hooks/Others/DateRangePicker";

const makeStyle = (status: string) => {
  let color = "";
  if (status === "New Trial") {
    color = "gray";
  } else if (status === "active" || "Active Paid") {
    color = "green";
  } else if (status === "Pause") {
    color = "skyblue";
  } else if (status === "Cancel") {
    color = "purple";
  } else if (status === "Delete") {
    color = "red";
  }
  return {
    color,
  };
};

const Accounts = () => {
  const [inputClick, setInputClick] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [records, setRecords] = useState(false);
  const [modalOne, setModalOne] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [tabs, setTabs] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(""); // Initialize with a default filter value
  const [filterAll, setFilterAll] = useState(false);
  // const [searchTerms, setSearchTerms] = useState("");
  const [selectedDate, setSelectedDate] = useState(false);
  const [timeFilter, setTimeFilter] = useState<any>([null, null]);

  //fetching data
  const { loading, users, error, setIsDatePicked, isDatePicked } = useAccApi(
    searchValue,
    selectedFilter,
    timeFilter[0],
    timeFilter[1]
  );
  // const { loading, users, error } = useInFor(
  //   searchValue,
  //   selectedFilter,
  //   searchTerms
  // );

  //paginated data
  const {
    currentPost,
    paginationButtons,
    nextButton,
    prevButton,
    viewAllButton,
  } = useAccountPagination(
    1,
    searchValue,
    selectedFilter,
    users,
    filterAll,
    isDatePicked!
  );
  console.log("is date picked: ", isDatePicked);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  const handleInputClick = () => {
    setInputClick(!inputClick);
    setSearchValue("");
  };

  // const filteredUsers = filterAll
  //   ? users.filter(
  //       (user: any) =>
  //         user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         user.companyName.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         user.status.toLowerCase().includes(searchValue.toLowerCase())
  //     )
  //   : currentPost.filter(
  //       (user: any) =>
  //         user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         user.companyName.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         user.status.toLowerCase().includes(searchValue.toLowerCase())
  //     );

  const recordFound = currentPost.length > 0;

  useEffect(() => {
    if (currentPost.length === 0 && inputClick) {
      setRecords(true);
    } else {
      setRecords(false);
    }
  }, [currentPost, inputClick]);
  //tabs redirect
  const handleTabs = (userId: number) => {
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
  // handling the date picker
  const getDateValuesFunc = (start: number, end: number) => {
    setTimeFilter([start, end]);
    start && end && handleCloseSelectedDate();

    // emergency
    // setTimeout(() => {
    //   handleCloseSelectedDate();
    // }, 1000);
    // console.log(start, end);
  };

  // Green plus sign modal
  const handleModalOne = () => {
    setModalOne(!modalOne);
  };

  const handleModalClose = () => {
    setModalOne(false);
  };
  //for status
  const handleStatusFilter = (e: any) => {
    const selectedValue = e.target.getAttribute("data-value"); // Get the data-value attribute
    setSelectedFilter(selectedValue); // Update the selected filter state
    console.log(selectedValue);

    //to see evry data concerning that field you use filter all which will reomve pagination
    setFilterAll(true);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setFilterAll(false);
  };

  return (
    <div className=" mb-[150px] border-radius-[0.9375rem] bg-white width-[65.75rem] h-auto overflow-hidden font-Poppins rounded-t-lg">
      {tabs ? (
        <div>
          <div className="bg-secondaryColor flex justify-between px-4 md:py-2 rounded-t-lg">
            <div
              className={`border-b-0 text-lightGray flex items-center md:items-start font-medium leading-normal text-lg md:text-2xl ${
                inputClick ? "md:inline hidden" : ""
              }`}
            >
              Accounts
            </div>
            <div className="border-b-0 flex w-full justify-end ">
              <span className="  inline-flex items-center justify-center h-12 flex-shrink-0 fill-current rounded-full shadow-drop mr-6 ">
                <div className="border-b-0 flex gap-3">
                  {!inputClick ? (
                    ""
                  ) : (
                    <div className=" bottom-0 border-1 border-green-300 ">
                      <SearchBar
                        onSearch={(value) => handleSearch(value)}
                        inputClick={inputClick}
                        placeholder="Search users..."
                      />
                    </div>
                  )}
                  {!inputClick ? (
                    <button
                      type="button"
                      onClick={handleInputClick}
                      className="inline-flex items-center justify-center h-7 w-7 md:w-12 md:h-12 flex-shrink-0 fill-current bg-white rounded-full shadow-drop outline-none"
                    >
                      <SearchGreen />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleInputClick}
                      className="inline-flex items-center justify-center h-7 w-7 md:w-12 md:h-12 flex-shrink-0 fill-current bg-slate-700 transition-all ease-in-out duration-700 hover:bg-red-500 rounded-full shadow-drop outline-none"
                    >
                      <TfiClose color="white" />
                    </button>
                  )}
                </div>
              </span>
              <div className="border-b-0 h-full items-center flex">
                <span
                  onClick={handleModalOne}
                  className="inline-flex items-center justify-center h-7 w-7 md:w-12 md:h-12 flex-shrink-0 fill-current active:bg-slate-300 bg-green-500 rounded-full shadow-drop"
                >
                  <WhitePlus />
                </span>
                {modalOne ? (
                  <AddAccount handleModalClose={handleModalClose} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <>
              <div className="md:hidden ">
                {/* if there are records display this */}
                {recordFound ? (
                  <div className="flex flex-col w-full p-3 justify-center align-middle text-sm ">
                    {currentPost.map((user) => (
                      <div
                        key={user.id}
                        className="shadow-xl my-5 rounded-xl w-full hover:bg-slate-200 "
                      >
                        <div className="w-full mt-3 text-center mb-2 rounded-t-xl  border-2 border-gray-300 p-3">
                          <span
                            onClick={() => handleTabs(user.id)}
                            className="text-blue-700 underline ml-3"
                          >
                            {user.email}
                          </span>
                        </div>
                        <div className=" text-sm justify-center text-center flex">
                          Business name: {user.companyName}
                        </div>
                        <div
                          className="text-center"
                          style={makeStyle(user.status)}
                        >
                          Status: {user.status}
                        </div>
                        <div className=" w-full flex justify-between text-green-800 bg-green-300 p-2 rounded-b-xl">
                          Date/time: {convertDateTime(user.createdAt)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {/* If there are no records display this */}
                    {error && <ErrorMessage message={error} />}
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
              {/* Desktop view */}
              <div className="hidden md:inline w-full">
                {recordFound ? (
                  <table className="w-full table-hover user-table">
                    <thead className="p-5">
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
                        <th className="border-b px-4 py-3 text-left font-medium text-darkGray text-sm">
                          Account Email
                        </th>
                        <th className="border-b  py-3 text-left font-medium text-darkGray text-sm">
                          Business Name
                        </th>
                        <th className="p-2 relative justify-center  text-center font-bold text-darkGray text-sm flex items-center z-10">
                          <span className="flex justify-center items-center align-middle">
                            <div
                              className="flex gap-2 font-extrabold items-center cursor-pointer justify-center w-full px-4 pt-5 text-sm  text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                                data-value="active" // Assign a data attribute to store the value
                                className="p-4 hover:bg-slate-600 ease-in-out duration-300 hover:text-white"
                              >
                                active
                              </div>
                              <div
                                onClick={handleStatusFilter}
                                data-value="Pause" // Assign a data attribute to store the value
                                className="p-4 hover:bg-slate-600 ease-in-out duration-300 hover:text-white"
                              >
                                Pause
                              </div>
                              <div
                                onClick={handleStatusFilter}
                                data-value="Cancel" // Assign a data attribute to store the value
                                className="p-4 hover:bg-slate-600 ease-in-out duration-300 hover:text-white"
                              >
                                Cancel
                              </div>
                              <div
                                onClick={handleStatusFilter}
                                data-value="Delete" // Assign a data attribute to store the value
                                className="p-4 hover:bg-slate-600 ease-in-out duration-300 hover:text-white"
                              >
                                Delete
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
                    <tbody className="cursor-pointer">
                      {currentPost.map((user) => (
                        <tr
                          key={user.id}
                          className=" border-gray-200 hover:bg-gray-100"
                        >
                          <td className=" border-t py-3 px-3 text-left font-Poppins text-lightGray">
                            <div className="flex flex-col">
                              <p className="text-lightGray font-Poppins font-normal leading-normal px-3 text-sm">
                                {convertDateTime(user.createdAt)}
                              </p>
                            </div>
                          </td>

                          <td
                            onClick={() => handleTabs(user.id)}
                            className=" border-t py-4 hover:text-red-500 underline  text-blue-500 font-Poppins text-sm font-normal px-3 text-left"
                          >
                            {user.email}
                          </td>
                          <td className=" border-t py-4 px-2 text-left text-lightGray font-Poppins text-sm font-normal">
                            {user.companyName}
                          </td>

                          <td className="border-t py-4 px-3  text-center text-lightGray font-Poppins text-sm font-normal ">
                            <span
                              className="status"
                              style={makeStyle(user.status)}
                            >
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div>
                    {/* If there are no records display this */}
                    {error && <ErrorMessage message={error} />}
                  </div>
                )}
                {!currentPost.length &&
                  <div className="text-center py-4 w-full bg-green-300 text-2xl text-green-700">
                    Search complete. No record found
                  </div>
                }
              </div>
            </>
          )}
          <div className="w-full bg-slate-100 flex justify-center ">
            {prevButton} {paginationButtons} {viewAllButton} {nextButton}
          </div>
        </div>
      ) : (
        <div>
          <Tabrow selectedUserId={selectedUserId} users={users} />
        </div>
      )}
    </div>
  );
};

export default Accounts;
