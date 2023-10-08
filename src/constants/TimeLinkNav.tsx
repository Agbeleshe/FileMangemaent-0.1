import Dash from "../components/svg-icons/Dash";
import Users from "../components/svg-icons/Users";
import FileIcon from "../components/svg-icons/FileIcon";
import AcctIcon from "../components/svg-icons/AcctIcon";
import Download from "../components/svg-icons/Download";
import Question from "../components/svg-icons/Question";
import Hash from "../components/svg-icons/Hash";
import { Link } from "react-router-dom";
export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/TimeLinkDash",
    icon: (
      <Link to="/TimeLinkDash">
        <Dash />
      </Link>
    ),
  },
  {
    key: "User",
    label: "User Log",
    path: "/TimeLinkUser",
    icon: (
      <Link to="/TimeLinkUser">
        <Users />
      </Link>
    ),
  },
  {
    key: "SheetLog",
    label: "Sheet Log",
    path: "/TimeLinkSheetlog",
    icon: (
      <Link to="/TimeLinkSheetlog">
        <FileIcon />
      </Link>
    ),
  },
  {
    key: "Accounts",
    label: "Accounts",
    path: "/TimeLinkAccount",
    icon: (
      <Link to="/TimeLinkAccount">
        <AcctIcon />
      </Link>
    ),
  },

  {
    key: "Timelink",
    label: "Timelink",
    path: "/Timelink",
    icon: (
      <Link to="/Timelink">
        <Hash />
      </Link>
    ),
  },

  {
    key: "accountRecieve",
    label: "Account Receivable",
    path: "/TimeAccountRecievable",
    icon: (
      <Link to="/TimeAccountRecievable">
        <Download />
      </Link>
    ),
  },
  {
    key: "Qna",
    label: "QnA",
    path: "/TimeLinkQna",
    icon: (
      <Link to="/TimeLinkQna">
        <Question />
      </Link>
    ),
  },
];
