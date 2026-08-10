import {Outlet} from 'react-router-dom'; import {Sidebar} from './Sidebar';import {Header} from './Header';import {BottomNav} from './BottomNav'; export function AppShell(){return <div className="app-shell"><Sidebar/><div className="main"><Header/><Outlet/></div><BottomNav/></div>}

