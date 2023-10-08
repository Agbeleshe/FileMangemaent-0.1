function convertDateTime(dateTimeString: string) {
  const originalDate = new Date(dateTimeString);
  const formattedDate = originalDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const formattedTime = originalDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="text-lightGray font-Poppins font-normal leading-normal px-3 text-xs md:text-sm flex flex-row md:flex-col gap-1">
      <span>{formattedDate}</span> <span>{formattedTime}</span>
    </div>
  );
}

export default convertDateTime;
