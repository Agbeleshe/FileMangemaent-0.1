import React from "react";
export default function TimeLinkHeader() {
  return (
    <div className="bg-headerbg shadow-md h-16 px-4 flex items-center border-b border-gray-200 justify-between font-Poppins">
      <div className="relative">
        <h2 className="text-text-blk font-poppins font-medium text-2xl ml-5">
          TimeLink
        </h2>
      </div>
      <div className="flex items-center gap-3 mr-4 ">
        <h2 className="text-505050 text-right font-poppins text-lg font-extralight ">
          Email
        </h2>
        <div className="w-10 h-10 flex-shrink-0 rounded-full border-4  border-green-600 bg-green-600">
          <p className="text-white text-center font-bold text-2xl font-lexend-deca">
            A
          </p>
        </div>
      </div>
    </div>
  );
}
