export const makeStyle = (status: string) => {
    let color = "";
    if (status === "New Trial") {
      color = "gray";
    } else if (status === "Active Paid") {
      color = "green";
    } else if (status === "Pause") {
      color = "skyblue";
    } else if (status === "Cancel") {
      color = "purple";
    } else if (status === "Delete") {
      color = "red";
    }
    return {
      color,
    };
  };
  