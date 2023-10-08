import React from "react";
import Sort from "../../components/svg-icons/Sort";
import SearchGreen from "../../components/svg-icons/SearchGreen";
import WhitePlus from "../../components/svg-icons/WhitePlus";
interface TableRow {
  Date: string;
  Time: string ;
  SignInLink:string|number;
 Email: string;
BussinesName:string;
Status:string;

}

function TableData(
  Date: string,
  Time: string ,
  SignInLink:string|number,
  Email: string,
BussinesName: string,
Status:string,

): TableRow {
  return { Date, Time,SignInLink, Email, BussinesName,Status,  };
}
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


const rows: TableRow[] = [
  TableData("2-3- 2022","1:05am","SIL0394035" ,"mamagre@gmail.com", "hahahaha","New Trial" , ),
  TableData("2 -3- 2022", "`1:03am","SIL0394034","amamaam@gmal.com","hohohohoho", "Active Paid"),
  TableData("2 -3- 2022", "`1:03am","SIL0394033","iiiaaaaam@gmal.com","hohohohoho", "Pause"),
  TableData("2 -3- 2022", "`1:03am","SIL0394032","ammaam@gmal.com","hohohohoho", "Cancel"),
  TableData("2 -3- 2022", "`1:03am","SIL0394031","aooomaam@gmal.com","hohoho", "Delete"),



];

const SignInLink: React.FC = () => {
  return (
    <div className="border-radius-[0.9375rem] bg-white width-[65.75rem] h-auto overflow-hidden font-Poppins">
      <div className="bg-secondaryColor flex justify-between height-[5.3125rem] px-4 py-2 rounded-t-lg">
      <div className="relative">
  <input
    type="text"
    className="w-full h-10 pl-10 pr-8 rounded-full border border-gray-300 text-gray-300 px-4"
    placeholder="Search"
  />
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<SearchGreen/>
  </div>
</div>

        <div className="border-b-0">
          <span className="inline-flex items-center justify-center w-12 h-12 fill-current bg-green-500 rounded-full shadow-drop">
            {/* Your SVG code */}
            <WhitePlus/>
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
            <th className="border-b border-gray-100 p-2 text-left font-medium text-darkGray text-sm">
            Signinlink#          
            </th>

            <th className="border-b p-2  border-gray-100  text-left font-medium text-darkGray text-sm">
              Email
            </th>
            <th className="border-b border-gray-100 px-4 py-3 text-left font-medium text-darkGray text-sm">
              BusinessName
            </th>
            <th className="border-b border-gray-100 p-2 text-left font-medium text-darkGray text-sm">
Status
            </th>
            <th className="border-b border-gray-100 p-2 text-left font-medium text-darkGray text-sm">
<Sort/>
            </th>

          </tr>
        </thead>
        <tbody className="cursor-pointer">
          {rows.map((row) => (
            <tr
              key={row.Email}
              className="border-gray-100 hover:bg-gray-100"
            >
              <td className="border-t  border-gray-100 py-4 p-2 text-left font-Poppins text-lightGray ">
                <p className="text-lightGray font-Poppins font-normal leading-normal px-3 text-sm">
                  {row.Date}
                </p>
              </td>
              <td className="border-t border-gray-100 py-4 text-left text-lightGray font-Poppins text-sm font-normal">
                {row.Time}
              </td>
              <td className="border-t border-gray-100 py-4 text-left text-blue-700 font-Poppins text-sm font-normal">
                {row.SignInLink}
              </td>

              <td className="border-t border-gray-100 py-4 text-left text-lightGray font-Poppins text-sm font-normal px-3">
                {row.Email}
              </td>
              <td className="border-t py-4  border-gray-100 text-left text-lightGray font-Poppins text-sm font-normal px-6 ">
                {row.BussinesName}
              </td>
              <td className="border-t py-4  text-left text-lightGray font-Poppins text-sm font-normal ">
                    <span className="status" style={makeStyle(row.Status)}>
                      {row.Status}
                    </span>
                  </td>
                  <td className="border-t py-4  border-gray-100 text-left text-lightGray font-Poppins text-sm font-normal px-6 ">
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SignInLink;
