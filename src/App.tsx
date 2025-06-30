import React from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CampaignList from './pages/CampaignList';
import CampaignForm from './pages/CampaignForm';
import Settings from './pages/Settings';

function App() {
  // Simple routing based on pathname for now
  // In a production app, you'd use React Router or Next.js routing
  const currentPath = window.location.pathname;

  const renderPage = () => {
    switch (currentPath) {
      case '/dashboard':
        return <Dashboard />;
      case '/campaigns':
        return <CampaignList />;
      case '/campaigns/new':
        return <CampaignForm />;
      case '/settings':
        return <Settings />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;