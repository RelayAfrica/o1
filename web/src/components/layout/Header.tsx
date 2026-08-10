import {useAppStore} from '../../store/app.store'; export function Header(){const business=useAppStore(s=>s.business);return <header className="header"><div><span className="mobile-logo">R</span><strong>{business?.name??'Your workspace'}</strong></div><div className="header-user">{business?.name?.slice(0,1)??'R'}</div></header>}

