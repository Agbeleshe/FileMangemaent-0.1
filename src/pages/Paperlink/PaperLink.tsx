import React, { useEffect, useState } from "react";
import "./PaperLink.css"; // Import your CSS file
import { BounceLoader } from "react-spinners";
import ReactdatePicker from "./resources/ReactdatePicker";
const PaperLink = () => {
  return (
    <div className="align-middle h-[50vh]  ">
      <div className="text-center ">
        <div className="text-3xl font-extralight spin">
          {/*         <BounceLoader color={"green"} size={40} />
           */}
        </div>
        <div className="text-3xl font-extralight opsspin">
          {/*         <BounceLoader color={"green"} size={40} />*/}
        </div>
      </div>
    </div>
  );
};

export default PaperLink;
