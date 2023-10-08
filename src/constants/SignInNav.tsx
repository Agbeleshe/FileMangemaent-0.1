import Dash from '../components/svg-icons/Dash'
import Users from '../components/svg-icons/Users'
import FileIcon from '../components/svg-icons/FileIcon';
import AcctIcon from '../components/svg-icons/AcctIcon'
import Download from '../components/svg-icons/Download'
import Question from '../components/svg-icons/Question';
import Hash from '../components/svg-icons/Hash';
import { Link } from 'react-router-dom';
export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/SignInDash',
    icon: <Link to="/SignInDash"><Dash /></Link>
  },
  {
    key: 'User',
    label: 'User Log',
    path: '/SignInUser',
    icon: <Link to="/SignInUser"><Users /></Link>
  },
  {
    key: 'SheetLog',
    label: 'Sheet Log',
    path: '/SheetLog',
    icon: <Link to="/SheetLog"><FileIcon /></Link>
  },
  {
    key: 'Accounts',
    label: 'Accounts',
    path: '/SignInAccount',
    icon: <Link to="/SignInAccount"><AcctIcon /></Link>
  },

  {
    key: 'SignInLink',
    label: 'SignInLink',
    path: '/SignInLink',
    icon: <Link to="/SignInLink"><Hash /></Link>
  },

  {
    key: 'accountRecieve',
    label: 'Account Receivable',
    path: '/AccountRecievable',
    icon: <Link to="/AccountRecievable"><Download /></Link>
  },
  {
    key: 'Qna',
    label: 'QnA',
    path: '/SignInQna',
    icon: <Link to="/SignInQna"><Question /></Link>
  },
];



