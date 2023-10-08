import React from "react";
//import folder from "../../assests/folder.png";

interface TableRow {
  DateTime: string;
  invoice: string;
}

function TableData(DateTime: string, invoice: string): TableRow {
  return { DateTime, invoice };
}

const rows: TableRow[] = [TableData("2-3-2022 12:16am", "2032-01")];

const TabTwo: React.FC = () => {
  return (
    <div className="bg-white h-auto overflow-hidden font-Poppins">
            <div className="border-b w-full flex gap-11">

            <p className="font-medium text-darkGray text-sm px-5 py-5 ">Date/Time</p>
            <p className="font-medium text-darkGray text-sm px-5 py-5 ">#invoice</p>
            </div>

          <div>

          {rows.map((row) => (
            <div className="hover:bg-gray-100   flex" key={row.invoice}>
              <p className="border-gray-200 px-5 py-5 font-Poppin">
                <p className="text-lightGray font-Poppins font-normal leading-normal text-sm">
                  {row.DateTime}
                </p>
              </p>
              <p className="text-left text-green-500 font-Poppins text-sm font-normal px-5 py-5 flex items-center">
                {row.invoice}
              </p>
            </div>
          ))}
                    </div>

    </div>
  );
};

export default TabTwo;
