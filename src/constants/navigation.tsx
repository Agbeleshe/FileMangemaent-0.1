import Dash from '../components/svg-icons/Dash'
import Users from '../components/svg-icons/Users'
import FileIcon from '../components/svg-icons/FileIcon';
import AcctIcon from '../components/svg-icons/AcctIcon'
//import { ReactComponent as AcctIcon } from '../components/svg-icons/AcctIcon';
import Download from '../components/svg-icons/Download'
import Question from '../components/svg-icons/Question';
import { Link } from 'react-router-dom';
import TeamsIcon from '../components/svg-icons/TeamsIcon';
import QnA from '../components/svg-icons/QnA';
import Junolo from '../components/svg-icons/Junolo';
 // const fill = active ? "white" : "#707070"; // Set fill color to white when active

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/PaperLink", //
    icon: (
      <Link to="/PaperLink">
        <Dash />
      </Link>
    ),
  },
  {
    key: "User",
    label: "User Log",
    path: "/User",
    icon: (
      <Link to="/User">
        <Users />
      </Link>
    ),
  },
  {
    key: "File",
    label: "File Manager",
    path: "/File",
    icon: (
      <Link to="/File">
        <FileIcon />
      </Link>
    ),
  },
  {
    key: "Accounts",
    label: "Accounts",
    path: "/Accounts",
    icon: (
      <Link to="/Accounts">
        <AcctIcon />
      </Link>
    ),
  },
  {
    key: "Teams",
    label: "Teams",
    path: "/Teams",
    icon: (
      <Link to="/Teams">
        <TeamsIcon />
      </Link>
    ),
  },

  {
    key: "accountRecieve",
    label: "Account Receivable",
    path: "/AccountRecieve",
    icon: (
      <Link to="/AccountRecieve">
        <Download />
      </Link>
    ),
  },
  {
    key: "Qna",
    label: "QnA Paperdaz",
    path: "/Qna",
    icon: <Question />,
  },
  {
    key: "QnAJunologix",
    label: "QnA Junologix",
    path: "/QnAJunologix",
    icon: <QnA />,
  },
  {
    key: "JunologixReports",
    label: "Junologix Reports",
    path: "/JunologixReports",
    icon: <Junolo />,
  },
];



