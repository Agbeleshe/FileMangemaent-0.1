import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { SubscriptionData } from "../Subscription";
import { BASE_URL } from "../../../../utils/axios-util";
import Loader from "../Loader";

interface Tab2Props {
  selectedUser: any | undefined;
  users: any[];
}


const Tab2: React.FC<Tab2Props> = ({ selectedUser }) => {

  const [users, setUsers] = useState<SubscriptionData[]>([]);
  const [count, setCount] = useState<number>(1);
  const [papercount, setPaperCount] = useState<number>(1);
  const [fillablecount, setFillableCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [WhiteGloveService, setWhiteGloveService] = useState<number>(1);


  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const incrementPaperCount = () => {
    setPaperCount(papercount + 1);
  };

  const decrementPaperCount = () => {
    if (papercount > 0) {
      setPaperCount(papercount - 1);
    }
  };
  const incrementFillableCount = () => {
    setFillableCount(fillablecount + 1);
  };

  const decrementFillableCount = () => {
    if (fillablecount > 0) {
      setFillableCount(fillablecount - 1);
    }
  };
  const incrementWhiteCount = () => {
    setWhiteGloveService(WhiteGloveService + 1);
  };
  const decrementWhiteCount = () => {
    if (WhiteGloveService > 0) {
      setWhiteGloveService(WhiteGloveService - 1);
    }
  };


  useEffect(() => {
    setLoading(true);

    axiosInstance
      .get<{ data: SubscriptionData[] }>("/subscriptions?")
      .then((res) => {
        setUsers(res.data.data);
        setLoading(false);
       
       // console.log("Selectedusers :", selectedUser);
        // console.log(" userId :", users)
      })
      .catch((err) => {
        setLoading(false);
        console.error("There was an error fetching data:", err);
      });
  }, []);
  const filteredUsers = users.filter((user) => selectedUser.id === user.userId);
   //console.log("filtered: ",filteredUsers)


  return (
    <div className="text-xs md:text-sm  rounded-b-lg rounded-[19.097px] bg-white shadow-md">
            {loading ? (
        <Loader />
      ) : (

      <div>
                  {filteredUsers.map((user) => (

          <div key={user.id} className="">
            {/* First div and starting */}
            <div className="grid border-b grid-cols-4 py-3 px-3">
              <div className="grid-item border-none">
                <h1 className="font-normal md-font-semibold text-black">
                  Business Page
                </h1>
              </div>
              <div className="grid-item border-none text-center m-auto ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 29 29"
                  fill="none"
                  className="w-5 h-5 md:w-18 md:h-18"
                >
                  <rect
                    x="0.8125"
                    y="0.5"
                    width="26"
                    height="26"
                    rx="7.5"
                    stroke="#505050"
                  />
                  <path
                    d="M22.3125 8.71973L11.3125 19.7197L6.3125 14.7197"
                    stroke="#151515"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="grid-item text-center m-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 29 29"
                  fill="none"
                  className="w-5 h-5 md:w-18 md:h-18"
                >
                  <rect
                    x="0.8125"
                    y="0.5"
                    width="25"
                    height="25"
                    rx="7.5"
                    stroke="#505050"
                  />
                  <path
                    d="M22.3125 8.71973L11.3125 19.7197L6.3125 14.7197"
                    stroke="#151515"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="grid-item text-end md:mr-12">$10.00</div>
            </div>
            {/* Second div */}
            <div className="grid border-b grid-cols-4 py-3 px-3">
              {/* ... Other content */}
              <div className="grid-item border-none">
                <h1 className=" font-normal md:font-semibold text-black">
                  Team Member
                </h1>
              </div>
              <div className="grid-item border-none text-center">
                ${user.teamMembers}.00
              </div>
              <div className="grid-item text-center ">
                <div className=" flex justify-center  bg-counter w-24 mx-auto rounded-md text-black">
                  <button
                    className="w-16 hover:bg-gray-100 hover:rounded-md "
                    onClick={decrementCount}
                  >
                    -
                  </button>
                  <div className="bg-white w-20 border rounded-md text-center">
                    {count}
                  </div>

                  <button
                    className="w-16  hover:bg-gray-100 hover:rounded-md"
                    onClick={incrementCount}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="grid-item text-end  md:mr-12">
                ${count * user.teamMembers}.00
              </div>
            </div>
            {/* Third div */}
            <div className="grid border-b grid-cols-4 py-3 px-3">
              {/* ... Other content */}
              <div className="grid-item border-none">
                <h1 className="font-semibold text-black">Paperlink Page</h1>
              </div>
              <div className="grid-item border-none text-center">
                ${user.paperlink}.00
              </div>
              <div className="grid-item text-center">
                <div className=" flex justify-center  bg-counter w-24 mx-auto rounded-md text-black">
                  <button
                    className="w-16 hover:bg-gray-100 hover:rounded-md "
                    onClick={decrementPaperCount}
                  >
                    -
                  </button>
                  <div className="bg-white w-20 border rounded-md text-center">
                    {papercount}
                  </div>

                  <button
                    className="w-16  hover:bg-gray-100 hover:rounded-md"
                    onClick={incrementPaperCount}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="grid-item text-end  md:mr-12">
                ${papercount * user.paperlink}.00
              </div>
            </div>
            {/* Fourth div (1) */}
            <div className="grid grid-cols-4 py-3 px-3">
              {/* ... Other content */}
              <div className="grid-item border-none">
                <h1 className="font-normal   md:font-semibold text-black text-sm flex">
                  Fillable PDF
                  <span className="text-[9px] text-[#707070] ml-2">
                    (One time charge)
                  </span>
                </h1>
              </div>
              <div className="grid-item border-none text-center">
                <p className="">${user.fillablePdf}.00</p>
              </div>
              <div className="grid-item text-center ">
                <div className=" flex justify-center  bg-counter w-24 mx-auto rounded-md text-black">
                  <button
                    className="w-16 hover:bg-gray-100 hover:rounded-md "
                    onClick={decrementFillableCount}
                  >
                    -
                  </button>
                  <div className="bg-white w-20 border rounded-md text-center">
                    {fillablecount}
                  </div>

                  <button
                    className="w-16  hover:bg-gray-100 hover:rounded-md"
                    onClick={incrementFillableCount}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="grid-item text-end md:mr-12">
                ${fillablecount * user.fillablePdf}.00
              </div>
            </div>
            {/* Fourth div (2) */}
            <div className="grid border-b border-[#BABABA]  grid-cols-4 py-3 px-3 text-sm">
                {/* ... Other content */}
                <div className="grid-item border-none  ">
                  <div className=" flex items-center">
                    <h1 className="font-normal  md:font-semibold text-sm flex ">
                      White Glove Service
                      <span className="text-[8px] hidden md:flex text-[#707070] ml-2 ">
                        (One time charge)
                      </span>
                    </h1>
                  </div>
                </div>
                <div className="grid-item border-none text-center">
                  {user.whiteGloveService}
                </div>
                <div className="grid-item text-center">
                  <div className=" flex justify-center  bg-counter w-24 mx-auto rounded-md text-black">
                    <button
                      className="w-16 hover:bg-gray-100 hover:rounded-md "
                      onClick={decrementWhiteCount}
                    >
                      -
                    </button>
                    <div className="bg-white w-20 border rounded-md text-center">
                      {WhiteGloveService}
                    </div>

                    <button
                      className="w-16  hover:bg-gray-100 hover:rounded-md"
                      onClick={incrementWhiteCount}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="grid-item  text-end md:mr-12">
                  {WhiteGloveService * user.whiteGloveService}
                </div>
              </div>


            {/* The div for end */}
            <div className="grid grid-cols-2 py-5 px-3 shadow-full rounded-b-lg">
              {/* ... Other content */}
              <div className="grid-item text-start">
                <h1 className="font-normal md:font-bold text-md ">
                  Total Amount
                </h1>
              </div>
              <div className="grid-item  text-end md:mr-10 lg:ml-10  font-normal md:font-bold ">
                $
                <span>
                  {papercount * user.paperlink +
                    fillablecount * user.fillablePdf +
                    count * user.teamMembers +
                    10}
                  .00
                </span>
              </div>
            </div>
          </div>
        ))}
         {filteredUsers.length < 1 && (
            <div className="flex justify-center mt-1 bg-slate-100 text-gray-400 w-full text-xs md:text-sm p-2 items-center align-middle h-full">
              Sorry, No Subscription  available for this user!
            </div>
          )}
      </div>
      )}
    </div>
  );
};

export default Tab2;