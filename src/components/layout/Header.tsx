import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Menu, X, Bell, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';

export interface HeaderProps {
  variant?: 'landing' | 'dashboard';
}

const Header: React.FC<HeaderProps> = ({ variant = 'landing' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const navigationLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Resources', href: '#resources' },
    { name: 'Contact', href: '#contact' },
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
  const headerBg = variant === 'landing' ? 'bg-neutral-900/95 backdrop-blur-sm border-neutral-800' : 'bg-white border-neutral-200';
  const textColor = variant === 'landing' ? 'text-white' : 'text-neutral-900';
  const linkColor = variant === 'landing' ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-primary-600';

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 border-b shadow-sm ${headerBg}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Zap className={`h-8 w-8 ${variant === 'landing' ? 'text-accent-500' : 'text-primary-600'}`} />
                <div className="absolute inset-0 blur-sm">
                  <Zap className={`h-8 w-8 ${variant === 'landing' ? 'text-accent-500' : 'text-primary-600'} opacity-30`} />
                </div>
              </div>
              <div>
                <span className={`text-xl font-bold ${textColor}`}>Omnify</span>
                <span className={`text-sm font-medium ml-2 ${variant === 'landing' ? 'text-neutral-400' : 'text-neutral-600'}`}>
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
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${linkColor}`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${linkColor}`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>

            {/* User Section */}
            {variant === 'dashboard' && isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                      <p className="text-xs text-neutral-500">{user.email}</p>
                    </div>
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 py-1">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <item.icon className="w-4 h-4 mr-3" />
                          {item.name}
                        </Link>
                      ))}
                      <hr className="my-1 border-neutral-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50 transition-colors duration-200"
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
                    className={variant === 'landing' ? 'text-neutral-300 hover:text-white hover:bg-neutral-800' : ''}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    variant="primary" 
                    size="sm"
                    className={variant === 'landing' ? 'bg-accent-500 hover:bg-accent-600' : ''}
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
              className={`p-2 rounded-md transition-colors duration-200 ${
                variant === 'landing' 
                  ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' 
                  : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100'
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
          <div className={`md:hidden border-t py-4 ${variant === 'landing' ? 'border-neutral-800' : 'border-neutral-200'}`}>
            <div className="space-y-1">
              {links.map((link) => (
                link.href.startsWith('#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                      variant === 'landing'
                        ? 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                        : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                      variant === 'landing'
                        ? 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                        : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
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
                  <Button variant="ghost" size="sm" fullWidth className="text-neutral-300 hover:text-white hover:bg-neutral-800">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" size="sm" fullWidth className="bg-accent-500 hover:bg-accent-600">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {variant === 'dashboard' && isAuthenticated && user && (
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center px-3 py-2 mb-2">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                    <p className="text-xs text-neutral-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-base font-medium text-error-600 hover:bg-error-50 rounded-md transition-colors duration-200"
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