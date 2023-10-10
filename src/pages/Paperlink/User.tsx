import React, { useEffect, useState } from "react";
import Calender from "../../assests/Calendar.png";
import SearchGreen from "../../components/svg-icons/SearchGreen";
import { TfiClose } from "react-icons/tfi";
import Loader from "./resources/Loader";
import ErrorMessage from "./resources/ErrorMessage";
import SearchBar from "./resources/SearchBar";
import useInFor from "../../hooks/APIrequest/UseInFor";
import useLedger from "../../hooks/APIrequest/useLedger";
import useUserPagination from "../../hooks/Paginations/useUserPagination";
import convertDateTime from "./resources/DateConverter";
import Arrow from "../../components/svg-icons/Arrow";
import UserTabrow from "../Paperlink/resources/UserTabeow/UserTabrow";

import { Ledger } from "./resources/Ledger";

import "./User.css";

const makeStyle = (status: string) => {
  if (status === "complete") {
    return {
      color: "green",
    };
  } else if (status === "sign") {
    return {
      color: "skyblue",
    };
  } else if (status === "confirm") {
    return {
      color: "blue",
    };
  } else if (status === "Delete") {
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
  const [selectedFilter, setSelectedFilter] = useState(""); // Initialize with a default filter value
  const [isOpen, setIsOpen] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const {
    currentPost,
    paginationButtons,
    nextButton,
    prevButton,
    viewAllButton,
  } = useUserPagination();

  const { loading, users, error } = useLedger(searchValue);
  console.log(users, "from User.tsx");


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // For Postman URL and calculating total pages
  const totalPages = calculateTotalPages(users);

  // useEffect to fetch info from the Postman URL
  const handleInputClick = () => {
    setInputClick(!inputClick);
    setSearchValue("");

    //this logic is very important to help us make the pagination button disapear when searching for users and appear when done that is whe the 'x' button is clicked
    setFilterAll(!filterAll);
    // console.log(filterAll, 'when i click on the seach icon')
  };

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    setSearchValue(trimmedValue);
    // setFilterAll(true);
  };

  const handleStatusFilter = (e: any) => {
    const selectedValue = e.target.getAttribute("data-value"); // Get the data-value attribute
    setSelectedFilter(selectedValue); // Update the selected filter state
    setSearchValue(selectedValue); // Clear the search value
    console.log(selectedValue);

    //to see evry data concerning that field you use filter all which will reomve pagination
    setFilterAll(true);
  };

  const filteredUsers = filterAll
    ? users.filter(
        (users: any) =>
          users.user.firstName
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          users.user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          users.file.paperLink
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          users.file.fileAction
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          users.file.paperLink.toLowerCase().includes(searchValue.toLowerCase())
      )
    : currentPost.filter(
        (users: any) =>
          users.user.firstName
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          users.user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          users.file.paperLink
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          users.file.fileAction
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          users.file.paperLink.toLowerCase().includes(searchValue.toLowerCase())
      );

  // Page calculation
  function calculateTotalPages(users: Ledger[]) {
    let totalPages = 0;
    for (const user of users) {
      totalPages += user.file.pages;
    }

    return totalPages;
  }
  console.log(users);

  //because length start fron 0
  const recordFound = filteredUsers.length > -1;

  // display of no records
  useEffect(() => {
    if (filteredUsers.length > -1 && inputClick) {
      setRecords(true);
    } else {
      setRecords(false);
    }
  }, [filteredUsers, inputClick]);

  console.log(users);

  // Function to handle clicking on a user row and display additional information
  const handleMobileUserClick = (userId: number) => {
    setSelectedUserId(selectedUserId === userId ? null : userId); // Toggle selected user
  };

  // const handleEmail = () => {
  //   alert("clicked");
  // };

  //tabs redirect
   const handleTabs = (userId: any) => {
     setSelectedUserId(userId);
     setTabs(false);
   };

  const dataToMap = filterAll ? users : currentPost;

  console.log("Search Value:", searchValue);
  console.log("Data to Filter:", users); // or currentPost
  console.log("Filtered Users:", filteredUsers);
  return (
    <div className="mb-20">
      {!tabs ? (
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
          <div className="md:overflow-x-auto">
            {/* Table for wide screens */}
            {loading ? (
              <div className="hidden md:inline">
                <Loader />
              </div>
            ) : (
              <div className="hidden md:block">
                {recordFound ? (
                  <table className="md:w-full md:table-hover md:user-table">
                    <thead>
                      <tr>
                        <th
                          className=" px-4 py-4 text-left font-medium text-darkGray text-sm"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          Date/Time
                          <span className="inline-flex items-center ml-2">
                            <img src={Calender} alt="" />
                          </span>
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
                    {/* i removed 200px pb from bellow */}
                    <tbody className="cursor-pointer  ">
                      {dataToMap.map((user: any) => (
                        <tr
                          key={user.id}
                          className="border-gray-200 hover:bg-gray-100"
                        >
                    
                          <td className="border-t py-4 p-1 text-left font-Poppins text-lightGray">
                            {convertDateTime(user.updatedAt)}
                          </td>
                          <td className="border-t py-4 p-2 text-left text-lightGray font-Poppins text-sm font-normal">
                            {user.user.guestName
                              ? user.user.guestName
                              : "No Guest Name"}
                          </td>
                          <td
                            onClick={() => handleTabs(user.id)}
                            className=" border-t py-4 p-2 text-blue-800 active:text-green-400 text-left hover:text-red-500 font-Poppins text-sm font-normal"
                          >
                            {user.user.email}
                          </td>
                          <td className="border-t py-4 p-2 text-left text-lightGray hover:text-green-500 font-Poppins text-sm font-normal px-3">
                            <a
                              href={`https://dev.paperlink.app/pdf/${user.file.paperLink}`}
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
                              style={makeStyle(user.file.fileAction)}
                            >
                              {user.file.fileAction}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div>{error && <ErrorMessage message={error} />}</div>
                )}
                {/* the correct logic to show no users please make this a hook next time to avoid copy and paste */}
                {users.length === 0 && (
                  <div className="text-center py-4 w-full bg-green-300 text-2xl text-green-700">
                    Search complete. No record found
                  </div>
                )}
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
                {recordFound ? (
                  filteredUsers.map((user: any) => (
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
                          User: {user.user.firstName}
                        </div>
                        <span
                          className="text-black text-[12px] font-extrabold"
                          style={makeStyle(user.file.fileAction)}
                        >
                          {user.file.fileAction}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>{error && <ErrorMessage message={error} />}</div>
                )}
                {/* if there are no search */}
                {records && (
                  <div className="text-center py-4 w-full bg-green-300 text-sm text-green-700">
                    Search complete. No record found
                  </div>
                )}
              </div>
            )}
          </div>

          {(!filterAll || !records) && (
            // This condition will make pagination disappear when filter or search is triggered.
            <div className="w-full bg-slate-100 flex justify-center">
              {prevButton} {paginationButtons} {viewAllButton} {nextButton}
            </div>
          )}
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
