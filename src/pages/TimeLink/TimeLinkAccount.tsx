import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import SearchGreen from "../../components/svg-icons/SearchGreen";
import WhitePlus from "../../components/svg-icons/WhitePlus";

interface TableRow {
  Date: string;
  Time:string;
  Email: string;
  BusinessName: string;
  SignInLink:string;
  status: string;
}
function TableData(
  Date: string,
  Time:string,
  Email: string,
  BusinessName: string,
SignInLink:string,
  status: string
): TableRow {
  return { Date,Time, Email, BusinessName,SignInLink, status };
}
const rows: TableRow[] = [
  TableData(
    "26/08/2023","01:50am",
    "mamagre@gmail.com",
    "New paitient",
    "SIN0394035",
    "New Trial"
  ),
  TableData("2/7/2023", "01.50am","oo@gmsil.com", "Hippa privacy ","SIN0394035", "Active Paid"),
];

const makeStyle = (status: string) => {
  let color = "";
  if (status === "New Trial") {
    color = " var(--ter1, #AD52F5)";
  } else if (status === "Active Paid") {
    color = "green";
  } else if (status === "Pause") {
    color = "blue";
  } else if (status === "Cancel") {
    color = "orange";
  } else if (status === "Delete") {
    color = " #FA00FF ";
  }
  return {
    color,
  };
};

const TimeLinkAccount = () => {
  const location = useLocation();
  const [tabs, setTabs] = useState(true);

  const handleTabs = () => {
    setTabs(false);
  };

  const handleClose = () => {
    setTabs(true);
  };

  return (
    <div className="border-radius-[0.9375rem] bg-white width-[50rem] h-auto overflow-hidden font-Poppins">
      {tabs ? (
        <div>
          <div className="bg-secondaryColor flex justify-between height-[5.3125rem] px-4 py-2 rounded-t-lg">
            <div className="border-b-0 text-lightGray font-medium leading-normal text-2xl ">
            Account Information
            </div>
            <div></div>
            <div className="border-b-0 ">
              <span className="inline-flex items-center justify-center w-12 h-12 flex-shrink-0 fill-current bg-white rounded-full shadow-drop mr-6 ">
                <SearchGreen />
              </span>
              <span className="inline-flex items-center justify-center w-12 h-12 flex-shrink-0 fill-current bg-green-500 rounded-full shadow-drop">
                <WhitePlus />
              </span>
            </div>
          </div>
          <table className="w-full table-hover user-table">
            <thead>
              <tr>
                <th className="border-b px-4 py-5  text-left font-medium text-darkGray text-sm ">
                  Date
                </th>
                <th className="border-b px-4 py-5  text-left font-medium text-darkGray text-sm ">
                  Time
                </th>

                <th className="border-b px-4 py-3 text-left font-medium text-darkGray text-sm">
                   Email
                </th>
                <th className="border-b px-4 py-3 text-center font-medium text-darkGray text-sm">
                  Bussiness Name
                </th>
                <th className="border-b px-4 py-3 text-center font-medium text-darkGray text-sm">
                Signinlink#
                </th>

                <th className="border-b px-4 py-3  text-left font-medium text-darkGray text-sm">
                  Status
                </th>
              </tr>
            </thead>
            {/*in teh row.map(we need an index)*/}
            <tbody className="cursor-pointer">
              {rows.map((row) => (
                <tr
                  key={row.BusinessName}
                  className=" border-gray-200 hover:bg-gray-100"
                >
                  <td className=" border-t py-3 px-3 text-left font-Poppins text-lightGray">
                        {row.Date}
                  </td>
                  <td className=" border-t py-3 px-3 text-left font-Poppins text-lightGray">
                        {row.Time}
                  </td>



                  <td
                    onClick={handleTabs}
                    className=" border-t py-4 text-left text-blue-500 font-Poppins text-sm font-normal"
                  >
                    {row.Email}
                  </td>
                  <td className=" border-t py-4 text-center text-lightGray font-Poppins text-sm font-normal">
                    {row.BusinessName}
                  </td>
                  <td className=" border-t py-3 px-3 text-center font-Poppins text-lightGray">
                        {row.SignInLink}
                  </td>

                  <td className="border-t py-4  text-left text-lightGray font-Poppins text-sm font-normal ">
                    <span className="status" style={makeStyle(row.status)}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <div className="border-radius-[0.9375rem] bg-white  h-auto  overflow-hidden font-Poppins">
            <div className="bg-secondaryColor flex justify-between  px-4 py-4 rounded-t-lg">
                <div className=" text-lightGray font-medium leading-normal mb-0  text-sm ">
                <div className="flex  gap-7 ">
                    <Link
                      to="/TimeLinkAccount/tab"
                      className={`${
                        location.pathname === "/TimeLinkAccount/tab"
                          ? " "
                          : "text-black text-2xl"
                      }`}
                    >
                      Account Profile
                    </Link>
                  </div>

                </div>
            </div>
            <div className="h-auto ">
              <Outlet />
            </div>
          </div>

       {/*   <button
            onClick={handleClose}
            className="btn bg-red-500 rounded-sm mx-5  px-5 py-2  text-white"
          >
            Back
                    </button>*/}
        </div>
      )}
    </div>
  );
};

export default TimeLinkAccount;
