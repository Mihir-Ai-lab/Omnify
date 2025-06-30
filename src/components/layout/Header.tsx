import React, { useState } from 'react';
import { Zap, Menu, X, Bell, User, Settings, LogOut } from 'lucide-react';
import Button from '../common/Button';

export interface HeaderProps {
  variant?: 'landing' | 'dashboard';
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const Header: React.FC<HeaderProps> = ({ variant = 'landing', user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
    { name: 'Sign out', href: '/logout', icon: LogOut },
  ];

  const links = variant === 'dashboard' ? dashboardLinks : navigationLinks;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Zap className="h-8 w-8 text-primary-600" />
                <div className="absolute inset-0 blur-sm">
                  <Zap className="h-8 w-8 text-primary-600 opacity-30" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold text-neutral-900">Omnify</span>
                <span className="text-sm text-neutral-600 font-medium ml-2">
                  Marketing Cloud
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* User Section */}
            {variant === 'dashboard' && user ? (
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
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
                        >
                          <item.icon className="w-4 h-4 mr-3" />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors duration-200"
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
          <div className="md:hidden border-t border-neutral-200 py-4">
            <div className="space-y-1">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {variant === 'landing' && (
              <div className="mt-4 space-y-2">
                <Button variant="ghost" size="sm" fullWidth>
                  Sign In
                </Button>
                <Button variant="primary" size="sm" fullWidth>
                  Get Started
                </Button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;