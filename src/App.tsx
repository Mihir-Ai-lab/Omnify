import React from 'react';
import LandingPage from './pages/LandingPage';

function App() {
  // For now, we'll just show the landing page
  // In a real app, you'd use React Router or similar for routing
  const currentPath = window.location.pathname;

  switch (currentPath) {
    case '/dashboard':
      return React.lazy(() => import('./pages/Dashboard'));
    case '/campaigns':
      return React.lazy(() => import('./pages/CampaignList'));
    case '/campaigns/new':
      return React.lazy(() => import('./pages/CampaignForm'));
    case '/settings':
      return React.lazy(() => import('./pages/Settings'));
    default:
      return <LandingPage />;
  }
}

export default App;