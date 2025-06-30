import React from 'react';
import { 
  LayoutDashboard, 
  Megaphone, 
  BarChart3, 
  Settings, 
  Users, 
  CreditCard,
  HelpCircle,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  currentPath?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed = false, 
  onToggle,
  currentPath = '/dashboard'
}) => {
  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'Campaigns',
      href: '/campaigns',
      icon: Megaphone,
      badge: '12',
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      badge: null,
    },
    {
      name: 'Team',
      href: '/team',
      icon: Users,
      badge: null,
    },
    {
      name: 'Billing',
      href: '/billing',
      icon: CreditCard,
      badge: null,
    },
  ];

  const bottomItems = [
    {
      name: 'Help & Support',
      href: '/help',
      icon: HelpCircle,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  const isActive = (href: string) => currentPath === href;

  return (
    <div className={`bg-white border-r border-neutral-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Zap className="h-8 w-8 text-primary-600" />
                <div className="absolute inset-0 blur-sm">
                  <Zap className="h-8 w-8 text-primary-600 opacity-30" />
                </div>
              </div>
              <div>
                <span className="text-lg font-bold text-neutral-900">Omnify</span>
                <div className="text-xs text-neutral-500 font-medium">Marketing Cloud</div>
              </div>
            </div>
          )}
          
          {onToggle && (
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-neutral-600" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-neutral-600" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-primary-50 text-primary-700 border border-primary-200'
                    : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0`} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="bg-accent-100 text-accent-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-neutral-200">
        <ul className="space-y-2">
          {bottomItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-primary-50 text-primary-700 border border-primary-200'
                    : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0`} />
                {!isCollapsed && <span>{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;