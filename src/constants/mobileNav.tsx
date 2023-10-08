import Dash from '../components/mobile-svg-icons/Dash'
import Users from '../components/mobile-svg-icons/Users'
import FileIcon from '../components/mobile-svg-icons/FileIcon'
import AcctIcon from '../components/mobile-svg-icons/AcctIcon'
import Download from '../components/mobile-svg-icons/Download'
import Dots from '../components/svg-icons/Dots'
import Question from '../components/mobile-svg-icons/Question';
import { Link, NavLink } from 'react-router-dom';
export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/PaperLink',
    icon: <NavLink to="/PaperLink"><Dash /></NavLink>
  },
  {
    key: 'User',
    label: 'User Log',
    path: '/User',
    icon: <NavLink to="/User"><Users /></NavLink>
  },
  {
    key: 'File',
    label: 'File Manager',
    path: '/File',
    icon: <NavLink to="/File"><FileIcon /></NavLink>
  },
  {
    key: 'Accounts',
    label: 'Accounts',
    path: '/Accounts',
    icon: <NavLink to="/Accounts"><AcctIcon /></NavLink>
  },
  {
    key: 'accountRecieve',
    label: 'Account Receivable',
    path: '/AccountRecieve',
    icon: <NavLink to="/AccountRecieve"><Download /></NavLink>
  },
  {
    key: 'Teams',
    label: 'Teams',
    path: '/Teams',
    icon: <Link to="/Teams"><Users /></Link>
  },
  {
    key: 'Qna',
    label: 'QnA',
    path: '/Qna',
    icon: <NavLink to="/Qna"><Question /></NavLink>
  },
];



