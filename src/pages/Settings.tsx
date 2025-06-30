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
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value="Sarah Chen"
                  variant="futuristic"
                  fullWidth
                />
                <Input
                  label="Email Address"
                  type="email"
                  value="sarah@techflow.com"
                  variant="futuristic"
                  fullWidth
                />
                <Input
                  label="Company"
                  value="TechFlow"
                  variant="futuristic"
                  fullWidth
                />
                <Input
                  label="Job Title"
                  value="VP of Growth"
                  variant="futuristic"
                  fullWidth
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Profile Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <div className="font-medium text-white">Email Notifications</div>
                    <div className="text-sm text-slate-400">Receive updates about your campaigns</div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-white/20 rounded focus:ring-blue-500 bg-white/10" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <div className="font-medium text-white">Marketing Updates</div>
                    <div className="text-sm text-slate-400">Get tips and product updates</div>
                  </div>
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-white/20 rounded focus:ring-blue-500 bg-white/10" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="futuristic" leftIcon={<Save className="w-4 h-4" />}>
                Save Changes
              </Button>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  API Keys
                </h3>
                <p className="text-slate-400">
                  Manage your API keys for integrating with Omnify's services.
                </p>
              </div>
              <Button variant="futuristic">
                Generate New Key
              </Button>
            </div>
            
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <Card key={apiKey.id} variant="futuristic" padding="lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-white">{apiKey.name}</h4>
                        <Badge variant="success" size="sm" dot>
                          {apiKey.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <span>Created: {apiKey.created}</span>
                        <span>Last used: {apiKey.lastUsed}</span>
                      </div>
                      
                      <div className="mt-3 flex items-center space-x-2">
                        <div className="font-mono text-sm bg-white/10 border border-white/20 px-3 py-2 rounded-lg flex-1 text-white">
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
            
            <Card variant="futuristic" padding="lg" className="bg-yellow-500/10 border-yellow-500/30">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-300 mb-1">
                    Keep your API keys secure
                  </h4>
                  <p className="text-sm text-yellow-200/80">
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
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Notification Preferences
              </h3>
              <p className="text-slate-400 mb-6">
                Choose how you want to be notified about campaign updates and system events.
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-white mb-4">Campaign Notifications</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Campaign Performance Alerts', description: 'When ROAS drops below threshold' },
                    { name: 'Budget Alerts', description: 'When 80% of budget is spent' },
                    { name: 'Campaign Completion', description: 'When campaigns finish running' },
                    { name: 'Optimization Suggestions', description: 'AI-powered improvement recommendations' },
                  ].map((notification, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div>
                        <div className="font-medium text-white">{notification.name}</div>
                        <div className="text-sm text-slate-400">{notification.description}</div>
                      </div>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-white/20 rounded focus:ring-blue-500 bg-white/10" />
                          <span className="text-sm text-slate-300">Email</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="w-4 h-4 text-blue-600 border-white/20 rounded focus:ring-blue-500 bg-white/10" />
                          <span className="text-sm text-slate-300">SMS</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-4">System Notifications</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Security Alerts', description: 'Login attempts and security events' },
                    { name: 'Product Updates', description: 'New features and improvements' },
                    { name: 'Maintenance Windows', description: 'Scheduled system maintenance' },
                  ].map((notification, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <div>
                        <div className="font-medium text-white">{notification.name}</div>
                        <div className="text-sm text-slate-400">{notification.description}</div>
                      </div>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-white/20 rounded focus:ring-blue-500 bg-white/10" />
                          <span className="text-sm text-slate-300">Email</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="futuristic" leftIcon={<Save className="w-4 h-4" />}>
                Save Preferences
              </Button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Security Settings
              </h3>
            </div>
            
            <Card variant="futuristic" padding="lg">
              <h4 className="font-medium text-white mb-4">Password</h4>
              <div className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                  variant="futuristic"
                  fullWidth
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  variant="futuristic"
                  fullWidth
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm new password"
                  variant="futuristic"
                  fullWidth
                />
                <Button variant="futuristic">
                  Update Password
                </Button>
              </div>
            </Card>
            
            <Card variant="futuristic" padding="lg">
              <h4 className="font-medium text-white mb-4">Two-Factor Authentication</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300 mb-2">
                    Add an extra layer of security to your account
                  </p>
                  <Badge variant="error" size="sm">Not Enabled</Badge>
                </div>
                <Button variant="outline">
                  Enable 2FA
                </Button>
              </div>
            </Card>
            
            <Card variant="futuristic" padding="lg">
              <h4 className="font-medium text-white mb-4">Active Sessions</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <div className="font-medium text-white">Current Session</div>
                    <div className="text-sm text-slate-400">Chrome on macOS • San Francisco, CA</div>
                  </div>
                  <Badge variant="success" size="sm">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <div className="font-medium text-white">Mobile App</div>
                    <div className="text-sm text-slate-400">iPhone • Last active 2 hours ago</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Billing & Subscription
              </h3>
            </div>
            
            <Card variant="futuristic" padding="lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-medium text-white mb-2">Current Plan</h4>
                  <div className="flex items-center space-x-3">
                    <Badge variant="primary" size="lg">Pro Plan</Badge>
                    <span className="text-slate-300">$299/month</span>
                  </div>
                </div>
                <Button variant="outline">
                  Change Plan
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Next billing date:</span>
                  <div className="font-medium text-white">January 15, 2025</div>
                </div>
                <div>
                  <span className="text-slate-400">Payment method:</span>
                  <div className="font-medium text-white">•••• •••• •••• 4242</div>
                </div>
                <div>
                  <span className="text-slate-400">Billing email:</span>
                  <div className="font-medium text-white">billing@techflow.com</div>
                </div>
              </div>
            </Card>
            
            <Card variant="futuristic" padding="lg">
              <h4 className="font-medium text-white mb-4">Usage This Month</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">API Calls</span>
                  <span className="font-medium text-white">24,567 / 100,000</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full" style={{ width: '24.5%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Active Campaigns</span>
                  <span className="font-medium text-white">12 / 50</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Team Members
                </h3>
                <p className="text-slate-400">
                  Manage your team's access to Omnify.
                </p>
              </div>
              <Button variant="futuristic">
                Invite Member
              </Button>
            </div>
            
            <Card variant="futuristic" padding="none">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-slate-300">Member</th>
                      <th className="text-left py-3 px-6 font-medium text-slate-300">Role</th>
                      <th className="text-left py-3 px-6 font-medium text-slate-300">Last Active</th>
                      <th className="text-left py-3 px-6 font-medium text-slate-300">Status</th>
                      <th className="text-left py-3 px-6 font-medium text-slate-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">SC</span>
                          </div>
                          <div>
                            <div className="font-medium text-white">Sarah Chen</div>
                            <div className="text-sm text-slate-400">sarah@techflow.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="primary" size="sm">Owner</Badge>
                      </td>
                      <td className="py-4 px-6 text-slate-300">Active now</td>
                      <td className="py-4 px-6">
                        <Badge variant="success" size="sm" dot>Active</Badge>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-slate-500">-</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">MR</span>
                          </div>
                          <div>
                            <div className="font-medium text-white">Marcus Rodriguez</div>
                            <div className="text-sm text-slate-400">marcus@techflow.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="secondary" size="sm">Admin</Badge>
                      </td>
                      <td className="py-4 px-6 text-slate-300">2 hours ago</td>
                      <td className="py-4 px-6">
                        <Badge variant="success" size="sm" dot>Active</Badge>
                      </td>
                      <td className="py-4 px-6">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-slate-300 text-lg">
                Manage your account, security, and preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <Card variant="futuristic" padding="sm" className="sticky top-6">
                  <nav className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-blue-500/20 to-teal-500/20 text-white border border-blue-500/30 shadow-lg'
                            : 'text-slate-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <tab.icon className="w-5 h-5" />
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    ))}
                  </nav>
                </Card>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                <Card variant="futuristic" padding="lg">
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