import React, { useState } from "react";
import Lottie from "lottie-react";
import add from "../../../assests/noFile.json";

const NoFile = () => {
  return (
    <div className="h-[50vh] w-full mx-auto flex text-center font-extralight mt-3 flex-col ">
      <h2 className="font-extralight">
        Sorry, There are no Information available here.
      </h2>
      <div className="h-[100%] w-full flex justify-center">
        <Lottie loop={false} animationData={add} />
      </div>
    </div>
  );
};
export default NoFile;
