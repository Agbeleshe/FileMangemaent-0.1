import React, { useState, useEffect } from 'react';
import './PaperLink.css';

const PaperLink = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

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
      <h1 className='font-extralight w-[100%] text-center mx-auto cursor-not-allowed' >Beware Of The Ghost That Haunts The Empty Dashboard!!</h1>
      <div className="emoji" style={{ left: `${positionX}px`, top: `${positionY}px` }}>
        👻
      </div>
    </div>
  );
};

export default PaperLink;
