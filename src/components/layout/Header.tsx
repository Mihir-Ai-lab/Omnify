import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Menu, X, Bell, User, Settings, LogOut, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';

export interface HeaderProps {
  variant?: 'landing' | 'dashboard';
}

const Header: React.FC<HeaderProps> = ({ variant = 'landing' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const navigationLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Resources', href: '#resources' },
    { name: 'Contact', href: '#contact' },
    { name: 'Meet the Team', href: '/team' },
  ];

  const dashboardLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Campaigns', href: '/campaigns' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Settings', href: '/settings' },
  ];

  const userMenuItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const links = variant === 'dashboard' ? dashboardLinks : navigationLinks;
  
  const headerClasses = variant === 'landing' 
    ? 'bg-white shadow-sm border-b border-gray-50' 
    : 'omnify-container-lg border-b border-white/10 shadow-lg backdrop-blur-xl';
    
  const textColor = variant === 'landing' ? 'text-neutral-900' : 'text-white';
  const linkColor = variant === 'landing' 
    ? 'text-neutral-700 hover:text-blue-600' 
    : 'text-slate-300 hover:text-white';

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${headerClasses}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Zap className={`h-8 w-8 transition-all duration-300 group-hover:scale-110 ${
                  variant === 'landing' ? 'text-blue-600' : 'text-omnify-accent'
                }`} />
                <div className="absolute inset-0 blur-sm opacity-50">
                  <Zap className={`h-8 w-8 ${
                    variant === 'landing' ? 'text-blue-600' : 'text-omnify-accent'
                  }`} />
                </div>
              </div>
              <div>
                <span className={`omnify-heading-sm transition-colors duration-300 ${textColor}`}>
                  Omnify
                </span>
                <span className={`omnify-body-sm ml-2 ${
                  variant === 'landing' ? 'text-neutral-600' : 'text-slate-400'
                }`}>
                  Marketing Cloud
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {links.map((link) => (
                link.href.startsWith('#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 omnify-body font-medium transition-all duration-200 rounded-lg hover:bg-white/10 ${linkColor}`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`px-3 py-2 omnify-body font-medium transition-all duration-200 rounded-lg hover:bg-white/10 ${linkColor}`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>

            {/* Search (Dashboard only) */}
            {variant === 'dashboard' && (
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-slate-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10"
                >
                  <Search className="h-5 w-5" />
                </button>
                {isSearchOpen && (
                  <div className="absolute right-0 mt-2 w-80 omnify-container rounded-xl shadow-xl border border-white/10 p-4">
                    <input
                      type="text"
                      placeholder="Search campaigns, analytics..."
                      className="omnify-input"
                      autoFocus
                    />
                  </div>
                )}
              </div>
            )}

            {/* User Section */}
            {variant === 'dashboard' && isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 text-slate-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-omnify-accent rounded-full animate-pulse"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-omnify-gradient rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="omnify-body-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 omnify-container rounded-xl shadow-xl border border-white/10 py-1 animate-slide-in-up">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center px-4 py-2 omnify-body-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <item.icon className="w-4 h-4 mr-3" />
                          {item.name}
                        </Link>
                      ))}
                      <hr className="my-1 border-white/10" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 omnify-body-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={variant === 'landing' ? '' : 'text-slate-300 hover:text-white hover:bg-white/10 border-white/20'}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    variant={variant === 'landing' ? 'primary' : 'omnify-primary'}
                    size="sm"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-all duration-200 ${
                variant === 'landing' 
                  ? 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100' 
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t py-4 animate-slide-in-up ${
            variant === 'landing' ? 'border-neutral-200' : 'border-white/10'
          }`}>
            <div className="space-y-1">
              {links.map((link) => (
                link.href.startsWith('#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`block px-3 py-2 omnify-body font-medium rounded-md transition-all duration-200 ${
                      variant === 'landing'
                        ? 'text-neutral-700 hover:text-blue-600 hover:bg-neutral-50'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block px-3 py-2 omnify-body font-medium rounded-md transition-all duration-200 ${
                      variant === 'landing'
                        ? 'text-neutral-700 hover:text-blue-600 hover:bg-neutral-50'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>

            {variant === 'landing' && !isAuthenticated && (
              <div className="mt-4 space-y-2">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" fullWidth>
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="omnify-primary" size="sm" fullWidth>
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {variant === 'dashboard' && isAuthenticated && user && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center px-3 py-2 mb-2">
                  <div className="w-8 h-8 bg-omnify-gradient rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="omnify-body-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 omnify-body font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;