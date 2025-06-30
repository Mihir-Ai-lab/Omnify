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
  ChevronRight,
  Target,
  TrendingUp
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
      icon: Target,
      badge: '12',
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: TrendingUp,
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
    <div className={`glass-dark border-r border-white/10 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-full shadow-2xl`}>
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Zap className="h-8 w-8 text-teal-400" />
                <div className="absolute inset-0 blur-sm">
                  <Zap className="h-8 w-8 text-teal-400 opacity-30" />
                </div>
              </div>
              <div>
                <span className="text-lg font-bold text-white">Omnify</span>
                <div className="text-xs text-slate-400 font-medium">Marketing Cloud</div>
              </div>
            </div>
          )}
          
          {onToggle && (
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 text-slate-400 hover:text-white"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-blue-500/20 to-teal-500/20 text-white border border-blue-500/30 shadow-lg neon-blue'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white hover:shadow-lg'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0 transition-transform duration-300 group-hover:scale-110`} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
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
      <div className="p-4 border-t border-white/10">
        <ul className="space-y-2">
          {bottomItems.map((item, index) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-blue-500/20 to-teal-500/20 text-white border border-blue-500/30 shadow-lg neon-blue'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white hover:shadow-lg'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0 transition-transform duration-300 group-hover:scale-110`} />
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