import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TimeAccountRecievable from "../pages/TimeLink/TimeAccountRecievable";
import TimeLinkAccount from "../pages/TimeLink/TimeLinkAccount";
//tabs under account
import Tab from "../components/TimeLinkTabs/Tab";
import TabTwo from "../components/TimeLinkTabs/TabTwo";
import TimeLinkDash from "../pages/TimeLink/TimeLinkDash";
import TimeLinkLayout from "../components/TimelinkShared/TimeLayout";
import Timelink from "../pages/TimeLink/Timelink";
import TimeLinkQna from "../pages/TimeLink/TimeLinkQna";
import TimeLinkSheetlog from "../pages/TimeLink/TimeLinkSheetlog";
import TimeLinkUser from "../pages/TimeLink/TimeLinkUser";

const TimeLinkRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<TimeLinkLayout />}>
            <Route path="/" element={<Navigate to="TimeLinkDash" replace />} />
            <Route
              path="TimeAccountRecievable"
              element={<TimeAccountRecievable />}
            />
            <Route path="TimeLinkUser" element={<TimeLinkUser />} />
            <Route path="TimeLinkAccount" element={<TimeLinkAccount />}>
              <Route path="tab" element={<Tab />} />
              <Route path="tabtwo" element={<TabTwo />} />
            </Route>

            <Route path="Timelink" element={<Timelink />} />
            <Route path="TimeLinkSheetlog" element={<TimeLinkSheetlog />} />
            <Route path="TimeLinkQna" element={<TimeLinkQna />} />
            <Route path="TimeLinkDash" element={<TimeLinkDash />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};
export default TimeLinkRoutes;
