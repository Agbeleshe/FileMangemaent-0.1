import React, { useState } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { DateRangePickerCalendar, START_DATE } from "react-nice-dates";
//import "react-nice-dates/build/style.css";
import "./ReactdatePicker.css";
export default function DateRangePickerCalendarExample() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focus, setFocus] = useState(START_DATE);
  const handleFocusChange = (newFocus) => {
    setFocus(newFocus || START_DATE);
  };
  return (
    <div className="detail px-3 absolute" style={{ zIndex: 200 }}>
      {/* Adjust the zIndex value */}
      <div className="flex gap justify-between items-center border rounded-md p-2 text-sm font-Poppins bg-white mb-5">
        <p className="mr-3 text-xs">
          <span className=" text-[#707070]">From :</span>
          {startDate
            ? format(startDate, " dd  MMM,  yyyy", { locale: enGB })
            : "none"}
        </p>
        <p className="ml-3 text-xs">
          <span className="text-[#707070]">To :</span>
          {endDate
            ? format(endDate, " dd  MMM,  yyyy", { locale: enGB })
            : "none"}
        </p>
      </div>
      {/*   <p>Currently selecting: {focus}.</p>*/}
      <div className="calender">
        <DateRangePickerCalendar
          startDate={startDate}
          endDate={endDate}
          focus={focus}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onFocusChange={handleFocusChange}
          locale={enGB}
        />
      </div>
    </div>
  );
}
