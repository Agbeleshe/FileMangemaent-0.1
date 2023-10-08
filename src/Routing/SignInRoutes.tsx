import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SigninLayout from "../components/SigninShared/SigninLayout";
import SignInDash from "../pages/SignInLink/SignInDash";
import SheetLog from "../pages/SignInLink/SheetLog";
import SignInAccount from "../pages/SignInLink/SignInAccount";
//tabs //
import TabTwo from "../components/SignInTabs/TabTwo";
import Tab from "../components/SignInTabs/Tab";
import SignInLink from "../pages/SignInLink/SignInLink";
import SignInQna from "../pages/SignInLink/SignInQna";
import SignInUser from "../pages/SignInLink/SignInUser";
import AccountRecievable from "../pages/SignInLink/AccountRecievable";

import Login from "../components/Login/Login";

const SignInRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Admin singIn route */}
          <Route path="login" element={<Login />} />
          <Route path="/" element={<SigninLayout />}>
            <Route path="/" element={<Navigate to="SignInDash" replace />} />

            <Route path="AccountRecievable" element={<AccountRecievable />} />
            <Route path="SignInUser" element={<SignInUser />} />
            <Route path="SignInAccount" element={<SignInAccount />}>
              <Route path="tab" element={<Tab />} />
              <Route path="tabtwo" element={<TabTwo />} />
            </Route>

            <Route path="SignInLink" element={<SignInLink />} />
            <Route path="SheetLog" element={<SheetLog />} />
            <Route path="SignInQna" element={<SignInQna />} />
            <Route path="SignInDash" element={<SignInDash />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};
export default SignInRoutes;
