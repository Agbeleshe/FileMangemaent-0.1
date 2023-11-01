import React, { useState } from "react";
import Lottie from "lottie-react";
import noRecords from "../../../assests/noRecords.json";

const Empty = ({ activeTab, searchValue }) => {
  const [boolean, setBoolean] = useState(false);
  return (
    <div className="h-[50vh] w-full mx-auto flex text-center font-extralight mt-3 flex-col">
      <h2>
        Sorry, No Records Found For{" "}
        {searchValue && <span className="text-red-500">"{searchValue}"</span>}{" "}
        <span
          className="underline ring-offset-1 hover:text-cyan-400 cursor-pointer"
          onClick={() => setBoolean(!boolean)}
        >
          {!searchValue && activeTab}
        </span>
      </h2>
      <div className="h-[100%] w-full flex justify-center">
        <Lottie loop={boolean} animationData={noRecords} />
      </div>
    </div>
  );
};

export default Empty;
