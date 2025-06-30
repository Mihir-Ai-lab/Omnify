import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  Zap,
  Target,
  BarChart3,
  Plus,
  ExternalLink,
  Activity,
  LineChart
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useToggle } from '../hooks/useToggle';
import { formatCurrency, formatPercentage, formatCompactNumber } from '../utils/formatters';

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, { toggle: toggleSidebar }] = useToggle(false);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const periods = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
  ];

  const metrics = [
    {
      title: 'Customer Acquisition Cost',
      value: 47.32,
      change: -23.5,
      format: 'currency',
      icon: DollarSign,
      color: 'emerald',
      trend: 'down',
      description: 'Average cost to acquire a new customer',
      target: 45.00,
    },
    {
      title: 'Return on Ad Spend',
      value: 4.2,
      change: 18.7,
      format: 'number',
      suffix: 'x',
      icon: TrendingUp,
      color: 'blue',
      trend: 'up',
      description: 'Revenue generated per dollar spent on ads',
      target: 4.0,
    },
    {
      title: 'Customer Lifetime Value',
      value: 287.45,
      change: 12.3,
      format: 'currency',
      icon: Users,
      color: 'purple',
      trend: 'up',
      description: 'Predicted revenue from customer relationship',
      target: 300.00,
    },
    {
      title: 'Click-Through Rate',
      value: 0.034,
      change: 8.9,
      format: 'percentage',
      icon: Eye,
      color: 'teal',
      trend: 'up',
      description: 'Percentage of users who click on ads',
      target: 0.035,
    },
  ];

  const campaigns = [
    {
      id: 1,
      name: 'Holiday Sale 2024',
      channel: 'Meta Ads',
      budget: 15000,
      spent: 12450,
      roas: 3.8,
      status: 'active',
      performance: 'good',
      impressions: 245000,
      clicks: 8750,
      conversions: 342,
      ctr: 3.57,
    },
    {
      id: 2,
      name: 'Product Launch - Q1',
      channel: 'Google Ads',
      budget: 25000,
      spent: 18200,
      roas: 2.1,
      status: 'active',
      performance: 'poor',
      impressions: 180000,
      clicks: 5400,
      conversions: 156,
      ctr: 3.00,
    },
    {
      id: 3,
      name: 'Retargeting Campaign',
      channel: 'TikTok Ads',
      budget: 8000,
      spent: 7850,
      roas: 5.2,
      status: 'active',
      performance: 'excellent',
      impressions: 95000,
      clicks: 4750,
      conversions: 287,
      ctr: 5.00,
    },
    {
      id: 4,
      name: 'Brand Awareness',
      channel: 'LinkedIn Ads',
      budget: 5000,
      spent: 3200,
      roas: 1.8,
      status: 'paused',
      performance: 'poor',
      impressions: 65000,
      clicks: 1950,
      conversions: 89,
      ctr: 3.00,
    },
  ];

  // Mock performance data for charts
  const performanceData = {
    roas: [3.2, 3.5, 3.8, 4.1, 4.2, 4.0, 4.2],
    cac: [52.1, 49.8, 47.5, 45.2, 47.3, 48.1, 47.3],
    conversions: [156, 189, 234, 287, 312, 298, 342],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  const channelData = [
    { name: 'Meta Ads', spend: 45000, roas: 4.2, percentage: 35 },
    { name: 'Google Ads', spend: 38000, roas: 3.8, percentage: 30 },
    { name: 'TikTok Ads', spend: 22000, roas: 5.1, percentage: 17 },
    { name: 'LinkedIn Ads', spend: 15000, roas: 2.9, percentage: 12 },
    { name: 'Email Marketing', spend: 8000, roas: 6.2, percentage: 6 },
  ];

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case 'excellent':
        return <Badge variant="success" size="sm">Excellent</Badge>;
      case 'good':
        return <Badge variant="primary" size="sm">Good</Badge>;
      case 'poor':
        return <Badge variant="error" size="sm">Needs Attention</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm" dot>Active</Badge>;
      case 'paused':
        return <Badge variant="warning" size="sm" dot>Paused</Badge>;
      case 'completed':
        return <Badge variant="neutral" size="sm" dot>Completed</Badge>;
      default:
        return <Badge variant="neutral" size="sm" dot>Unknown</Badge>;
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In a real app, this would trigger a download
      console.log('Exporting dashboard data...');
    }, 2000);
  };

  const handleFilter = () => {
    setIsFiltering(true);
    // Simulate filter process
    setTimeout(() => {
      setIsFiltering(false);
      console.log('Applying filters...');
    }, 1000);
  };

  const handleViewDetails = (type: string) => {
    if (type === 'performance') {
      navigate('/analytics');
    } else if (type === 'channel') {
      navigate('/analytics');
    }
  };

  const handleCreateCampaign = () => {
    navigate('/campaigns/new');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        currentPath="/dashboard"
      />
      
      <div 
        className="flex-1 flex flex-col transition-all duration-300" 
        style={{ marginLeft: sidebarCollapsed ? '64px' : '256px' }}
      >
        <Header variant="dashboard" />
        
        <main className="flex-1 p-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="animate-slide-in-up">
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-slate-300 text-lg">
                Welcome back, Sarah. Here's what's happening with your campaigns.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0 animate-slide-in-right">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                >
                  {periods.map((period) => (
                    <option key={period.value} value={period.value} className="bg-slate-800 text-white">
                      {period.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                leftIcon={<Filter className="w-4 h-4" />}
                loading={isFiltering}
                onClick={handleFilter}
                className="text-slate-400 hover:text-white"
              >
                Filter
              </Button>
              
              <Button 
                variant="futuristic" 
                size="sm" 
                leftIcon={<Download className="w-4 h-4" />}
                loading={isExporting}
                onClick={handleExport}
              >
                Export
              </Button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => {
              const isPositive = metric.change > 0;
              const changeIcon = isPositive ? ArrowUpRight : ArrowDownRight;
              const changeColor = metric.title === 'Customer Acquisition Cost' 
                ? (isPositive ? 'text-red-400' : 'text-emerald-400')
                : (isPositive ? 'text-emerald-400' : 'text-red-400');

              let formattedValue = '';
              if (metric.format === 'currency') {
                formattedValue = formatCurrency(metric.value);
              } else if (metric.format === 'percentage') {
                formattedValue = formatPercentage(metric.value);
              } else {
                formattedValue = formatCompactNumber(metric.value) + (metric.suffix || '');
              }

              const isOnTarget = metric.format === 'currency' 
                ? metric.value <= metric.target 
                : metric.value >= metric.target;

              return (
                <Card 
                  key={index} 
                  variant="futuristic" 
                  padding="lg" 
                  hover 
                  glow
                  className="animate-slide-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate('/analytics')}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 shadow-lg`}>
                      <metric.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm ${changeColor}`}>
                      {React.createElement(changeIcon, { className: 'w-4 h-4' })}
                      <span className="font-medium">
                        {Math.abs(metric.change)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-3xl font-bold text-white mb-1">
                      {formattedValue}
                    </div>
                    <div className="text-sm text-slate-400 mb-2">
                      {metric.title}
                    </div>
                    <div className="text-xs text-slate-500">
                      {metric.description}
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Target: {metric.format === 'currency' ? formatCurrency(metric.target) : 
                               metric.format === 'percentage' ? formatPercentage(metric.target) :
                               metric.target + (metric.suffix || '')}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${isOnTarget ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`}></div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card variant="futuristic" padding="lg" className="animate-slide-in-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Performance Trends
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-400 hover:text-white"
                  onClick={() => handleViewDetails('performance')}
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                >
                  View Details
                </Button>
              </div>
              <div className="h-64 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-xl flex flex-col items-center justify-center border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 geometric-pattern opacity-20"></div>
                <div className="text-center relative z-10">
                  <LineChart className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <p className="text-slate-300 text-lg mb-2">ROAS & CAC Trends</p>
                  <p className="text-sm text-slate-500 mb-4">7-day performance overview</p>
                  
                  {/* Mock trend data */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-green-400 text-lg font-bold">+18.7%</div>
                      <div className="text-xs text-slate-400">ROAS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 text-lg font-bold">-23.5%</div>
                      <div className="text-xs text-slate-400">CAC</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 text-lg font-bold">342</div>
                      <div className="text-xs text-slate-400">Conversions</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card variant="futuristic" padding="lg" className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Channel Performance
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-400 hover:text-white"
                  onClick={() => handleViewDetails('channel')}
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                >
                  View Details
                </Button>
              </div>
              <div className="h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 geometric-pattern opacity-20"></div>
                <div className="relative z-10 p-4 h-full">
                  <div className="text-center mb-4">
                    <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-slate-300 text-sm">Channel Breakdown</p>
                  </div>
                  
                  {/* Channel performance bars */}
                  <div className="space-y-3">
                    {channelData.slice(0, 4).map((channel, index) => (
                      <div key={channel.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 flex-1">
                          <div className="text-xs text-slate-300 w-16 truncate">{channel.name}</div>
                          <div className="flex-1 bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${channel.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-xs text-slate-400 ml-2">{channel.percentage}%</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <div className="text-sm text-slate-400">Total Ad Spend</div>
                    <div className="text-lg font-bold text-white">{formatCurrency(128000)}</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Campaigns Table */}
          <Card variant="futuristic" padding="lg" className="animate-slide-in-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Active Campaigns
              </h3>
              <Button 
                variant="futuristic" 
                size="sm" 
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={handleCreateCampaign}
              >
                Create Campaign
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 font-medium text-slate-300">Campaign</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">Channel</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">Budget</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">Spent</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">ROAS</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">Performance</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign, index) => (
                    <tr 
                      key={campaign.id} 
                      className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-white">{campaign.name}</div>
                        <div className="text-sm text-slate-400">
                          {formatCompactNumber(campaign.impressions)} impressions • {formatCompactNumber(campaign.clicks)} clicks
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-300">{campaign.channel}</td>
                      <td className="py-4 px-4 text-slate-300">
                        {formatCurrency(campaign.budget)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white font-medium">
                          {formatCurrency(campaign.spent)}
                        </div>
                        <div className="text-xs text-slate-400">
                          {((campaign.spent / campaign.budget) * 100).toFixed(1)}% used
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">
                            {campaign.roas.toFixed(1)}x
                          </span>
                          {campaign.roas > 3 ? (
                            <TrendingUp className="w-4 h-4 text-green-400" />
                          ) : campaign.roas < 2 ? (
                            <TrendingDown className="w-4 h-4 text-red-400" />
                          ) : (
                            <Activity className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(campaign.status)}
                      </td>
                      <td className="py-4 px-4">
                        {getPerformanceBadge(campaign.performance)}
                      </td>
                      <td className="py-4 px-4">
                        <Link to={`/campaigns/${campaign.id}`}>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-slate-400 hover:text-white"
                            rightIcon={<ExternalLink className="w-4 h-4" />}
                          >
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-slate-400">
                Showing {campaigns.length} of {campaigns.length} campaigns
              </div>
              <Link to="/campaigns">
                <Button variant="outline" size="sm" className="text-slate-400 hover:text-white">
                  View All Campaigns
                </Button>
              </Link>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card variant="futuristic" padding="lg" hover className="animate-slide-in-up cursor-pointer" onClick={() => navigate('/campaigns/new')}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Create Campaign</h4>
                  <p className="text-slate-400 text-sm">Launch a new marketing campaign</p>
                </div>
              </div>
            </Card>

            <Card variant="futuristic" padding="lg" hover className="animate-slide-in-up cursor-pointer" onClick={() => navigate('/analytics')} style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">View Analytics</h4>
                  <p className="text-slate-400 text-sm">Deep dive into performance data</p>
                </div>
              </div>
            </Card>

            <Card variant="futuristic" padding="lg" hover className="animate-slide-in-up cursor-pointer" onClick={() => navigate('/team')} style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Manage Team</h4>
                  <p className="text-slate-400 text-sm">Invite and manage team members</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;