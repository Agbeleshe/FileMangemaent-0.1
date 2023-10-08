import React, { useState, ChangeEvent } from "react";
import { TfiClose } from "react-icons/tfi";
import axios from "axios";
import { BASE_URL } from "../../../utils/axios-util";
import { ClipLoader } from "react-spinners";

const userUrl = BASE_URL + "/users";

interface AddAccountProps {
  handleModalClose: () => void;
}

const AddAccount: React.FC<AddAccountProps> = ({ handleModalClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    email: "",
    companyName: "",
    status: "",
    firstName:"",
    role: "paid_user",
  });

  const [successAlert, setSuccessAlert] = useState<Boolean>(false);
  const [failAlert, setFailAlert] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
// Send a POST request to the userUrl with the form data
    axios
      .post(userUrl, formData)
      .then((response) => {
        // Handle the successful response here
        console.log("Response:", response, response.data);
        // You can also perform further actions here, like closing the modal
        setSuccessAlert(true);
        setFailAlert(false);
        setLoading(false);

      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
        setFailAlert(true)
        setSuccessAlert(false)
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="z-10 relative bg-white py-5 rounded-xl shadow-xl w-[300px] md:w-[400px]">
        <div className="flex justify-between px-5 w-full border-b-2 pb-2">
          <div className="text-black font-semibold">Add New Account</div>

          <p className="cursor-pointer" onClick={handleModalClose}>
            <TfiClose />
          </p>
        </div>
        <div className="p-5 w-full">
          {successAlert && (
            <div className="w-[90%] flex justify-center top-10 mx-auto p-1 bg-green-200 opacity-80 bg-blur text-green-700 text-sm mb-5">
              Account created successfully
            </div>
          )}
              {failAlert && (
            <div className="w-[90%] flex justify-center top-10 mx-auto p-1 bg-red-200 opacity-80 bg-blur text-red-700 text-sm mb-5">
              Ops, an error occured please try again.
            </div>
          )}

          <form className="container text-xs md:text-sm" onSubmit={handleSubmit}>
          {loading && (
              <div className="bg-black h-full w-full opacity-20 absolute flex items-center ">
                <div className="w-full mx-auto flex justify-center text-center ">
                  <ClipLoader color="white" size={100} />
                </div>
              </div>
            )}


            <div>
              <label className="font mb-5">Date</label>
              <input
                required
                className="bg-slate-50 w-full py-2 px-8 rounded-lg focus:border-none focus:shadow-green-100 focus:shadow-md outline-none"
                placeholder="Enter Category Here"
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="font mb-5">Account Email</label>
              <input
                required
                className="bg-slate-50 w-full py-2 px-8 rounded-lg focus:border-none focus:shadow-green-100 focus:shadow-md outline-none"
                placeholder="Enter Category Here"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="font mb-5">Business name</label>
              <input
                required
                className="bg-slate-50 w-full py-2 px-8 rounded-lg focus:border-none focus:shadow-green-100 focus:shadow-md outline-none"
                placeholder="Enter Category Here"
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font mb-5">First Name</label>
              <input
                required
                className="bg-slate-50 w-full py-2 px-8 rounded-lg focus:border-none focus:shadow-green-100 focus:shadow-md outline-none"
                placeholder="Enter Category Here"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="font mb-5">Status</label>
              <select
                required
                className="bg-slate-50 w-full py-2 px-8 rounded-lg focus:border-none focus:shadow-green-100 focus:shadow-md outline-none"
                placeholder="Enter Category Here"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option className="text-gray-700" value="New Trial">
                  New Tial
                </option>
                <option className="text-green-700" value="active">
                  active
                </option>
                <option className="text-blue-400" value="Pause">
                  Pause
                </option>
                <option className="text-purple-700" value="Cancel">
                  Cancel
                </option>
                <option className="text-red-700" value="Delete">
                  Delete
                </option>
              </select>
            </div>
            <div className="w-full align-middle items-center justify-center flex mt-10 mb-5">
              <button
                type="submit"
                className="px-8 py-3 text-white bg-green-500 rounded-lg"
              >
                 {loading ? " Loading..." : " Save"}

              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;