import React, { useState } from "react";
import Dots from "../../components/svg-icons/Dots";
import PlusGreen from "../../components/svg-icons/PlusGreen";
import DeleteIcon from "../../components/svg-icons/DeleteIcon";
import EditIcon from "../../components/svg-icons/EditIcon";

const TimeLinkQna = () => {
  const [modalOne, setModalOne] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const questionsAndAnswers = [
    {
      question: "What are all the ways that I can share my Paperlink",
      answer: "paperlink",
    },
    {
      question: "What is a Paperlink business page?",
      answer: "paperlink",
    },
    {
      question: "How do people fill out my Paperlink?",
      answer: "paperlink",
    },
    {
      question: "Are Paperlinks free for people to fill out?",
      answer: "paperlink",
    },
    {
      question: "What are the three actions of Paperlink?",
      answer: "paperlink",
    },
  ];
  //MODAL SELECTION

  const handleModalClose = () => {
    setModalOne(false);
    setModalTwo(false);
  };

  const handleModalOne = () => {
    setModalOne(!modalOne);
  };

  const handleModalTwo = () => {
    setModalTwo(!modalTwo);
  };

  const FirstModal = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="z-10 relative bg-white py-5 rounded-xl shadow-xl min-w-[300px] md:min-w-[400px]">
          <div className="flex justify-between px-5 w-full border-b-2 pb-2">
            <div className="text-black font-semibold ">Add New Category</div>
            <p className="cursor-pointer" onClick={handleModalClose}>
              X
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
              />
            </form>

            <div className="w-full align-middle items-center justify-center flex mt-10 mb-5 ">
              <button className="px-8 py-3 text-white bg-green-500 rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SecondModal = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="z-10 relative bg-white py-5 rounded-xl shadow-xl w-auto md:min-w-[800px]">
          <div className="flex justify-between px-5 mb-3 w-full border-b-2 pb-2">
            <div className="text-black font-semibold ">Add New Category</div>
            <p className="cursor-pointer" onClick={handleModalClose}>
              X
            </p>
          </div>

          <div className="px-5 w-full">
            <form action="">
              <div className="h-auto px-5">
                {/* input field one */}
                <div>
                  <label className="mb-5">Category</label>
                  <div className="w-full align-middle items-center justify-center flex  mb-5 relative">
                    <select
                      className="bg-slate-50 w-full py-4 px-8 rounded-lg outline-none mt-3"
                      style={{ appearance: "none" }}
                    >
                      <option value="paperlink">Paperlink</option>
                      <option value="option1">Option1</option>
                      <option value="option2">Option2</option>
                      <option value="option3">Option3</option>
                      <option value="option4">Option4</option>
                    </select>
                    <div className="select-arrow absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-7 h-8 fill-current text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a1 1 0 01-.7-.29l-3-3a1 1 0 111.41-1.42L10 10.17l2.29-2.3a1 1 0 111.42 1.42l-3 3a1 1 0 01-.71.3z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* input field two */}
                <div>
                  <label className="mb-5">Question</label>
                  <input
                    className="bg-slate-50 w-full py-4 px-8 rounded-lg mt-3 focus:border-none focus:shadow-green-100 focus:shadow-md outline-none  "
                    placeholder="What is it...?"
                    type="text"
                    name="Question"
                  />
                </div>

                {/* input field three */}
                <div className="mt-5">
                  <label className="mb-5">Answer:</label>
                  <textarea
                    className="bg-slate-50 w-full h-32 py-4 px-8 rounded-lg mt-3 focus:border-none focus:shadow-green-100 focus:shadow-md outline-none  "
                    placeholder="What is it...?"
                    name="Question"
                  />
                </div>
              </div>
            </form>

            <div className="w-full align-middle items-center justify-center flex mt-10 mb-5 ">
              <button className="px-8 py-3 text-white bg-green-500 rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-32 md:mb-0 border-radius-[0.9375rem] bg-white width-[65.75rem] h-auto overflow-hidden font-Poppins rounded-lg  ">
      <div className="bg-secondaryColor flex justify-between h-[4.1875rem] rounded-t-lg px-4 py-2">
        <div className="border-b-0 text-black font-medium leading-normal text-2xl">
          QnA
        </div>
        <div className="border-b-0">
          <span
            onClick={handleModalOne}
            className="inline-flex items-center justify-center w-12 h-12 flex-shrink-0 fill-current active:bg-slate-300 bg-white rounded-full shadow-drop"
          >
            <PlusGreen />
          </span>
        </div>
      </div>
      {modalOne ? <FirstModal /> : ""}
      <div className="p-3">
        <div className="shadow-full mb-4 ">
          <h1 className="font-semibold text-black">Category</h1>
          <div className="shadow-full shadow-sm shadow-gray-200 border border-gray-100 rounded-lg text-sm">
            <p className="bg-white  rounded-lg border-t border-gray-100 p-3  gap-3 flex items-center">
              <span className="ml-2">
                <Dots />
              </span>
              paperlink
            </p>
            <p className="bg-white  rounded-lg  border-t border-gray-100 p-3  flex items-center gap-3 ">
              <span className="ml-2">
                <Dots />
              </span>
              Billing
            </p>
          </div>
        </div>

        {/**send side */}
        <div className="shadow-full  ">
          <div className="flex justify-between mb-1">
            <h1 className="font-semibold text-black">Questions & Answers</h1>
            <span
              onClick={handleModalTwo}
              className="inline-flex items-center justify-center w-12 h-12 flex-shrink-0 fill-current active:bg-slate-300 bg-white rounded-full shadow-full drop-shadow-lg"
            >
              <PlusGreen />
            </span>
          </div>
          {modalTwo ? <SecondModal /> : ""}
          <div className="shadow-full shadow-sm shadow-gray-200 border border-gray-100 rounded-lg text-sm mb-5">
            <p className="bg-white  rounded-lg border-t border-gray-100 p-2  gap-3 flex items-center">
              <span className="ml-2">
                <Dots />
              </span>
              paperlink
            </p>
            {/**mapped arraies */}
            <div className="shadow-full shadow-sm shadow-gray-200 border border-gray-100 rounded-lg text-sm ">
              {questionsAndAnswers.map((qa, index) => (
                <div
                  key={index}
                  className="flex justify-between border border-gray-50 "
                >
                  <p className="bg-white rounded-lg border-t border-gray-100 p-2 flex items-center gap-3 ">
                    <span className="ml-2">
                      <Dots />
                    </span>
                    {qa.question}
                  </p>
                  <p className="flex gap-5 px-2">
                    <EditIcon />
                    <span>
                      <DeleteIcon />
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLinkQna;
