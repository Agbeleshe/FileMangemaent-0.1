import React, { useState } from "react";
import AcctIcon from "../svg-icons/AcctIcon";
import zone from "../../assests/zone.png";
import location from "../../assests/location.png";
import WhitePlus from "../svg-icons/WhitePlus";
import dental from "../../assests/dental.png";
import DeleteIcon from "../svg-icons/DeleteIcon";
import "../../assests/styles/tab.css";
//interface Option {
//  value: string;
//  label: string;
//}

const Tab = () => {
  const [formData, setFormData] = useState({
    email: "",
    businessName: "",
    contactName: "",
    contactNumber: "",
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // You can handle form submission here
    console.log(formData);
  };

  return (
    <div className="border-radius-[0.9375rem] bg-white w-[65.75rem]  overflow-hidden font-Poppins p-5 px-7 m-auto ">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between">
          <div className="mt-4 flex gap-5">
            <p
            >
              Status :
              <span className="text-green-500 ml-1 font-bold">Active Paid </span>
            </p>
          </div>
          <div>
            <span className="inline-flex items-center justify-center w-12 h-12 flex-shrink-0 fill-current bg-grayG rounded-full shadow-drop mr-6 ">
              <AcctIcon />
            </span>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4 ">
          <div className="w-1/2 px-4 mb-2">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div className="w-1/2 px-4 mb-2">
            <label htmlFor="businessName" className="block text-gray-700">
              Business Name:
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div className="w-1/2 px-4 mb-4">
            <label htmlFor="contactName" className="block text-gray-700">
              Contact Name:
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div className="w-1/2 px-4 mb-4">
            <label htmlFor="contactNumber" className="block text-gray-700">
              Contact Number:
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div className=" w-[83%] flex justify-between">
            <div className="">
              <div className=" px-4 mb-6 flex items-center space-x-2">
                <img
                  src={location}
                  alt="google map location"
                  className="mr-2"
                />
                <span>Google maps location</span>
              </div>
              <div className=" px-4 mb-6 flex items-center space-x-2">
                <img src={zone} alt="zone-location" className="mr-2" />
                <span>Time Zone Database</span>
              </div>
            </div>
            <div className="">
              <div className=" px-4 mb-6 flex items-center space-x-2">
                <span className="inline-flex items-center justify-center w-12 h-12 flex-shrink-0 fill-current bg-purple-500 rounded-lg shadow-drop mr-6 ">
                  <WhitePlus />
                </span>
                <span>Sign in Sheet</span>
              </div>
              <div className=" px-4 mb-6 flex items-center space-x-2">
                <img src={dental} alt="dental icon" className="mr-2" />
                <span className="flex">Apple Dental</span>
                <span className="flex gap-2 text-blue-600 ">
                  NID3949649
                  <span>
                    <DeleteIcon />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/**buttons side */}
        <div className=" flex gap-10">
          <button type="submit" className="btnTab">
            save{" "}
          </button>
          <button className="btnT">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Tab;
