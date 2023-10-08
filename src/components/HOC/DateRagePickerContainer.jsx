import React, { useState } from "react";
import DateRangePickerCalendarExample from "../../pages/Paperlink/resources/ReactdatePicker";

export default function DateRangePickerContainer() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <div>
      {/* Render your DateRangePickerCalendarExample component */}
      <DateRangePickerCalendarExample
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      {/* You can render more instances of DateRangePickerCalendarExample with different props here */}
    </div>
  );
}
