// EditJunologixModal.tsx
import React, { useState } from "react";
import { TfiClose } from "react-icons/tfi";
import axiosInstance from "../../utils/axiosInstance";
import { JunologixData } from "../../pages/Paperlink/resources/JunologixData";

interface EditJunologixProps {
  junologixToEdit: JunologixData | null;
  onClose: () => void;
  onJunologixUpdated: (updatedJunologix: JunologixData) => void;
}

const EditJunologix: React.FC<EditJunologixProps> = ({
  junologixToEdit,
  onClose,
  onJunologixUpdated,
}) => {
  const [junoName, setJunoName] = useState(junologixToEdit?.abr || "");
  const [junoState, setJunoState] = useState(junologixToEdit?.state || "");
  const [junoReturn, setJunoReturn] = useState(junologixToEdit?.return || "");
  const [junoStatus, setJunoStatus] = useState(junologixToEdit?.status || "");

  const handleJunoNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJunoName(event.target.value);
  };

  const handleJunoStateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setJunoState(event.target.value);
  };

  const handleJunoReturnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setJunoReturn(event.target.value);
  };

  const handleJunoStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setJunoStatus(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (junologixToEdit) {
      axiosInstance
        .put(`/junologix-states?/${junologixToEdit.id}`, {
          abr: junoName,
          state: junoState,
          return: junoReturn,
          status: junoStatus,
        })
        .then((response) => {
          console.log("junologix edit updated successfully:", response.data);
          onJunologixUpdated(response.data);

          onClose();
        })
        .catch((error) => {
          console.error("Error updating category:", error);
        });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-black opacity-5"></div>
      <div className="z-10 relative bg-white py-5 rounded-xl shadow-xl min-w-[200px] md:min-w-[300px]">
        <div className="flex justify-between px-5 w-full border-b-2 pb-2">
          <h2 className="text-black font-semibold">Edit Junologix</h2>
          <span className="cursor-pointer" onClick={onClose}>
            <TfiClose />
          </span>
        </div>
        <div className="px-5 w-full ">
          <form onSubmit={handleSubmit}>
            <label htmlFor="abr" className="mb-5">
              abr:
            </label>
            <input
              className="bg-slate-50 w-full py-4 px-8 rounded-lg mt-3 focus:border-none focus:shadow-green-100 focus:shadow-md outline-none"
              type="text"
              id="abr"
              value={junoName}
              onChange={handleJunoNameChange}
            />

            <label htmlFor="state" className="mb-5">
              State:
            </label>
            <input
              className="bg-slate-50 w-full py-4 px-8 rounded-lg mt-3 focus:border-none focus:shadow-green-100 focus:shadow-md outline-none"
              type="text"
              id="state"
              value={junoState}
              onChange={handleJunoStateChange}
            />

            <label htmlFor="return" className="mb-5">
              Return:
            </label>
            <input
              className="bg-slate-50 w-full py-4 px-8 rounded-lg mt-3 focus:border-none focus:shadow-green-100 focus:shadow-md outline-none"
              type="text"
              id="return"
              value={junoReturn}
              onChange={handleJunoReturnChange}
            />

            <label htmlFor="status" className="mb-5">
              Status:
            </label>
            <input
              className="bg-slate-50 w-full py-4 px-8 rounded-lg mt-3 focus:border-none focus:shadow-green-100 focus:shadow-md outline-none"
              type="text"
              id="status"
              value={junoStatus}
              onChange={handleJunoStatusChange}
            />
            <div className="w-full align-middle items-center justify-center flex mt-10 mb-5">
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

export default EditJunologix;
