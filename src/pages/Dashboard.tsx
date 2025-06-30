import React, { useState } from 'react';
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
  Download
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

  const user = {
    name: 'Sarah Chen',
    email: 'sarah@techflow.com',
  };

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
      color: 'success',
    },
    {
      title: 'Return on Ad Spend',
      value: 4.2,
      change: 18.7,
      format: 'number',
      suffix: 'x',
      icon: TrendingUp,
      color: 'primary',
    },
    {
      title: 'Customer Lifetime Value',
      value: 287.45,
      change: 12.3,
      format: 'currency',
      icon: Users,
      color: 'accent',
    },
    {
      title: 'Click-Through Rate',
      value: 0.034,
      change: 8.9,
      format: 'percentage',
      icon: Eye,
      color: 'warning',
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

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        currentPath="/dashboard"
      />
      
      <div className="flex-1 flex flex-col">
        <Header variant="dashboard" user={user} />
        
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Dashboard
              </h1>
              <p className="text-neutral-600">
                Welcome back, {user.name}. Here's what's happening with your campaigns.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-neutral-500" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {periods.map((period) => (
                    <option key={period.value} value={period.value}>
                      {period.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
                Filter
              </Button>
              
              <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
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
                ? (isPositive ? 'text-error-600' : 'text-success-600')
                : (isPositive ? 'text-success-600' : 'text-error-600');

              let formattedValue = '';
              if (metric.format === 'currency') {
                formattedValue = formatCurrency(metric.value);
              } else if (metric.format === 'percentage') {
                formattedValue = formatPercentage(metric.value);
              } else {
                formattedValue = formatCompactNumber(metric.value) + (metric.suffix || '');
              }

              return (
                <Card key={index} padding="lg" hover>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${metric.color}-100`}>
                      <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm ${changeColor}`}>
                      {React.createElement(changeIcon, { className: 'w-4 h-4' })}
                      <span className="font-medium">
                        {Math.abs(metric.change)}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold text-neutral-900 mb-1">
                      {formattedValue}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {metric.title}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card padding="lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-neutral-900">
                  Performance Trends
                </h3>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
              <div className="h-64 bg-neutral-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-500">Chart Component Placeholder</p>
                  <p className="text-sm text-neutral-400">Line chart showing ROAS, CAC trends</p>
                </div>
              </div>
            </Card>
            
            <Card padding="lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-neutral-900">
                  Channel Performance
                </h3>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
              <div className="h-64 bg-neutral-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Eye className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-500">Chart Component Placeholder</p>
                  <p className="text-sm text-neutral-400">Donut chart showing channel breakdown</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Campaigns Table */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-900">
                Active Campaigns
              </h3>
              <Button variant="primary" size="sm">
                Create Campaign
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 font-medium text-neutral-700">Campaign</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-700">Channel</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-700">Budget</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-700">Spent</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-700">ROAS</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-700">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-neutral-900">{campaign.name}</div>
                      </td>
                      <td className="py-4 px-4 text-neutral-600">{campaign.channel}</td>
                      <td className="py-4 px-4 text-neutral-600">
                        {formatCurrency(campaign.budget)}
                      </td>
                      <td className="py-4 px-4 text-neutral-600">
                        {formatCurrency(campaign.spent)}
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-neutral-900">
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