// Loader.js
import React from "react";
import { BounceLoader } from "react-spinners";

const Loader = ({ color = "green", size = 80 }) => {
  return (
    <div className="flex gap-12 items-center mt-[20%] md:mt-[5%] justify-center md:h-[200px]">
      <div className="rotating-spinner">
        <BounceLoader color={color} size={size} loading={true} />
        <BounceLoader color={color} size={size} loading={true} />
      </div>
      <h1 className="text-green-500 text-xl font-extralight">Please wait...</h1>
    </div>
  );
};

export default Loader;
