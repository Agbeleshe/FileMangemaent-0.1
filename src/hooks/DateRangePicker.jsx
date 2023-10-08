import { useState } from "react";
import { format, parse } from "date-fns";
import moment from "moment";
import { enGB } from "date-fns/locale";
import DateRangeHook from "./useDateRangeHook";
import { DateRangePickerCalendar, START_DATE } from "react-nice-dates";
import "./ReactdatePicker.css";

export default function DateRangePickerCalendarExample(props) {
  const { getDateValue } = props;
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focus, setFocus] = useState(START_DATE);

  const handleFocusChange = (newFocus) => {
    setFocus(newFocus || START_DATE);
    getDateValue(timeStamp(startDate), timeStamp(endDate));
  };

  // Function to handle date selection
  const handleDateSelect = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    getDateValue(timeStamp(startDate), timeStamp(endDate));
  };

  const timeStamp = (val) => {
    if (!val) return;
    // The input date string
    const dateString = val;

    // Create a Moment.js object from the input date string
    const dateMoment = moment(dateString).format("MM-DD-YYYY");
    return dateMoment;
  };

  return (
    <div className="detail px-3 absolute left-[20%] top-[45%] ease-in-out duration-100">
      <div className="flex gap justify-between items-center border rounded-md p-2 text-sm font-Poppins bg-white mb-5">
        <p className="mr-3 text-xs">
          <span className="text-[#707070]">From :</span>
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
      <div className="calender">
        <DateRangePickerCalendar
          startDate={startDate}
          endDate={endDate}
          focus={focus}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onFocusChange={handleFocusChange}
          locale={enGB}
          onRangeFocusChange={handleDateSelect} // Call handleDateSelect when a date range is selected
        />
      </div>
      {/* Pass the startDate and endDate to other components as props */}
      <DateRangeHook startDate={startDate} endDate={endDate} />
    </div>
  );
}
