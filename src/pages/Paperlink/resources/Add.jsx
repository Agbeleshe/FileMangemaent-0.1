import React, { useState } from "react";
import Lottie from "lottie-react";
import add from "../../../assests/add.json";

const Add = ({ activeTab, setModalOne }) => {
  return (
    <div className="h-[50vh] w-full mx-auto flex text-center font-extralight mt-3 flex-col bg-slate-200">
      <h2 className="font-extralight">
        Sorry, No Records Found For
        <span className="underline mx-2 ring-offset-1 hover:text-cyan-400 cursor-pointer">
          {activeTab}
        </span>
        ,Try adding some information
      </h2>
      <div
        className="h-[100%] w-full flex justify-center"
        onClick={() => setModalOne(true)}
      >
        <Lottie loop={true} animationData={add} />
      </div>
    </div>
  );
};
export default Add;
