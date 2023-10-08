import React from "react";
import Sort from "../../components/svg-icons/Sort";
import folder from "../../assests/folder.png";

import SearchGreen from "../../components/svg-icons/SearchGreen";
interface TableRow {
  Date: string;
  Time: string;
  Email: string;
  BussinesName: string;
  invoice: string;

  recieve: string;
}

function TableData(
  Date: string,
  Time: string,
  Email: string,
  BussinesName: string,
  invoice: string,

  recieve: string
): TableRow {
  return { Date, Time, Email, BussinesName, invoice, recieve };
}

const rows: TableRow[] = [
  TableData(
    "2-3- 2022",
    "1:05am",
    "mamagre@gmail.com",
    "hahahaha",
    "SIL0394035",
    "$20"
  ),
  TableData(
    "2 -3- 2022",
    "`1:03am",
    "amamaam@gmal.com",
    "hohohohoho",
    "SIL0394034",
    "$20"
  ),
  TableData(
    "2 -3- 2022",
    "`1:03am",
    "iiiaaaaam@gmal.com",
    "hohohohoho",
    "SIL0394033",
    "$20"
  ),
  TableData(
    "2 -3- 2022",
    "`1:03am",
    "ammaam@gmal.com",
    "hohohohoho",
    "SIL0394032",
    "$20"
  ),
  TableData(
    "2 -3- 2022",
    "`1:03am",
    "aooomaam@gmal.com",
    "hohoho",
    "SIL0394031",
    "$20"
  ),
];

const AccountRecievable: React.FC = () => {
  return (
    <div className="border-radius-[0.9375rem] bg-white width-[65.75rem] h-auto overflow-hidden font-Poppins">
      <div className="bg-secondaryColor flex justify-between height-[5.3125rem] px-4 py-2 rounded-t-lg">
        <div className="border-b-0 text-black font-medium leading-normal text-2xl">
          Accounts Receivable Data
        </div>
        <div className="border-b-0">
          <span className="inline-flex items-center justify-center w-12 h-12 fill-current bg-white rounded-full shadow-drop">
            {/* Your SVG code */}
            <SearchGreen />
          </span>
        </div>
      </div>
      <table className="w-full table-hover user-table ">
        <thead>
          <tr className="">
            <th className="border-b border-gray-100 px-4 py-5 text-left font-medium text-darkGray text-sm flex">
              Date
            </th>
            <th className="border-b border-gray-100 p-2 text-left font-medium text-darkGray text-sm">
              Time
            </th>
            <th className="border-b p-2  border-gray-100  text-center font-medium text-darkGray text-sm">
              Email
            </th>
            <th className="border-b border-gray-100 px-4 py-3 text-left font-medium text-darkGray text-sm">
              BusinessName
            </th>
            <th className="border-b border-gray-100 p-2 text-left font-medium text-darkGray text-sm">
              Invoice#
            </th>

            <th className="border-b border-gray-100 p-2 text-left font-medium text-darkGray text-sm ">
            Received 
            <span className="text-blue-500 font-bold ml-2">$200 </span>           
             </th>
          </tr>
        </thead>
        <tbody className="cursor-pointer">
          {rows.map((row) => (
            <tr key={row.Email} className="border-gray-100 hover:bg-gray-100">
              <td className="border-t  border-gray-100 py-4 p-2 text-left font-Poppins text-lightGray ">
                <p className="text-lightGray font-Poppins font-normal leading-normal px-3 text-sm">
                  {row.Date}
                </p>
              </td>
              <td className="border-t border-gray-100 py-4 text-left text-lightGray font-Poppins text-sm font-normal">
                {row.Time}
              </td>

              <td className="border-t border-gray-100 py-4 text-center text-lightGray font-Poppins text-sm font-normal px-3">
                {row.Email}
              </td>
              <td className="border-t py-4  border-gray-100 text-left text-lightGray font-Poppins text-sm font-normal px-6 ">
                {row.BussinesName}
              </td>
              <td className="border-t py-4  border-gray-100 text-left text-lightGray font-Poppins text-sm font-normal px-6 flex items-center">
                {row.invoice}
                <span className="ml-2">
                  <img src={folder} alt="" />
                </span>
              </td>

              <td className="border-t py-4  text-left text-lightGray font-Poppins text-sm font-normal ">
                  {row.recieve}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountRecievable;
