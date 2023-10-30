import React, { useState } from "react";
import { TfiClose } from "react-icons/tfi";
import axiosInstance from "../../utils/axiosInstance";

interface FirstModalProps {
  setModalOne: (value: boolean) => void;
  handleModalClose: () => void;
  updateCategories: () => void;
  endpoint: string;
}

const FirstModal: React.FC<FirstModalProps> = ({
  setModalOne,
  handleModalClose,
  updateCategories,
  endpoint,
}) => {
  const [name, setName] = useState("");

  // Function to send a POST request to the API
  const sendData = async () => {
    try {
      const response = await axiosInstance.post("/categories?", {
        name,
        for: endpoint,
      });
      console.log("API response:", response.data);
      console.log("Category created:", response.data);
      handleModalClose();
      updateCategories();
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-black opacity-5"></div>
      <div className="z-10 relative bg-white py-5 rounded-xl shadow-xl min-w-[300px] md:min-w-[400px]">
        <div className="flex justify-between px-5 w-full border-b-2 pb-2">
          <div className="text-black font-semibold ">Add New Category</div>
          <p className="cursor-pointer" onClick={handleModalClose}>
            <TfiClose />
          </p>
        </div>
        <div className="p-5 w-full">
          <label className="font mb-5">Category</label>
          <form action="">
            <input
              className="bg-slate-50 w-full py-4 px-8 rounded-lg focus:border-none focus:shadow-green-100 focus:shadow-md outline-none  "
              placeholder="Enter Category Here"
              type="text"
              name="Category"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>

          <div className="w-full align-middle items-center justify-center flex mt-10 mb-5 ">
            <button
              className="px-8 py-3 text-white bg-green-500 rounded-lg"
              onClick={sendData}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstModal;
