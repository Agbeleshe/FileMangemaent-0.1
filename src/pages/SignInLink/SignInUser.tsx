import React from "react";
import SearchGreen from "../../components/svg-icons/SearchGreen";
interface TableRow {
  Date: string;
  Time: string;
  PhoneNumber:number;
  UserName: string;
  Account: string;
}

function TableData(
  Date: string,
  Time: string,
  PhoneNumber: number,
  UserName: string,
  Account: string
): TableRow {
  return { Date, Time, PhoneNumber, UserName, Account};
}

const rows: TableRow[] = [
  TableData(
    "26-08-2023 ",
    "12:36AM",
    802345678,
    "moana",
    "Apple dental"
  ),
  TableData("2-3- 2022", "12:36am ", 18908424, "motanu", "Orange dental"),
];

const SignInUser = () => {
  return (
    <div className="border-radius-[0.9375rem] bg-white width-[65.75rem] h-auto  overflow-hidden font-Poppins">
      <div className="bg-secondaryColor flex justify-between height-[5.3125rem] px-4 py-2 rounded-t-lg">
        <div className="border-b-0 text-lightGray font-medium leading-normal  text-2xl">
User Log
        </div>
        <div className="border-b-0">
          <span className="inline-flex items-center justify-center w-12 h-12 flex-shrink-0 fill-current bg-white rounded-full shadow-drop">
            <SearchGreen />
          </span>
        </div>
      </div>
      <div className="hidden md:inline">
        <table className="w-full table-hover user-table">
          <thead>
            <tr>
              <th className="border-b px-4 py-5   text-left font-medium text-darkGray text-sm flex items-center">
                Date
              </th>

              <th className="border-b p-2 text-left font-medium text-darkGray text-sm">
                Time
              </th>
              <th className="border-b p-2  text-center font-medium text-darkGray text-sm">
                Phone Number
              </th>
              <th className="border-b px-4 py-3 text-left font-medium text-darkGray text-sm ">
                UserName
              </th>
              <th className="border-b p-2 text-left font-medium text-darkGray text-sm">
                Account
              </th>
            </tr>
          </thead>

          <tbody className="cursor-pointer">
            {rows.map((row) => (
              <tr
                key={row.UserName}
                className=" border-gray-200 hover:bg-gray-100"
              >
                <td className=" border-t py-4 p-2 text-left font-Poppins text-lightGray">
                  {row.Date}
                </td>

                <td className=" border-t py-4 text-left text-lightGray font-Poppins text-sm font-normal">
                  {row.Time}
                </td>
                <td className=" border-t py-4 text-center text-lightGray font-Poppins text-sm font-normal">
                  {row.PhoneNumber}
                </td>
                <td className=" border-t py-4 text-left text-lightGray font-Poppins text-sm font-normal px-4">
                  {row.UserName}
                </td>
                <td className=" border-t py-4 text-left text-lightGray font-Poppins text-sm font-normal  px-2">
{row.Account}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="md:hidden max-h-[400px] p-3">
          {rows.map((row) => (
            <div
              key={row.UserName}
              className="flex gap-2 justify-between p-3 shadow-lg hover:shadow-2xl hover:bg-gray-200 rounded-md my-2 "
            >
              <div className="flex flex-col justify-start items-start align-middle flex-1 ">
                <span className="text-black flex text-[12px]">
                  {row.Date}
                </span>
                <div className=" flex text-[12px]">{row.Time}</div>
                <span
                  className="text-black text-[12px] font-extrabold"
                >
                  {row.Account}
                </span>
              </div>
              <div className="flex flex-col justify-start items-start align-middle flex-1 ">
                <div className="text-black flex text-[12px]">
                  User Name: {row.UserName}
                </div>
                <span className="text-gray-300 underline text-[12px]">
                  {row.PhoneNumber}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignInUser;
