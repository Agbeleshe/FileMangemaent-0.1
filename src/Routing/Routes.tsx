import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "../components/PaperlinkShared/Layout";
import User from "../pages/Paperlink/User";
import Accounts from "../pages/Paperlink/Accounts";
import Tabs from "../components/Tabs";
import Tab1 from "../components/Tab1";
import Tab2 from "../components/Tab2";
import Teams from "../pages/Paperlink/Teams";
import AccountReceive from "../pages/Paperlink/AccountReceive";

import File from "../pages/Paperlink/File";
import Qna from "../pages/Paperlink/Qna";
import PaperLink from "../pages/Paperlink/PaperLink";
import Login from "../components/Login/Login";
//trying things out.
import PrivateRoutesLayout from "./PrivateRoutesLayout";
import ForgotPassword from "../components/Login/ForgotPassword";
import SessionTimeout from "../components/Login/SessionTimeout";
import ResetPassword from "../components/Login/ResetPassword";
import JunologixReports from "../pages/Paperlink/JunologixReports";
import QnAJunologix from "../pages/Paperlink/QnAJunologix";
const MainRoutes = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const [users, setUsers] = useState([]);

  return (
    <div>
      <Router>
        {/**   <SessionTimeout timeoutInMs={12 * 60 * 60 * 1000} />*/}
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />

          {/*  <Route path="/" element={<Login />} />*/}

          <Route path="/" element={<PrivateRoutesLayout />}>
            <Route path="user" element={<User />} />
            <Route path="/" element={<Navigate to="paperLink" replace />} />
            <Route path="File" element={<File />} />
            <Route path="accounts" element={<Accounts />}>
              <Route
                path="tabs"
                element={<Tabs selectedUser={selectedUser} users={users} />}
              />
              <Route
                path="tab1"
                element={<Tab1 selectedUser={selectedUser} users={users} />}
              />

              <Route
                path="tab2"
                element={<Tab2 selectedUser={selectedUser} users={users} />}
              />
            </Route>
            <Route path="Teams" element={<Teams />} />
            <Route path="AccountRecieve" element={<AccountReceive />} />
            <Route path="Qna" element={<Qna />} />
            <Route path="QnAJunologix" element={<QnAJunologix />} />
            <Route path="JunologixReports" element={<JunologixReports />} />

            <Route path="paperLink" element={<PaperLink />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default MainRoutes;
