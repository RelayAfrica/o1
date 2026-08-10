import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import { Shell } from './components/layout/Shell';
import Home from './pages/Home';
import Customers from './pages/Customers';
import Marketing from './pages/Marketing';
import Orders from './pages/Shop';
import More from './pages/More';
import Login from './pages/login';
import OnboardingWizard from './pages/whatsapp-onboarding/OnboardingWizard';
import {useLocation} from 'wouter';

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-2xl font-extrabold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground font-medium text-sm">The page you're looking for doesn't exist.</p>
    </div>
  );
}

function OnboardingRoute() {
  const [, navigate] = useLocation();
  return <OnboardingWizard onPublished={() => navigate('/')} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Switch>
            <Route path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/onboarding" component={OnboardingRoute} />
            <Route>
              <Shell>
                <Switch>
                  <Route path="/dashboard" component={Home} />
                  <Route path="/customers" component={Customers} />
                  <Route path="/marketing" component={Marketing} />
                  <Route path="/orders" component={Orders} />
                  <Route path="/more" component={More} />
                  <Route component={NotFound} />
                </Switch>
              </Shell>
            </Route>
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
