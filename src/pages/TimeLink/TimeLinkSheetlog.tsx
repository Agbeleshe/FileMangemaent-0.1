import React from "react";
import SearchGreen from "../../components/svg-icons/SearchGreen";
interface TableRow {
  Date: string;
  Time: string;
  Email: string;
  Lines: number;
  file: string;
}

function TableData(
  Date: string,
  Time: string,
  Email: string,
  Lines: number,
  file: string
): TableRow {
  return { Date, Time, Email, Lines, file };
}

const rows: TableRow[] = [
  TableData("2-3- 2022", "1:05am", "mamagre@gmail.com", 21, "PDF"),
  TableData("2 -3- 2022", "`1:03am", "amamaam@gmal.com", 23, "PDF"),
];

const TimeLinkSheetlog: React.FC = () => {
  return (
    <div className="border-radius-[0.9375rem] bg-white width-[65.75rem] h-auto overflow-hidden font-Poppins">
      <div className="bg-secondaryColor flex justify-between height-[5.3125rem] px-4 py-2 rounded-t-lg">
        <div className="border-b-0 text-black font-medium leading-normal text-2xl">
          Sheet Information
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
              Lines
            </th>
            <th className="border-b border-gray-100 p-2 text-left font-medium text-darkGray text-sm">
              File
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
              <td className="border-t border-gray-100 py-4 text-left text-blue-700 font-Poppins text-sm font-normal">
                {row.Time}
              </td>
              <td className="border-t border-gray-100 py-4 text-center text-lightGray font-Poppins text-sm font-normal px-3">
                {row.Email}
              </td>
              <td className="border-t py-4  border-gray-100 text-left text-lightGray font-Poppins text-sm font-normal px-6 ">
                {row.Lines}
              </td>

              <td className="border-t border-gray-100 py-4 text-left text-lightGray font-Poppins text-sm font-normal px-3 ">
                {row.file}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeLinkSheetlog;
