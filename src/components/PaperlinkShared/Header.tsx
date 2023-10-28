import React, { useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector to access Redux store
import { RootState } from "../../store"; // Replace with the correct path to your root reducer
import "./Header.css";
//import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      // Clear the user's authentication token (assuming it's stored in local storage)
      localStorage.removeItem("token");

      //     // Redirect the user to the login page (or any other desired page)
      window.location.href = "/login";
    }
  };

  // Use useSelector to get the user's email from the Redux store
  const userEmail = useSelector((state: RootState) => state.auth.userEmail); // Assuming your Redux slice is named 'auth'
  //console.log(userEmail)
  return (
    <div className="hidden md:inline  md:w-73rem md:h-6.625rem md:flex-shrink-0 md:bg-[#FBFAFF] md:shadow-md">
      <div className="bg-headerbg shadow-md h-16 px-4 flex items-center border-b border-gray-200 justify-between font-Poppins">
        <div className="relative">
          <h2 className="text-text-blk font-poppins font-medium text-2xl ml-5">
            Paperlink
          </h2>
        </div>
        <div className="flex items-center gap-3 mr-4 animate-giggle-on-load">
          {/* Display the user's email */}
          <h2 className="text-505050 text-right font-poppins text-sm hover:text-green-600 cursor-pointer font-extralight">
            {userEmail}
          </h2>
          {/* Display the first letter of the email */}
          <div
            onClick={(e) => {
              setToggle(!toggle);
            }}
            className="w-10 h-10 flex-shrink-0 rounded-full border-4 cursor-pointer border-green-600 bg-green-600 hover:bg-green-500 ease-in-out duration-500 animate-giggle"
            style={{
              boxShadow: toggle ? "0 0 10px 5px rgba(0, 255, 0, 0.7)" : "none",
            }}
          >
            <p className="text-white text-center font-bold text-2xl font-lexend-deca">
              {userEmail ? userEmail.charAt(0).toUpperCase() : "👻"}
            </p>
          </div>

          {toggle && (
            <div className="w-full">
              <button
                className="text-red-500 ease-out duration-700 bg-red-200 text-xs rounded full p-2 justify-center flex items-center w-full font-extrabold "
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
