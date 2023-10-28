import React, { useState, useEffect } from "react";
import "./PaperLink.css";
import img from "../../assests/coomingSoon.gif";
import { useSelector } from "react-redux";

import { selectActiveTabLabel } from "../../store/tab-slice";

const PaperLink = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const activeTab = useSelector(selectActiveTabLabel);

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

  return (
    <div className="emoji-container h-full w-full">
      <div>
        {activeTab === "Paperlink" ? (
          <div>
            <h1 className="font-extralight w-[100%] text-center mx-auto ">
              Beware Of The Ghost That Haunts The Empty Dashboard!!
            </h1>
            <div
              title="wwwhooooaaaooo...!!!!"
              className="emoji cursor-not-allowed"
              style={{ left: `${positionX}px`, top: `${positionY}px` }}
            >
              👻
            </div>
          </div>
        ) : (
          <div className="flex font-extralight justify-center w-full mx-auto flex-col text-center align-middle h-full ">
            <h2>{activeTab} will be Coming Soon...</h2>
            <div className=" w-full flex items-center mx-auto justify-center mt-5 h-[50vh]">
              <img src={img} alt="" height={200} width={200} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaperLink;
