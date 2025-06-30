import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Target,
  Users,
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Activity
} from 'lucide-react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useToggle } from '../hooks/useToggle';
import { formatCurrency, formatPercentage, formatCompactNumber } from '../utils/formatters';

const Analytics: React.FC = () => {
  const [sidebarCollapsed, { toggle: toggleSidebar }] = useToggle(false);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('roas');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    const updateTimer = setInterval(() => setLastUpdated(new Date()), 30000);
    return () => {
      clearTimeout(timer);
      clearInterval(updateTimer);
    };
  }, []);

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' },
  ];

  const metrics = [
    {
      id: 'roas',
      title: 'Return on Ad Spend',
      value: 4.2,
      change: 18.7,
      trend: 'up',
      icon: TrendingUp,
      color: 'blue',
      format: 'number',
      suffix: 'x'
    },
    {
      id: 'cac',
      title: 'Customer Acquisition Cost',
      value: 47.32,
      change: -23.5,
      trend: 'down',
      icon: DollarSign,
      color: 'green',
      format: 'currency'
    },
    {
      id: 'ltv',
      title: 'Customer Lifetime Value',
      value: 287.45,
      change: 12.3,
      trend: 'up',
      icon: Users,
      color: 'purple',
      format: 'currency'
    },
    {
      id: 'ctr',
      title: 'Click-Through Rate',
      value: 0.034,
      change: 8.9,
      trend: 'up',
      icon: Eye,
      color: 'teal',
      format: 'percentage'
    },
    {
      id: 'impressions',
      title: 'Total Impressions',
      value: 2450000,
      change: 15.2,
      trend: 'up',
      icon: Activity,
      color: 'orange',
      format: 'compact'
    },
    {
      id: 'conversions',
      title: 'Conversions',
      value: 1247,
      change: 22.8,
      trend: 'up',
      icon: Target,
      color: 'pink',
      format: 'number'
    }
  ];

  const channelData = [
    { name: 'Meta Ads', spend: 45000, roas: 4.2, color: 'blue' },
    { name: 'Google Ads', spend: 38000, roas: 3.8, color: 'red' },
    { name: 'TikTok Ads', spend: 22000, roas: 5.1, color: 'purple' },
    { name: 'LinkedIn Ads', spend: 15000, roas: 2.9, color: 'blue' },
    { name: 'Email Marketing', spend: 8000, roas: 6.2, color: 'green' },
  ];

  const topCampaigns = [
    { name: 'Holiday Sale 2024', roas: 5.2, spend: 12450, conversions: 342 },
    { name: 'Product Launch Q1', roas: 4.8, spend: 18200, conversions: 287 },
    { name: 'Retargeting Campaign', roas: 4.5, spend: 7850, conversions: 198 },
    { name: 'Brand Awareness', roas: 3.9, spend: 15600, conversions: 156 },
    { name: 'Email Nurture', roas: 3.7, spend: 5200, conversions: 124 },
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setLastUpdated(new Date());
    setTimeout(() => setIsLoading(false), 1000);
  };

  const formatMetricValue = (metric: any) => {
    switch (metric.format) {
      case 'currency':
        return formatCurrency(metric.value);
      case 'percentage':
        return formatPercentage(metric.value);
      case 'compact':
        return formatCompactNumber(metric.value);
      default:
        return metric.value.toLocaleString() + (metric.suffix || '');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        currentPath="/analytics"
      />
      
      <div className="flex-1 flex flex-col">
        <Header variant="dashboard" />
        
        <main className="flex-1 p-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="animate-slide-in-up">
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-slate-300 text-lg">
                Real-time insights and performance metrics across all channels
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0 animate-slide-in-right">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
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
              
              <Button variant="ghost" size="sm" leftIcon={<RefreshCw className="w-4 h-4" />} onClick={handleRefresh}>
                Refresh
              </Button>
              
              <Button variant="futuristic" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                Export
              </Button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {metrics.map((metric, index) => {
              const isPositive = metric.change > 0;
              const changeIcon = isPositive ? ArrowUpRight : ArrowDownRight;
              const changeColor = metric.id === 'cac' 
                ? (isPositive ? 'text-red-400' : 'text-green-400')
                : (isPositive ? 'text-green-400' : 'text-red-400');

              return (
                <Card 
                  key={metric.id} 
                  variant="futuristic" 
                  padding="lg" 
                  hover 
                  glow={selectedMetric === metric.id}
                  className={`animate-slide-in-up cursor-pointer transition-all duration-300 ${
                    selectedMetric === metric.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedMetric(metric.id)}
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
                    <div className="text-3xl font-bold text-white mb-1">
                      {formatMetricValue(metric)}
                    </div>
                    <div className="text-sm text-slate-400">
                      {metric.title}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Performance Trends Chart */}
            <Card variant="futuristic" padding="lg" className="animate-slide-in-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Performance Trends
                </h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="success" size="sm" dot>Live</Badge>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    View Details
                  </Button>
                </div>
              </div>
              <div className="h-80 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-xl flex items-center justify-center border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 geometric-pattern opacity-20"></div>
                <div className="text-center relative z-10">
                  <TrendingUp className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-slate-300 text-lg mb-2">Interactive Performance Chart</p>
                  <p className="text-sm text-slate-500">ROAS, CAC, and conversion trends over time</p>
                  <div className="mt-4 flex justify-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-slate-400">ROAS</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                      <span className="text-xs text-slate-400">CAC</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-slate-400">Conversions</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Channel Distribution */}
            <Card variant="futuristic" padding="lg" className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Channel Distribution
                </h3>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  View All
                </Button>
              </div>
              <div className="h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl flex items-center justify-center border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 geometric-pattern opacity-20"></div>
                <div className="text-center relative z-10">
                  <PieChart className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-slate-300 text-lg mb-2">Channel Performance Breakdown</p>
                  <p className="text-sm text-slate-500">Spend and ROAS by advertising channel</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Channel Performance Table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card variant="futuristic" padding="lg" className="animate-slide-in-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Channel Performance
                </h3>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {channelData.map((channel, index) => (
                  <div 
                    key={channel.name} 
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r from-${channel.color}-500 to-${channel.color}-600 flex items-center justify-center`}>
                        <span className="text-white text-sm font-bold">
                          {channel.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{channel.name}</div>
                        <div className="text-slate-400 text-sm">
                          {formatCurrency(channel.spend)} spent
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">
                        {channel.roas.toFixed(1)}x ROAS
                      </div>
                      <div className="text-slate-400 text-sm">
                        {channel.roas > 4 ? (
                          <Badge variant="success" size="sm">Excellent</Badge>
                        ) : channel.roas > 3 ? (
                          <Badge variant="primary" size="sm">Good</Badge>
                        ) : (
                          <Badge variant="warning" size="sm">Needs Attention</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Performing Campaigns */}
            <Card variant="futuristic" padding="lg" className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Top Performing Campaigns
                </h3>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {topCampaigns.map((campaign, index) => (
                  <div 
                    key={campaign.name} 
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-1">
                      <div className="text-white font-medium mb-1">{campaign.name}</div>
                      <div className="text-slate-400 text-sm">
                        {formatCurrency(campaign.spend)} • {campaign.conversions} conversions
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">
                        {campaign.roas.toFixed(1)}x
                      </div>
                      <div className="flex items-center space-x-1 text-green-400 text-sm">
                        <TrendingUp className="w-3 h-3" />
                        <span>+{(Math.random() * 20 + 5).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Real-time Activity Feed */}
          <Card variant="futuristic" padding="lg" className="animate-slide-in-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Real-time Activity
              </h3>
              <div className="flex items-center space-x-2">
                <Badge variant="success" size="sm" dot>Live</Badge>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  View All
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { action: 'New conversion', campaign: 'Holiday Sale 2024', value: '$127.50', time: '2 minutes ago', type: 'success' },
                { action: 'Campaign optimized', campaign: 'Product Launch Q1', value: '+15% ROAS', time: '5 minutes ago', type: 'info' },
                { action: 'Budget threshold reached', campaign: 'Brand Awareness', value: '80% spent', time: '12 minutes ago', type: 'warning' },
                { action: 'New lead generated', campaign: 'Email Nurture', value: '$89.25', time: '18 minutes ago', type: 'success' },
                { action: 'A/B test completed', campaign: 'Retargeting Campaign', value: 'Variant B wins', time: '25 minutes ago', type: 'info' },
              ].map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-400' : 
                      activity.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                    } animate-pulse`}></div>
                    <div>
                      <div className="text-white text-sm font-medium">{activity.action}</div>
                      <div className="text-slate-400 text-xs">{activity.campaign}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm font-medium">{activity.value}</div>
                    <div className="text-slate-500 text-xs">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Analytics;