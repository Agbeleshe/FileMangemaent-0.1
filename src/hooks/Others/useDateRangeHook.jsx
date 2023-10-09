function DateRangeHook({ startDate, endDate }) {
  // Use startDate and endDate in your other component as needed
  return (
    <div className="hidden">
      <p>Start Date: {startDate ? startDate.toDateString() : "none"}</p>
      <p>End Date: {endDate ? endDate.toDateString() : "none"}</p>
    </div>
  );
}

export default DateRangeHook;
