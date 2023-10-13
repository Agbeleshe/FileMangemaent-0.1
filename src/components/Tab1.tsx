import React, { useState } from "react";
import AcctIcon from "./svg-icons/AcctIcon";
import zone from "../assests/zone.png";
import location from "../assests/location.png";
import "../assests/styles/tab.css";
import axios from "axios";
import { BASE_URL } from "../utils/axios-util";
import EditIcon from "./svg-icons/EditIcon";
import { BsCheckCircleFill } from "react-icons/bs";
import { TfiFaceSad } from "react-icons/tfi";
import Loader from "../pages/Paperlink/resources/Loader";

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
// Sorting options alphabetically
options.sort((a, b) => a.label.localeCompare(b.label));

interface Tab1Props {
  selectedUser: any | undefined;
  users: any[];
}

const Tab1: React.FC<Tab1Props> = ({ selectedUser, users }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [formData, setFormData] = useState({
    email: selectedUser.email || null,
    companyName: selectedUser.companyName || null,
    firstName: selectedUser.firstName || null,
    phone: selectedUser.phone || null,
    timezone: selectedUser.timezone,
    profilePicture: selectedUser.profilePicture,
  });

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showTimeZoneTooltip, setShowTimeZoneTooltip] = useState(false);

  // Store the initial form data when editing is enabled
  const [initialFormData, setInitialFormData] = useState({ ...formData });

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

  const toggleEditing = () => {
    if (!isEditing) {
      setFormData({ ...initialFormData }); // Reset formData to initial values
    }
    setIsEditing(!isEditing);
  };

  const handleClear = () => {
    setErrorMsg(false);
    setSuccess(false);
  };

  const handleViewProfilePicture = () => {
    setShowProfilePictureModal(true);
  };

  const handleCloseProfilePictureModal = () => {
    setShowProfilePictureModal(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const UpdateAccountUrl = BASE_URL + `/users/${selectedUser.id}`;

    axios
      .patch(UpdateAccountUrl, {
        email: formData.email,
        companyName: formData.companyName,
        firstName: formData.firstName,
        phone: formData.phone,
        status: selectedOption,
        timezone: formData.timezone,
        profilePicture: formData.profilePicture,
      })
      .then((res) => {
        setSuccess(true);
        setErrorMsg(false);
        console.log("PATCH request successful", res.data);
        setInitialFormData({ ...formData }); // Reset initialFormData to saved data
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error updating data: ", err);
        if (err.response) {
          console.error("Response data: ", err.response.data);
          setSuccess(false);
          setErrorMsg(true);
          // setLoading(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //const handleCancel = () => {
  //  setShowCancelModal(true);
  // };

  const handleCancel = () => {
    //console.log("handleCancel called");
    setFormData({ ...initialFormData }); // Reset formData to initial values
    //setSelectedOption("");
    setIsEditing(false);
    setShowCancelModal(true); // Close the cancel modal
  };
  const handleConfirmCancel = () => {
    //  console.log("handleConfirmCancel called");
    // Perform the cancellation action here
    // For example, reset the form fields or close the modal
    setFormData({ ...initialFormData }); // Reset formData to initial values
    setSelectedOption("");
    setIsEditing(false);
    setShowCancelModal(false); // Close the cancel modal
  };

  const handleCancelModalClose = () => {
    // console.log("handleCancelModalClose called");
    setShowCancelModal(false);
  };

  return (
    <div className="h-auto overflow-hidden font-Poppins pb-[100px] ">
      {/**HERE THE loading */}
      {loading ? (
        <Loader />
      ) : (
        <div>
          {showCancelModal && (
            <div className="fixed inset-0 backdrop-blur-md bg-gray-800 bg-opacity-50 z-50"></div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:p-5 md:w-full ">
            <div className="inline-block md:flex md:justify-between mr-6 ml-6  w-full items-center text-center justify-center">
              <div className="mt-4 flex gap-5 w-full md:w-auto  items-center mb-5 justify-center">
                <label
                  htmlFor="select"
                  className="text-gray-700 font-Poppins text-20 font-normal"
                >
                  Status:
                </label>
                {isEditing ? (
                  <select
                    id="select"
                    name="select"
                    value={selectedOption}
                    onChange={handleSelectChange}
                    className="bg-gray-300 text-red-500 rounded-lg outline-none px-5 py-2 border-none focus:ring-0 md:w-full p-0 shadow-sm sm:text-sm"
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
                ) : (
                  <span>{selectedUser.status}</span>
                )}
              </div>

              <div className="flex gap-2  items-center">
                <span onClick={() => toggleEditing()} className="mr-5 pt-2 ">
                  <button //sheky sheky effect
                    className={`mr-5 pt-2  ${!isEditing && "vibrate-button"} `}
                    type="button"
                  >
                    <EditIcon />
                  </button>
                </span>
                <span>
                  {formData.profilePicture ? (
                    <img
                      onClick={handleViewProfilePicture}
                      src={formData.profilePicture}
                      alt="profile side"
                      className="inline-flex items-center justify-center md:items-left h-20 w-20 md:w-12 md:h-12 flex-shrink-0 fill-current bg-grayG rounded-full shadow-drop mr-20 "
                    />
                  ) : (
                    <span
                      onClick={handleViewProfilePicture}
                      className="inline-flex items-center justify-center md:items-left h-20 w-20 md:w-12 md:h-12 flex-shrink-0 fill-current bg-grayG rounded-full shadow-drop mr-20 "
                    >
                      <AcctIcon />
                    </span>
                  )}
                  {showProfilePictureModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="fixed inset-0 bg-black opacity-40"></div>

                      <div className="bg-white p-8 w-96 rounded-lg text-center shadow-lg relative z-10">
                        <img
                          src={formData.profilePicture}
                          alt="profile side"
                          className="mx-auto h-48 w-48 rounded-full bg-slate-100"
                        />
                        <button
                          onClick={handleCloseProfilePictureModal}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 mt-4"
                        >
                          Close
                        </button>
                      </div>
                    </div>
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="md:w-full px-2 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div className="md:w-1/2 px-4 mb-2">
                <label
                  htmlFor="companyName"
                  className="block py-5 text-gray-700"
                >
                  Business Name:
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="md:w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div className="md:w-1/2 px-4 mb-4">
                <label
                  htmlFor="contactName"
                  className="block py-5 text-gray-700"
                >
                  Contact Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="md:w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div className="md:w-1/2 px-4 mb-4">
                <label
                  htmlFor="contactNumber"
                  className="block py-5 text-gray-700"
                >
                  Contact Number:
                </label>
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="md:w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
                  required
                  disabled={!isEditing}
                />
              </div>
              <div className="md:w-1/2 px-4 mb-6 flex items-center space-x-2">
                <img
                  src={location}
                  alt="google map location"
                  className="mr-2"
                />
                <span>Google maps location</span>
              </div>
              <div
                className="md:w-1/2 px-4 mb-6 flex items-center space-x-2"
                onClick={() => setShowTimeZoneTooltip(!showTimeZoneTooltip)}
              >
                <img src={zone} alt="zone-location" className="mr-2" />
                <span>Time Zone Database</span>
              </div>
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
            </div>
            {/* copy and paste to remainig div */}
            {success && (
              <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in ">
                <div className="bg-black opacity-70 inset-0 absolute h-[110vh] -top-5" />

                <div className="bg-white p-8 rounded-lg text-center shadow-lg relative z-10">
                  <div className="w-full flex justify-center items-center mb-2">
                    <BsCheckCircleFill color="green" size={50} />
                  </div>
                  <p className="text-green">SUCCESSFULLY UPDATED!</p>
                  <button
                    onClick={handleClear}
                    className="bg-green-300 text-white px-4 py-2 rounded-md hover:bg-green-500 mt-4"
                  >
                    clear
                  </button>
                </div>
              </div>
            )}
            {errorMsg && (
              <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in ">
                <div className="bg-black opacity-70 inset-0 absolute h-[110vh] -top-5" />

                <div className="bg-white p-5 rounded-lg text-center shadow-lg relative z-10">
                  <div className="w-[50%] mx-auto flex justify-center items-center mb-2">
                    <TfiFaceSad color="red" size={50} />
                  </div>
                  <p className="text-red-500 flex w-[70%] mx-auto items-center justify-center">
                    Ops something went wrong, check your inputs and try again!
                  </p>
                  <button
                    onClick={handleClear}
                    className="bg-red-300 text-white px-4 py-2 rounded-md hover:bg-red-500 mt-4"
                  >
                    clear
                  </button>
                </div>
              </div>
            )}
            <div className="flex md:gap-10 gap-5 md:px-7  md:pb-5 flex-col md:flex-row items-center md:items-start ">
              {isEditing ? (
                <>
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
                </>
              ) : (
                ""
              )}
            </div>
          </form>

          {/**The clear modal */}
          {showCancelModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-8 w-96 rounded-lg text-center shadow-lg">
                <p className="text-red-500 text-lg font-semibold mb-4">
                  Are you sure you want to cancel input?
                </p>
                <div>
                  <p>
                    <em>This will clear all what you editted.</em>
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
      )}
    </div>
  );
};

export default Tab1;
