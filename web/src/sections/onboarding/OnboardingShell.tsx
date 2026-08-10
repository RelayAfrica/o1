import {Outlet} from 'react-router-dom';export function OnboardingShell(){return <div className="onboarding"><header><div className="logo"><span>R</span> relay</div><div className="progress"><b></b><b></b><b></b><b></b><b></b></div><a href="#skip">Skip →</a></header><main><Outlet/></main></div>}

