import React, { useState } from 'react';
import { User, Key, Bell, Shield, CreditCard, Users as Team, Save, Eye, EyeOff, Copy, Check } from 'lucide-react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import { useToggle } from '../hooks/useToggle';

const Settings: React.FC = () => {
  const [sidebarCollapsed, { toggle: toggleSidebar }] = useToggle(false);
  const [activeTab, setActiveTab] = useState('account');
  const [showApiKey, { toggle: toggleApiKey }] = useToggle(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const tabs = [
    { id: 'account', name: 'Account Info', icon: User },
    { id: 'api', name: 'API Keys', icon: Key },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'team', name: 'Team', icon: Team },
  ];

  const apiKeys = [
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk_live_1234567890abcdef1234567890abcdef',
      created: '2024-01-15',
      lastUsed: '2024-12-01',
      status: 'active',
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'sk_test_abcdef1234567890abcdef1234567890',
      created: '2024-01-10',
      lastUsed: '2024-11-28',
      status: 'active',
    },
  ];

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="omnify-heading-md text-white mb-6">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="omnify-body text-slate-300 font-medium">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Sarah Chen"
                    className="omnify-input"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="omnify-body text-slate-300 font-medium">Email Address</label>
                  <input
                    type="email"
                    defaultValue="sarah@techflow.com"
                    className="omnify-input"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="omnify-body text-slate-300 font-medium">Company</label>
                  <input
                    type="text"
                    defaultValue="TechFlow"
                    className="omnify-input"
                    placeholder="Enter your company"
                  />
                </div>
                <div className="space-y-2">
                  <label className="omnify-body text-slate-300 font-medium">Job Title</label>
                  <input
                    type="text"
                    defaultValue="VP of Growth"
                    className="omnify-input"
                    placeholder="Enter your job title"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="omnify-heading-md text-white mb-6">
                Profile Settings
              </h3>
              <div className="space-y-4">
                <div className="omnify-container flex items-center justify-between">
                  <div>
                    <div className="omnify-body font-medium text-white">Email Notifications</div>
                    <div className="omnify-body-sm text-slate-400">Receive updates about your campaigns</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-omnify-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-omnify-gradient"></div>
                  </label>
                </div>
                
                <div className="omnify-container flex items-center justify-between">
                  <div>
                    <div className="omnify-body font-medium text-white">Marketing Updates</div>
                    <div className="omnify-body-sm text-slate-400">Get tips and product updates</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-omnify-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-omnify-gradient"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="omnify-primary" leftIcon={<Save className="w-4 h-4" />}>
                Save Changes
              </Button>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="omnify-heading-md text-white mb-2">
                  API Keys
                </h3>
                <p className="omnify-body text-slate-400">
                  Manage your API keys for integrating with Omnify's services.
                </p>
              </div>
              <Button variant="omnify-primary">
                Generate New Key
              </Button>
            </div>
            
            <div className="space-y-6">
              {apiKeys.map((apiKey) => (
                <Card key={apiKey.id} variant="omnify" padding="lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="omnify-body font-medium text-white">{apiKey.name}</h4>
                        <Badge variant="success" size="sm" dot>
                          {apiKey.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 omnify-body-sm text-slate-400 mb-4">
                        <span>Created: {apiKey.created}</span>
                        <span>Last used: {apiKey.lastUsed}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="omnify-input font-mono text-sm flex-1 bg-slate-800/50">
                          {showApiKey ? apiKey.key : '••••••••••••••••••••••••••••••••'}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleApiKey()}
                          className="text-slate-400 hover:text-white"
                        >
                          {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                          className="text-slate-400 hover:text-white"
                        >
                          {copiedKey === apiKey.id ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <Card variant="omnify" padding="lg" className="bg-yellow-500/10 border-yellow-500/30">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="omnify-body font-medium text-yellow-300 mb-1">
                    Keep your API keys secure
                  </h4>
                  <p className="omnify-body-sm text-yellow-200/80">
                    Never share your API keys publicly or commit them to version control. 
                    If you suspect a key has been compromised, regenerate it immediately.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="omnify-heading-md text-white mb-4">
                Notification Preferences
              </h3>
              <p className="omnify-body text-slate-400 mb-8">
                Choose how you want to be notified about campaign updates and system events.
              </p>
            </div>
            
            <div className="space-y-8">
              <div>
                <h4 className="omnify-heading-sm text-white mb-6">Campaign Notifications</h4>
                <div className="space-y-4">
                  {[
                    { name: 'Campaign Performance Alerts', description: 'When ROAS drops below threshold' },
                    { name: 'Budget Alerts', description: 'When 80% of budget is spent' },
                    { name: 'Campaign Completion', description: 'When campaigns finish running' },
                    { name: 'Optimization Suggestions', description: 'AI-powered improvement recommendations' },
                  ].map((notification, index) => (
                    <Card key={index} variant="omnify" padding="md">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="omnify-body font-medium text-white">{notification.name}</div>
                          <div className="omnify-body-sm text-slate-400">{notification.description}</div>
                        </div>
                        <div className="flex space-x-6">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-omnify-primary bg-gray-700 border-gray-600 rounded focus:ring-omnify-primary/50" />
                            <span className="omnify-body-sm text-slate-300">Email</span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-omnify-primary bg-gray-700 border-gray-600 rounded focus:ring-omnify-primary/50" />
                            <span className="omnify-body-sm text-slate-300">SMS</span>
                          </label>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="omnify-heading-sm text-white mb-6">System Notifications</h4>
                <div className="space-y-4">
                  {[
                    { name: 'Security Alerts', description: 'Login attempts and security events' },
                    { name: 'Product Updates', description: 'New features and improvements' },
                    { name: 'Maintenance Windows', description: 'Scheduled system maintenance' },
                  ].map((notification, index) => (
                    <Card key={index} variant="omnify" padding="md">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="omnify-body font-medium text-white">{notification.name}</div>
                          <div className="omnify-body-sm text-slate-400">{notification.description}</div>
                        </div>
                        <div className="flex space-x-6">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-omnify-primary bg-gray-700 border-gray-600 rounded focus:ring-omnify-primary/50" />
                            <span className="omnify-body-sm text-slate-300">Email</span>
                          </label>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="omnify-primary" leftIcon={<Save className="w-4 h-4" />}>
                Save Preferences
              </Button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="omnify-heading-md text-white mb-4">
                Security Settings
              </h3>
            </div>
            
            <Card variant="omnify" padding="lg">
              <h4 className="omnify-heading-sm text-white mb-6">Password</h4>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="omnify-body text-slate-300 font-medium">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="omnify-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="omnify-body text-slate-300 font-medium">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="omnify-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="omnify-body text-slate-300 font-medium">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="omnify-input"
                  />
                </div>
                <Button variant="omnify-primary">
                  Update Password
                </Button>
              </div>
            </Card>
            
            <Card variant="omnify" padding="lg">
              <h4 className="omnify-heading-sm text-white mb-6">Two-Factor Authentication</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="omnify-body text-slate-300 mb-2">
                    Add an extra layer of security to your account
                  </p>
                  <Badge variant="error" size="sm">Not Enabled</Badge>
                </div>
                <Button variant="omnify-secondary">
                  Enable 2FA
                </Button>
              </div>
            </Card>
            
            <Card variant="omnify" padding="lg">
              <h4 className="omnify-heading-sm text-white mb-6">Active Sessions</h4>
              <div className="space-y-4">
                <Card variant="omnify" padding="md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="omnify-body font-medium text-white">Current Session</div>
                      <div className="omnify-body-sm text-slate-400">Chrome on macOS • San Francisco, CA</div>
                    </div>
                    <Badge variant="success" size="sm">Active</Badge>
                  </div>
                </Card>
                <Card variant="omnify" padding="md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="omnify-body font-medium text-white">Mobile App</div>
                      <div className="omnify-body-sm text-slate-400">iPhone • Last active 2 hours ago</div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      Revoke
                    </Button>
                  </div>
                </Card>
              </div>
            </Card>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="omnify-heading-md text-white mb-4">
                Billing & Subscription
              </h3>
            </div>
            
            <Card variant="omnify" padding="lg">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="omnify-heading-sm text-white mb-3">Current Plan</h4>
                  <div className="flex items-center space-x-4">
                    <Badge variant="primary" size="lg">Pro Plan</Badge>
                    <span className="omnify-body text-slate-300">$299/month</span>
                  </div>
                </div>
                <Button variant="omnify-secondary">
                  Change Plan
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 omnify-body-sm">
                <div>
                  <span className="text-slate-400">Next billing date:</span>
                  <div className="omnify-body font-medium text-white">January 15, 2025</div>
                </div>
                <div>
                  <span className="text-slate-400">Payment method:</span>
                  <div className="omnify-body font-medium text-white">•••• •••• •••• 4242</div>
                </div>
                <div>
                  <span className="text-slate-400">Billing email:</span>
                  <div className="omnify-body font-medium text-white">billing@techflow.com</div>
                </div>
              </div>
            </Card>
            
            <Card variant="omnify" padding="lg">
              <h4 className="omnify-heading-sm text-white mb-6">Usage This Month</h4>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="omnify-body text-slate-300">API Calls</span>
                  <span className="omnify-body font-medium text-white">24,567 / 100,000</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-omnify-gradient h-2 rounded-full" style={{ width: '24.5%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="omnify-body text-slate-300">Active Campaigns</span>
                  <span className="omnify-body font-medium text-white">12 / 50</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-omnify-gradient h-2 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="omnify-heading-md text-white mb-2">
                  Team Members
                </h3>
                <p className="omnify-body text-slate-400">
                  Manage your team's access to Omnify.
                </p>
              </div>
              <Button variant="omnify-primary">
                Invite Member
              </Button>
            </div>
            
            <Card variant="omnify" padding="lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-slate-700">
                    <tr>
                      <th className="text-left py-4 px-2 omnify-body font-medium text-slate-300">Member</th>
                      <th className="text-left py-4 px-2 omnify-body font-medium text-slate-300">Role</th>
                      <th className="text-left py-4 px-2 omnify-body font-medium text-slate-300">Last Active</th>
                      <th className="text-left py-4 px-2 omnify-body font-medium text-slate-300">Status</th>
                      <th className="text-left py-4 px-2 omnify-body font-medium text-slate-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-800">
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-omnify-gradient rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">SC</span>
                          </div>
                          <div>
                            <div className="omnify-body font-medium text-white">Sarah Chen</div>
                            <div className="omnify-body-sm text-slate-400">sarah@techflow.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <Badge variant="primary" size="sm">Owner</Badge>
                      </td>
                      <td className="py-4 px-2 omnify-body text-slate-300">Active now</td>
                      <td className="py-4 px-2">
                        <Badge variant="success" size="sm" dot>Active</Badge>
                      </td>
                      <td className="py-4 px-2">
                        <span className="text-slate-500">-</span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-omnify-gradient rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">MR</span>
                          </div>
                          <div>
                            <div className="omnify-body font-medium text-white">Marcus Rodriguez</div>
                            <div className="omnify-body-sm text-slate-400">marcus@techflow.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <Badge variant="secondary" size="sm">Admin</Badge>
                      </td>
                      <td className="py-4 px-2 omnify-body text-slate-300">2 hours ago</td>
                      <td className="py-4 px-2">
                        <Badge variant="success" size="sm" dot>Active</Badge>
                      </td>
                      <td className="py-4 px-2">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)' }}>
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        currentPath="/settings"
      />
      
      <div 
        className="flex-1 flex flex-col transition-all duration-300" 
        style={{ marginLeft: sidebarCollapsed ? '64px' : '256px' }}
      >
        <Header variant="dashboard" />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10 animate-slide-in-up">
              <h1 className="omnify-heading-xl mb-4">
                Settings
              </h1>
              <p className="omnify-body-lg text-slate-400">
                Manage your account, security, and preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <Card variant="omnify" padding="md" className="sticky top-6">
                  <nav className="space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 omnify-body font-medium ${
                          activeTab === tab.id
                            ? 'bg-omnify-gradient text-white shadow-lg omnify-glow'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <tab.icon className="w-5 h-5" />
                        <span>{tab.name}</span>
                      </button>
                    ))}
                  </nav>
                </Card>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                <Card variant="omnify" padding="lg">
                  {renderTabContent()}
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;