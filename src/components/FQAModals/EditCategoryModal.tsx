// EditCategoryModal.tsx
import React, { useState } from "react";
import { TfiClose } from "react-icons/tfi";
import axiosInstance from "../../utils/axiosInstance";
//import { PaperLinkFAQ } from "./resources/PaperLinkFAQ";
import { PaperLinkFAQ } from "../../pages/Paperlink/resources/PaperLinkFAQ";

interface EditCategoryModalProps {
  categoryToEdit: PaperLinkFAQ | null;
  onClose: () => void;
  onCategoryUpdated: (updatedCategory: PaperLinkFAQ) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  categoryToEdit,
  onClose,
  onCategoryUpdated,
}) => {
  const [categoryName, setCategoryName] = useState(categoryToEdit?.name || "");

  const handleCategoryNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (categoryToEdit) {
      axiosInstance
        .put(`/categories/${categoryToEdit.id}?$sort[position]=1&for=paperlink`, {
          name: categoryName,
        })
        .then((response) => {
          console.log("Category updated successfully:", response.data);
          onCategoryUpdated(response.data);

          onClose();
        })
        .catch((error) => {
          console.error("Error updating category:", error);
        });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-black opacity-5"></div>
      <div className="z-10 relative bg-white py-5 rounded-xl shadow-xl min-w-[200px] md:min-w-[300px]">
        <div className="flex justify-between px-5 w-full border-b-2 pb-2">
          <h2 className="text-black font-semibold">Edit Question and Answer</h2>
          <span className="cursor-pointer" onClick={onClose}>
            <TfiClose />
          </span>
        </div>
        <div className="px-5 w-full ">
          <form onSubmit={handleSubmit}>
            <label htmlFor="question" className="mb-5">
              Name:
            </label>
            <input
              className="bg-slate-50 w-full py-4 px-8 rounded-lg mt-3 focus:border-none focus:shadow-green-100 focus:shadow-md outline-none  "
              type="text"
              id="name"
              value={categoryName}
              onChange={handleCategoryNameChange}
            />

            <div className="w-full align-middle items-center justify-center flex mt-10 mb-5 ">
              <button
                type="submit"
                className="px-8 py-3 text-white bg-green-500 rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
