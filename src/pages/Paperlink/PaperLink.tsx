import React, { useState, useEffect } from "react";
import "./PaperLink.css";
import img from "../../assests/admin.json";
import coomingSoon from "../../assests/contruction.json";

import Lottie from "lottie-react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { selectActiveTabLabel, setActiveTabLabel } from "../../store/tab-slice";

//hook for seting tabs to default paperLink
import useCustomActiveTabs from "../../hooks/Others/useCustomActiveTabs";

const PaperLink = () => {
  const [showDiv, setShowDiv] = useState(true);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

    //To set default on paperlink and also to set the active tob for the switch to define endponit
    const {customActiveTab} = useCustomActiveTabs()
    const activeTab = useSelector(selectActiveTabLabel);
    const dispatch = useDispatch();
    
    dispatch(setActiveTabLabel(customActiveTab));


  useEffect(() => {
    // Function to generate random values for X and Y positions
    const generateRandomPosition = () => {
      const maxX = window.innerWidth - 100; // Adjust according to your container width
      const maxY = window.innerHeight - 50; // Adjust according to your container height

      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      setPositionX(randomX);
      setPositionY(randomY);
    };

    // Initial random position
    generateRandomPosition();

    // Set an interval to generate new random positions
    const interval = setInterval(() => {
      generateRandomPosition();
    }, 4000); // Adjust the interval duration as needed

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowDiv(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="emoji-container h-full w-full">
      <div>
        {activeTab === "Paperlink" ? (
          <div>
            <div>
              <div></div>
              {/* Your content goes here */}
              <div className="relative z-10 bg-green-200 w-[40%] p-5 text-green-600 flex justify-center text-center border-r-green-500 border-r-8 ">
                <span
                  className={` absolute my-component top-2 ${
                    showDiv ? "show" : "hide"
                  }`}
                >
                  Welcome to Paperdaz Admin
                </span>
                <span
                  className={`absolute my-component  top-2 ${
                    showDiv ? "hide" : "show"
                  }`}
                >
                  Empty Dashboard...
                </span>
              </div>
            </div>

            <div className="flex flex-col w-full justify-center items-center text-center h-[40vh]">
              <div className="h-fit">
                <div className="h-[100%] w-full mt-2">
                  <Lottie animationData={img} />
                </div>
              </div>
            </div>

            {/* <h1 className="font-extralight w-[100%] text-center mx-auto ">
              Beware Of The Ghost That Haunts The Empty Dashboard!!
            </h1>
            <div
              className="emoji cursor-not-allowed"
              style={{ left: `${positionX}px`, top: `${positionY}px` }}
            >
              👻
            </div> */}
          </div>
        ) : (
          <div className=" text flex  justify-center w-full mx-auto flex-col text-center align-middle h-full ">
            <h2 className="bg-green-50 font-extrabold border-y-4 border-green-500 text-green-500 py-2  ">
              {activeTab} will be Coming Soon...
            </h2>
            <div className=" w-full flex items-center mx-auto justify-center mt-5 h-[50vh]">
              <div className="w-[100%] h-[100%] flex justify-center">
             
                <Lottie animationData={coomingSoon} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaperLink;
