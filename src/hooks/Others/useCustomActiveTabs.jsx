import { useSelector, useDispatch } from "react-redux";
import { selectActiveTabLabel } from "../../store/tab-slice";

const useCustomActiveTabs = () => {
    const activeTab = useSelector(selectActiveTabLabel);
  //DO NOT TOUCH
  let customActiveTab = "Paperlink";
  if (activeTab === "Signinlink") {
    customActiveTab = "Signinlink";
  } else if (activeTab === "Timelink") {
    customActiveTab = "Timelink";
  } else if (activeTab === "RXlink") {
    customActiveTab = "RXlink";
  } else if (activeTab === "Hostlink") {
    customActiveTab = "Hostlink";
  }
  return { customActiveTab };
};
export default useCustomActiveTabs;
