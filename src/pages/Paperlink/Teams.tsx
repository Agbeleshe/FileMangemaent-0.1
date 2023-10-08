import React, { useEffect, useState } from "react";
import SearchGreen from "../../components/svg-icons/SearchGreen";
import useInFor from "../../hooks/UseInFor";
import { Infor } from "./resources/Infor";
import { TfiClose } from "react-icons/tfi";
import SearchBar from "./resources/SearchBar";
import Loader from "./resources/Loader";
import ErrorMessage from "./resources/ErrorMessage";
import useAccountPagination from "../../hooks/useAccountPagination";
import convertDateTime from "./resources/DateConverter";

const makeStyle = (status: string) => {
  if (status === "New Trial") {
    return {
      color: "purple",
    };
  }
   else if (status === "Removed") {
    return {
      color: "red",
    };
  } 
  else if (status === "active") {
    return {
      color: "green",
    };
  } else {
    return {
      color: "gray",
    };
  }
};

const Teams = () => {
  const [inputClick, setInputClick] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [records, setRecords] = useState(false);
  const { loading, users, error } = useInFor(searchValue);
  const [filterAll, setFilterAll] = useState(false);
  const {
    currentPost,
    paginationButtons,
    nextButton,
    prevButton,
    viewAllButton,
  } = useAccountPagination();

  // For Postman URL and calculating total pages
  const totalPages = calculateTotalPages(users);

  // useEffect to fetch info from the Postman URL
  const handleInputClick = () => {
    setInputClick(!inputClick);
    setSearchValue("");
    // setFilterAll(false);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // setFilterAll(true);
  };

  const filteredUsers = filterAll
    ? users.filter(
        (user: any) =>
          user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.companyName.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.status.toLowerCase().includes(searchValue.toLowerCase())
      )
    : currentPost.filter(
        (user: any) =>
          user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.companyName.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.status.toLowerCase().includes(searchValue.toLowerCase())
      );

  // Page calculation
  function calculateTotalPages(users: Infor[]) {
    let totalPages = 0;
    for (const user of users) {
      totalPages += user.totalPages;
    }
    return totalPages;
  }



  const recordFound = filteredUsers.length > 0;

  // display of no records
  useEffect(() => {
    if (filteredUsers.length === 0 && inputClick) {
      setRecords(true);
    } else {
      setRecords(false);
    }
  }, [filteredUsers, inputClick]);

  //pagination Logic
  return (
    <div className="border-radius-[0.9375rem] bg-white mb-[150px] width-[65.75rem] h-auto  overflow-hidden font-Poppins rounded-t-lg">
      <div className="bg-secondaryColor flex justify-between height-[5.3125rem] px-4 py-2 rounded-t-lg">
        <div className="border-b-0 text-lightGray font-medium leading-normal text-lg  md:text-2xl">
          Teams
        </div>
        <div className="border-b-0 flex gap-3">
          {!inputClick ? (
            ""
          ) : (
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
        <>
          <div className="hidden md:inline">
            <table className="w-full p-10 table-hover user-table">
              <thead className="">
                <tr className=" ">
                  <th className="py-5 pl-5 p-2 text-left font-medium text-black text-sm flex items-center">
                    Teams Email
                  </th>

                  <th className="border-b p-2 text-left font-medium text-black text-sm">
                    Account Email
                  </th>
                  <th className="border-b p-2  text-left font-medium text-black text-sm">
                    Bussiness Name
                  </th>
                  <th className="border-b px-4 py-3 text-left font-medium text-black text-sm ">
                    Created
                  </th>
                  <th className="border-b p-2 text-left font-medium text-black text-sm">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className=" cursor-pointer">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className=" border-gray-200 hover:bg-gray-100 pl-5"
                  >
                    <td className=" pl-5 border-t py-4 p-2 text-left font-Poppins text-lightGray">
                      {user.email}
                    </td>

                    <td className=" border-t py-4 text-left text-lightGray font-Poppins text-sm font-normal">
                      {user.email}
                    </td>
                    <td className=" border-t py-4 px-4 text-left text-lightGray font-Poppins text-sm font-normal">
                      {user.companyName}
                    </td>
                    <td className=" border-t py-4 text-left text-lightGray font-Poppins text-sm font-normal ">
                      <div className="flex flex-col px-2">{convertDateTime(user.createdAt)}</div>
                    </td>
                    <td className=" border-t py-4 text-left text-lightGray font-Poppins text-sm font-normal  px-2">
                      <span className="status" style={makeStyle(user.status)}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="md:hidden">
            <div className="md:hidden max-h-auto p-3">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex gap-2 justify-between p-3 shadow-lg hover:shadow-2xl hover:bg-gray-200 rounded-md my-2 "
                >
                  <div className="flex flex-col justify-start items-start align-middle flex-1 ">
                    <span className="text-black flex text-[12px]">
                    {convertDateTime(user.createdAt)}
                    </span>
                    <div className=" flex text-[12px] px-2">{user.companyName}</div>
                   
                  </div>
                  <div className="flex flex-col justify-start items-start align-middle flex-1 ">
                  <span
                      className="text-black text-[12px] font-extrabold"
                      style={makeStyle(user.status)}
                    >
                      {user.status}
                    </span>
                    <span className="text-blue-800 underline text-[12px]">
                      {user.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full bg-slate-100 flex justify-center ">
            {prevButton} {paginationButtons} {viewAllButton} {nextButton}
          </div>
        </>
      )}

      {/* other errors */}
      {error && (
        <ErrorMessage message="An error occurred while fetching data" />
      )}
      {records && (
        <div className="text-center py-4 w-full bg-green-300 text-2xl text-green-700">
          Search complete. No record found
        </div>
      )}
    </div>
  );
};

export default Teams;
