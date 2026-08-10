import {Outlet} from 'react-router-dom'; export function AuthLayout(){return <div className="auth-page"><div className="auth-brand"><span>R</span><strong>relay</strong><p>Everything your business needs to move forward.</p></div><div className="auth-panel"><Outlet/></div></div>}

