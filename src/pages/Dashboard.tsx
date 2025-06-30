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
  BarChart3
} from 'lucide-react';
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
    },
    {
      title: 'Customer Lifetime Value',
      value: 287.45,
      change: 12.3,
      format: 'currency',
      icon: Users,
      color: 'purple',
      trend: 'up',
    },
    {
      title: 'Click-Through Rate',
      value: 0.034,
      change: 8.9,
      format: 'percentage',
      icon: Eye,
      color: 'teal',
      trend: 'up',
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
    },
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)' }}>
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
              <h1 className="omnify-heading-xl mb-2">
                Dashboard
              </h1>
              <p className="omnify-body-lg text-slate-300">
                Welcome back, Sarah. Here's what's happening with your campaigns.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0 animate-slide-in-right">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="omnify-input text-sm"
                >
                  {periods.map((period) => (
                    <option key={period.value} value={period.value} className="bg-slate-800 text-white">
                      {period.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <Button variant="ghost" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
                Filter
              </Button>
              
              <Button variant="omnify-primary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
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

              return (
                <Card 
                  key={index} 
                  variant="omnify" 
                  padding="lg" 
                  hover 
                  className="animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
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
                  
                  <div>
                    <div className="omnify-heading-md text-white mb-1">
                      {formattedValue}
                    </div>
                    <div className="omnify-body-sm text-slate-400">
                      {metric.title}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card variant="omnify" padding="lg" className="animate-slide-in-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="omnify-heading-sm text-white">
                  Performance Trends
                </h3>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  View Details
                </Button>
              </div>
              <div className="h-64 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                  <p className="text-slate-300">Interactive Chart Component</p>
                  <p className="text-sm text-slate-500">Line chart showing ROAS, CAC trends</p>
                </div>
              </div>
            </Card>
            
            <Card variant="omnify" padding="lg" className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="omnify-heading-sm text-white">
                  Channel Performance
                </h3>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  View Details
                </Button>
              </div>
              <div className="h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                  <p className="text-slate-300">Interactive Chart Component</p>
                  <p className="text-sm text-slate-500">Donut chart showing channel breakdown</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Campaigns Table */}
          <Card variant="omnify" padding="lg" className="animate-slide-in-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="omnify-heading-sm text-white">
                Active Campaigns
              </h3>
              <Button variant="omnify-primary" size="sm" leftIcon={<Target className="w-4 h-4" />}>
                Create Campaign
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 omnify-body font-medium text-slate-300">Campaign</th>
                    <th className="text-left py-3 px-4 omnify-body font-medium text-slate-300">Channel</th>
                    <th className="text-left py-3 px-4 omnify-body font-medium text-slate-300">Budget</th>
                    <th className="text-left py-3 px-4 omnify-body font-medium text-slate-300">Spent</th>
                    <th className="text-left py-3 px-4 omnify-body font-medium text-slate-300">ROAS</th>
                    <th className="text-left py-3 px-4 omnify-body font-medium text-slate-300">Status</th>
                    <th className="text-left py-3 px-4 omnify-body font-medium text-slate-300">Performance</th>
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
                        <div className="omnify-body font-medium text-white">{campaign.name}</div>
                      </td>
                      <td className="py-4 px-4 omnify-body text-slate-300">{campaign.channel}</td>
                      <td className="py-4 px-4 omnify-body text-slate-300">
                        {formatCurrency(campaign.budget)}
                      </td>
                      <td className="py-4 px-4 omnify-body text-slate-300">
                        {formatCurrency(campaign.spent)}
                      </td>
                      <td className="py-4 px-4">
                        <span className="omnify-body font-medium text-white">
                          {campaign.roas.toFixed(1)}x
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(campaign.status)}
                      </td>
                      <td className="py-4 px-4">
                        {getPerformanceBadge(campaign.performance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;