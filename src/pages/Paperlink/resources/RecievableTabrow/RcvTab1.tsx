import React, { useState } from "react";
import AcctIcon from "../../../../components/svg-icons/AcctIcon";
import zone from "../assests/zone.png";
import location from "../assests/location.png";
// import "../assests/styles/tab.css";
import axios from "axios";
import { BASE_URL } from "../../../../utils/axios-util";

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "New Trial", label: "New Trial" },
  { value: "active", label: "active" },
  { value: "Pause", label: "Pause" },
  { value: "Suspend", label: "Suspend" },
  { value: "Cancel", label: "Cancel" },
  { value: "Delete", label: "Delete" },
];

interface Tab1Props {
  selectedUser: any | undefined;
  users: any[];
}

const Tab1: React.FC<Tab1Props> = ({ selectedUser, users }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [formData, setFormData] = useState({
    email: selectedUser.email || selectedUser.user.email,
    businessName: selectedUser.businessPage || selectedUser.user.businessPage,
    contactName: selectedUser.firstName || selectedUser.user.firstName,
    contactNumber: selectedUser.phone,
    timezone: selectedUser.timezone,
    profilePicture: selectedUser.profilePicture,
  });
  console.log(selectedUser);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showTimeZoneTooltip, setShowTimeZoneTooltip] = useState(false); // New state variable for the tooltip

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClear = () => {
    setErrorMsg(false);
    setSuccess(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    // You can handle form submission here

    const UpdateAccountUrl =
      BASE_URL + `/users/${selectedUser.id}?sort[createdAt]=-1&role=paid_user`;

      //BASE_URL + /users?$sort[createdAt]=-1&role=paid_user/${selectedUser.id};
    // Send the PUT request to update the user's data
    console.log(selectedUser.id);

    axios
      .put(UpdateAccountUrl, {
        email: formData.email,
        businessName: formData.businessName,
        contactName: formData.contactName,
        contactNumber: formData.contactNumber,
        status: selectedOption,
        timezone: formData.timezone,
        profilePicture: formData.profilePicture,
      })
      .then((res) => {
        setSuccess(true);
        setErrorMsg(false);
        console.log("PATCH request successful", res.data);
      })
      .catch((err) => {
        console.error("Error updating data: ", err);
        if (err.response) {
          console.error("Response data: ", err.response.data);
          setSuccess(false);
          setErrorMsg(true);
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false when request is done
      });
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    // Reset all input fields to empty values
    setFormData({
      email: "",
      businessName: "",
      contactName: "",
      contactNumber: "",
      timezone: "",
      profilePicture: "",
    });
    setSelectedOption(""); // Reset the select input
    setShowCancelModal(false);
  };

  const handleCancelModalClose = () => {
    setShowCancelModal(false);
  };

  return (
    <div className="h-auto overflow-hidden font-Poppins pb-[100px] ">
      {/* Background Overlay */}
      {showCancelModal && (
        <div className="fixed inset-0 backdrop-blur-md bg-gray-800 bg-opacity-50 z-50"></div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 md:p-5 md:w-full ">
        <div className="inline-block md:flex md:justify-between  w-full items-center text-center justify-center">
          <div className="mt-4 flex gap-5 w-full md:w-auto  items-center mb-5 justify-center">
            <label
              htmlFor="select"
              className="text-gray-700 font-Poppins text-20 font-normal"
            >
              Status:
            </label>
            <select
              id="select"
              name="select"
              value={selectedOption}
              onChange={handleSelectChange}
              className="bg-gray-300 text-red-500 rounded-lg outline-none px-5 border-none focus:ring-0 md:w-full p-0 shadow-sm sm:text-sm"
            >
              <option value={selectedUser.status || selectedUser.user}>
                {selectedUser.status}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* image placeHolder */}
          <div className="">
            <span >
              {formData.profilePicture ? (
                <img
                  src={formData.profilePicture}
                  alt="profile side"
                  className="inline-flex items-center justify-center md:items-left h-20 w-20 md:w-12 md:h-12 flex-shrink-0 fill-current bg-grayG rounded-full shadow-drop mr-6 "
                />
              ) : (
              <span className="inline-flex items-center justify-center md:items-left h-20 w-20 md:w-12 md:h-12 flex-shrink-0 fill-current bg-grayG rounded-full shadow-drop mr-6 ">

                    <AcctIcon />
                    </span>
              )}
            </span>
          </div>
        </div>

        <div className="block w-full md:flex md:flex-wrap md:mx-4 md:text-left  text-center ">
          <div className="md:w-1/2 px-4 mb-2">
            <label htmlFor="email" className="block py-5 text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="md:w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div className="md:w-1/2 px-4 mb-2">
            <label htmlFor="businessName" className="block py-5 text-gray-700">
              Business Name:
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="md:w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div className="md:w-1/2 px-4 mb-4">
            <label htmlFor="contactName" className="block py-5 text-gray-700">
              Contact Name:
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className="md:w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div className="md:w-1/2 px-4 mb-4">
            <label htmlFor="contactNumber" className="block py-5 text-gray-700">
              Contact Number:
            </label>
            <input
              type="number"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="md:w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          {/* <div className="md:w-1/2 px-4 mb-6 flex items-center space-x-2">
            <img src={location} alt="google map location" className="mr-2" />
            <span>Google maps location</span>
          </div>
          <div
            className="md:w-1/2 px-4 mb-6 flex items-center space-x-2"
            onClick={() => setShowTimeZoneTooltip(!showTimeZoneTooltip)}
          >
            <img src={zone} alt="zone-location" className="mr-2" />
            <span>Time Zone Database</span>
          </div>
          {/* TimeZone Tooltip */}
          {showTimeZoneTooltip && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 w-96 rounded-lg text-center shadow-lg">
                <p className="text-gray-700 text-lg font-semibold mb-4">
                  Time Zone:
                </p>
                <p className="text-gray-700">
                  {formData.timezone ? (
                    <p className="text-gray-700">{formData.timezone}</p>
                  ) : (
                    <p className="text-red-500">
                      Sorry, there is no timezone in the database
                    </p>
                  )}
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowTimeZoneTooltip(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )} 
          {/**end of it */}
        </div>
        {success && (
          <div className="bg-green-100 relative md:w-[95%] w-[90%] mx-auto text-[10px] md:text-sm text-green-800 p-2 flex gap-5 justify-center font-extralight">
            <p>SUCCESSFULLY UPDATED!</p>
            <button
              onClick={handleClear}
              className="bg-green-300 absolute top-0 right-0 h-full md:w-20 w-10"
            >
              clear
            </button>
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-100 relative md:w-[95%] w-[90%] mx-auto text-[10px] md:text-sm text-red-800 p-2 flex md:justify-center font-extralight">
            <p className="flex justify-start md:justify-center w-[80%] md:w-full">
              AN ERROR OCCOURED, PLEASE CHECK YOUR INPUTS AND TRY AGAIN
            </p>
            <button
              onClick={handleClear}
              className="bg-red-300 absolute top-0 right-0 h-full w-20 "
            >
              clear
            </button>
          </div>
        )}
        {/* Buttons */}
        <div className="flex md:gap-10 gap-5 md:px-7  md:pb-5 flex-col md:flex-row items-center md:items-start ">
          <button
            typeof="submit"
            className={`Tab outline-none active:bg-green-500 ${
              loading && "bg-slate-500"
            } `}
          >
            {loading ? "loading..." : "save"}
          </button>

          <button
            onClick={handleCancel}
            className="btnT outline-none hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 w-96 rounded-lg text-center shadow-lg">
            <p className="text-red-500 text-lg font-semibold mb-4">
              Are you sure you want to cancel input?
            </p>
            <div>
              <p>
                <em>This will clear all input in the field.</em>
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={handleConfirmCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={handleCancelModalClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tab1;