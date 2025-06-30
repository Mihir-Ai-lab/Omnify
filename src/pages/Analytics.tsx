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
  Activity,
  ExternalLink,
  FileText,
  FileSpreadsheet,
  FileImage,
  ChevronDown,
  LineChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showTrendTooltip, setShowTrendTooltip] = useState<number | null>(null);
  const [activeLegendItems, setActiveLegendItems] = useState<string[]>(['roas', 'cac', 'conversions']);
  const [periodData, setPeriodData] = useState<any>(null);
  const [isDataLoading, setIsDataLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    const updateTimer = setInterval(() => setLastUpdated(new Date()), 30000);
    return () => {
      clearTimeout(timer);
      clearInterval(updateTimer);
    };
  }, []);

  // Load data when period changes
  useEffect(() => {
    loadPeriodData(selectedPeriod);
  }, [selectedPeriod]);

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' },
  ];

  const filterOptions = [
    { value: 'channel', label: 'Channel', options: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads'] },
    { value: 'campaign', label: 'Campaign Type', options: ['Awareness', 'Conversion', 'Retargeting', 'Lead Gen'] },
    { value: 'performance', label: 'Performance', options: ['Excellent', 'Good', 'Poor'] },
    { value: 'status', label: 'Status', options: ['Active', 'Paused', 'Completed'] },
  ];

  const exportFormats = [
    { value: 'csv', label: 'CSV File', icon: FileText, description: 'Comma-separated values' },
    { value: 'excel', label: 'Excel File', icon: FileSpreadsheet, description: 'Microsoft Excel format' },
    { value: 'pdf', label: 'PDF Report', icon: FileImage, description: 'Formatted report' },
  ];

  // Dynamic data based on selected period
  const getMetricsForPeriod = (period: string) => {
    const baseMetrics = {
      '7d': {
        roas: { value: 4.2, change: 18.7 },
        cac: { value: 47.32, change: -23.5 },
        ltv: { value: 287.45, change: 12.3 },
        ctr: { value: 0.034, change: 8.9 },
        impressions: { value: 2450000, change: 15.2 },
        conversions: { value: 1247, change: 22.8 }
      },
      '30d': {
        roas: { value: 3.8, change: 15.2 },
        cac: { value: 52.18, change: -18.3 },
        ltv: { value: 312.67, change: 18.7 },
        ctr: { value: 0.029, change: 12.4 },
        impressions: { value: 8750000, change: 28.9 },
        conversions: { value: 4892, change: 31.2 }
      },
      '90d': {
        roas: { value: 3.5, change: 8.9 },
        cac: { value: 58.94, change: -12.7 },
        ltv: { value: 298.33, change: 9.8 },
        ctr: { value: 0.027, change: 6.2 },
        impressions: { value: 24500000, change: 22.1 },
        conversions: { value: 13247, change: 19.8 }
      },
      '1y': {
        roas: { value: 3.2, change: 24.6 },
        cac: { value: 64.21, change: -28.9 },
        ltv: { value: 276.89, change: 15.4 },
        ctr: { value: 0.025, change: 18.7 },
        impressions: { value: 89750000, change: 45.3 },
        conversions: { value: 52847, change: 38.9 }
      }
    };
    return baseMetrics[period as keyof typeof baseMetrics] || baseMetrics['30d'];
  };

  const loadPeriodData = async (period: string) => {
    setIsDataLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newData = getMetricsForPeriod(period);
      setPeriodData(newData);
      setIsDataLoading(false);
      console.log(`Data loaded for period: ${period}`, newData);
    }, 800);
  };

  const metrics = [
    {
      id: 'roas',
      title: 'Return on Ad Spend',
      value: periodData?.roas?.value || 4.2,
      change: periodData?.roas?.change || 18.7,
      trend: 'up',
      icon: TrendingUp,
      color: 'blue',
      format: 'number',
      suffix: 'x'
    },
    {
      id: 'cac',
      title: 'Customer Acquisition Cost',
      value: periodData?.cac?.value || 47.32,
      change: periodData?.cac?.change || -23.5,
      trend: 'down',
      icon: DollarSign,
      color: 'green',
      format: 'currency'
    },
    {
      id: 'ltv',
      title: 'Customer Lifetime Value',
      value: periodData?.ltv?.value || 287.45,
      change: periodData?.ltv?.change || 12.3,
      trend: 'up',
      icon: Users,
      color: 'purple',
      format: 'currency'
    },
    {
      id: 'ctr',
      title: 'Click-Through Rate',
      value: periodData?.ctr?.value || 0.034,
      change: periodData?.ctr?.change || 8.9,
      trend: 'up',
      icon: Eye,
      color: 'teal',
      format: 'percentage'
    },
    {
      id: 'impressions',
      title: 'Total Impressions',
      value: periodData?.impressions?.value || 2450000,
      change: periodData?.impressions?.change || 15.2,
      trend: 'up',
      icon: Activity,
      color: 'orange',
      format: 'compact'
    },
    {
      id: 'conversions',
      title: 'Conversions',
      value: periodData?.conversions?.value || 1247,
      change: periodData?.conversions?.change || 22.8,
      trend: 'up',
      icon: Target,
      color: 'pink',
      format: 'number'
    }
  ];

  const channelData = [
    { name: 'Meta Ads', spend: 45000, roas: 4.2, color: 'blue', percentage: 35 },
    { name: 'Google Ads', spend: 38000, roas: 3.8, color: 'red', percentage: 30 },
    { name: 'TikTok Ads', spend: 22000, roas: 5.1, color: 'purple', percentage: 17 },
    { name: 'LinkedIn Ads', spend: 15000, roas: 2.9, color: 'blue', percentage: 12 },
    { name: 'Email Marketing', spend: 8000, roas: 6.2, color: 'green', percentage: 6 },
  ];

  const topCampaigns = [
    { name: 'Holiday Sale 2024', roas: 5.2, spend: 12450, conversions: 342 },
    { name: 'Product Launch Q1', roas: 4.8, spend: 18200, conversions: 287 },
    { name: 'Retargeting Campaign', roas: 4.5, spend: 7850, conversions: 198 },
    { name: 'Brand Awareness', roas: 3.9, spend: 15600, conversions: 156 },
    { name: 'Email Nurture', roas: 3.7, spend: 5200, conversions: 124 },
  ];

  // Mock trend data for charts
  const trendData = [
    { day: 'Mon', roas: 3.8, cac: 52, conversions: 156, date: '2024-11-25' },
    { day: 'Tue', roas: 4.1, cac: 48, conversions: 189, date: '2024-11-26' },
    { day: 'Wed', roas: 3.9, cac: 50, conversions: 234, date: '2024-11-27' },
    { day: 'Thu', roas: 4.3, cac: 45, conversions: 287, date: '2024-11-28' },
    { day: 'Fri', roas: 4.2, cac: 47, conversions: 312, date: '2024-11-29' },
    { day: 'Sat', roas: 4.0, cac: 49, conversions: 298, date: '2024-11-30' },
    { day: 'Sun', roas: 4.2, cac: 47, conversions: 342, date: '2024-12-01' },
  ];

  const handlePeriodChange = (newPeriod: string) => {
    setSelectedPeriod(newPeriod);
    console.log(`Period changed to: ${newPeriod}`);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setLastUpdated(new Date());
    loadPeriodData(selectedPeriod);
    setTimeout(() => {
      setIsRefreshing(false);
      console.log('Analytics data refreshed');
    }, 1000);
  };

  const handleFilterToggle = (filterValue: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterValue)
        ? prev.filter(f => f !== filterValue)
        : [...prev, filterValue]
    );
  };

  const handleApplyFilters = () => {
    setIsFiltering(true);
    setShowFilterDropdown(false);
    setTimeout(() => {
      setIsFiltering(false);
      console.log('Filters applied:', selectedFilters);
    }, 1000);
  };

  const handleResetFilters = () => {
    setSelectedFilters([]);
    console.log('Filters reset');
  };

  const handleExport = async (format: string) => {
    setIsExporting(true);
    setShowExportDropdown(false);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `analytics-report-${timestamp}.${format}`;
      console.log(`Exporting ${format.toUpperCase()} file: ${filename}`);
      console.log('Export data includes:', {
        period: selectedPeriod,
        filters: selectedFilters,
        metrics: metrics.map(m => ({ id: m.id, value: m.value })),
        channels: channelData,
        campaigns: topCampaigns
      });
      
      // In a real app, this would trigger an actual download
      const link = document.createElement('a');
      link.href = '#';
      link.download = filename;
      link.click();
    }, 2000);
  };

  const handleTrendHover = (index: number | null) => {
    setShowTrendTooltip(index);
  };

  const handleLegendToggle = (metricId: string) => {
    setActiveLegendItems(prev => 
      prev.includes(metricId)
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
    console.log('Legend toggled:', metricId);
  };

  // Navigation handlers with proper routing
  const handleViewDetails = (widget: string) => {
    try {
      switch (widget) {
        case 'performance-trends':
          navigate('/analytics?view=trends&period=' + selectedPeriod);
          break;
        case 'channel-distribution':
          navigate('/analytics?view=channels&period=' + selectedPeriod);
          break;
        case 'channel-performance':
          navigate('/analytics?view=channel-performance&period=' + selectedPeriod);
          break;
        case 'top-campaigns':
          navigate('/campaigns?sort=performance&period=' + selectedPeriod);
          break;
        case 'activity-feed':
          navigate('/analytics?view=activity&period=' + selectedPeriod);
          break;
        default:
          console.log(`Viewing details for: ${widget}`);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback: show alert or notification
      alert(`Unable to navigate to ${widget} details. Please try again.`);
    }
  };

  const handleViewAllCampaigns = () => {
    try {
      navigate('/campaigns');
    } catch (error) {
      console.error('Navigation error:', error);
      alert('Unable to navigate to campaigns. Please try again.');
    }
  };

  const handleViewAllChannels = () => {
    try {
      navigate('/analytics?view=channels');
    } catch (error) {
      console.error('Navigation error:', error);
      alert('Unable to navigate to channel details. Please try again.');
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        currentPath="/analytics"
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
                Analytics Dashboard
              </h1>
              <p className="text-slate-300 text-lg">
                Real-time insights and performance metrics across all channels
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()} • Period: {periods.find(p => p.value === selectedPeriod)?.label}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0 animate-slide-in-right">
              {/* Period Selector */}
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => handlePeriodChange(e.target.value)}
                  disabled={isDataLoading}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm disabled:opacity-50"
                >
                  {periods.map((period) => (
                    <option key={period.value} value={period.value} className="bg-slate-800 text-white">
                      {period.label}
                    </option>
                  ))}
                </select>
                {isDataLoading && (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
              
              {/* Filter Dropdown */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  leftIcon={<Filter className="w-4 h-4" />}
                  rightIcon={<ChevronDown className="w-4 h-4" />}
                  loading={isFiltering}
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="text-slate-400 hover:text-white"
                >
                  Filter {selectedFilters.length > 0 && `(${selectedFilters.length})`}
                </Button>
                
                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-80 glass-dark rounded-xl shadow-xl border border-white/10 p-4 z-50 animate-slide-in-up">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Filter Options</h3>
                      <button
                        onClick={handleResetFilters}
                        className="text-slate-400 hover:text-white text-sm"
                      >
                        Reset All
                      </button>
                    </div>
                    
                    {filterOptions.map((filterGroup) => (
                      <div key={filterGroup.value} className="mb-4">
                        <h4 className="text-slate-300 font-medium mb-2">{filterGroup.label}</h4>
                        <div className="space-y-2">
                          {filterGroup.options.map((option) => (
                            <label key={option} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedFilters.includes(option)}
                                onChange={() => handleFilterToggle(option)}
                                className="w-4 h-4 text-blue-600 border-white/20 rounded focus:ring-blue-500 bg-white/10"
                              />
                              <span className="text-slate-300 text-sm">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex space-x-2 pt-4 border-t border-white/10">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFilterDropdown(false)}
                        className="flex-1 text-slate-400 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="futuristic"
                        size="sm"
                        onClick={handleApplyFilters}
                        className="flex-1"
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                leftIcon={<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />}
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="text-slate-400 hover:text-white"
              >
                Refresh
              </Button>
              
              {/* Export Dropdown */}
              <div className="relative">
                <Button 
                  variant="futuristic" 
                  size="sm" 
                  leftIcon={<Download className="w-4 h-4" />}
                  rightIcon={<ChevronDown className="w-4 h-4" />}
                  loading={isExporting}
                  onClick={() => setShowExportDropdown(!showExportDropdown)}
                >
                  Export
                </Button>
                
                {showExportDropdown && (
                  <div className="absolute right-0 mt-2 w-64 glass-dark rounded-xl shadow-xl border border-white/10 p-2 z-50 animate-slide-in-up">
                    {exportFormats.map((format) => (
                      <button
                        key={format.value}
                        onClick={() => handleExport(format.value)}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                      >
                        <format.icon className="w-5 h-5 text-slate-400" />
                        <div className="text-left">
                          <div className="text-white font-medium">{format.label}</div>
                          <div className="text-slate-400 text-xs">{format.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
                  } ${isDataLoading ? 'opacity-50' : ''}`}
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
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-slate-400 hover:text-white"
                    onClick={() => handleViewDetails('performance-trends')}
                    rightIcon={<ExternalLink className="w-4 h-4" />}
                  >
                    View Details
                  </Button>
                </div>
              </div>
              
              {/* Chart Area */}
              <div className="h-80 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-xl border border-white/10 relative overflow-hidden p-4">
                <div className="absolute inset-0 geometric-pattern opacity-20"></div>
                
                {/* Chart Content */}
                <div className="relative z-10 h-full">
                  {/* Chart Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <LineChart className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-slate-300 text-sm">{periods.find(p => p.value === selectedPeriod)?.label} Trend Analysis</p>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'roas', label: 'ROAS', color: 'blue' },
                        { id: 'cac', label: 'CAC', color: 'teal' },
                        { id: 'conversions', label: 'Conversions', color: 'purple' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleLegendToggle(item.id)}
                          className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-all duration-200 ${
                            activeLegendItems.includes(item.id)
                              ? `bg-${item.color}-500/20 text-${item.color}-300 border border-${item.color}-500/30`
                              : 'bg-slate-700/50 text-slate-500 border border-slate-600'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full bg-${item.color}-500`}></div>
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mock Chart Visualization */}
                  <div className="h-48 flex items-end justify-between space-x-2 relative">
                    {trendData.map((data, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center relative cursor-pointer"
                        onMouseEnter={() => handleTrendHover(index)}
                        onMouseLeave={() => handleTrendHover(null)}
                      >
                        {/* Tooltip */}
                        {showTrendTooltip === index && (
                          <div className="absolute bottom-full mb-2 bg-slate-800 border border-white/20 rounded-lg p-2 text-xs text-white z-10 min-w-[120px]">
                            <div className="font-semibold mb-1">{data.day}</div>
                            <div>ROAS: {data.roas}x</div>
                            <div>CAC: ${data.cac}</div>
                            <div>Conversions: {data.conversions}</div>
                          </div>
                        )}
                        
                        {/* Bars */}
                        <div className="w-full space-y-1">
                          {activeLegendItems.includes('roas') && (
                            <div
                              className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-300 hover:from-blue-500 hover:to-blue-300"
                              style={{ height: `${(data.roas / 5) * 60}px` }}
                            ></div>
                          )}
                          {activeLegendItems.includes('conversions') && (
                            <div
                              className="bg-gradient-to-t from-purple-600 to-purple-400 rounded transition-all duration-300 hover:from-purple-500 hover:to-purple-300"
                              style={{ height: `${(data.conversions / 400) * 40}px` }}
                            ></div>
                          )}
                        </div>
                        
                        <div className="text-xs text-slate-400 mt-2">{data.day}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Chart Summary */}
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-green-400 text-lg font-bold">+{metrics[0].change}%</div>
                      <div className="text-xs text-slate-400">ROAS Growth</div>
                    </div>
                    <div>
                      <div className="text-green-400 text-lg font-bold">{metrics[1].change}%</div>
                      <div className="text-xs text-slate-400">CAC Change</div>
                    </div>
                    <div>
                      <div className="text-blue-400 text-lg font-bold">{formatCompactNumber(metrics[5].value)}</div>
                      <div className="text-xs text-slate-400">Total Conversions</div>
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-400 hover:text-white"
                  onClick={() => handleViewDetails('channel-distribution')}
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                >
                  View All
                </Button>
              </div>
              
              {/* Chart Area */}
              <div className="h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-white/10 relative overflow-hidden p-4">
                <div className="absolute inset-0 geometric-pattern opacity-20"></div>
                
                {/* Chart Content */}
                <div className="relative z-10 h-full">
                  {/* Chart Header */}
                  <div className="text-center mb-6">
                    <PieChart className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-slate-300 text-sm">Ad Spend by Channel</p>
                  </div>
                  
                  {/* Mock Pie Chart Visualization */}
                  <div className="space-y-3 mb-6">
                    {channelData.map((channel, index) => (
                      <div 
                        key={channel.name} 
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer"
                        onClick={() => console.log(`Channel clicked: ${channel.name}`)}
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className={`w-4 h-4 rounded-full bg-gradient-to-r from-${channel.color}-500 to-${channel.color}-600`}
                          ></div>
                          <span className="text-slate-300 font-medium">{channel.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-white font-semibold">{channel.percentage}%</div>
                            <div className="text-xs text-slate-400">{formatCurrency(channel.spend)}</div>
                          </div>
                          <div className="w-16 bg-slate-700 rounded-full h-2">
                            <div 
                              className={`bg-gradient-to-r from-${channel.color}-500 to-${channel.color}-600 h-2 rounded-full transition-all duration-1000`}
                              style={{ width: `${channel.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Chart Summary */}
                  <div className="text-center pt-4 border-t border-white/10">
                    <div className="text-lg font-bold text-white mb-1">
                      {formatCurrency(channelData.reduce((sum, channel) => sum + channel.spend, 0))}
                    </div>
                    <div className="text-sm text-slate-400">Total Ad Spend</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Avg ROAS: {(channelData.reduce((sum, channel) => sum + channel.roas, 0) / channelData.length).toFixed(1)}x
                    </div>
                  </div>
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-400 hover:text-white"
                  onClick={handleViewAllChannels}
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                >
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {channelData.map((channel, index) => (
                  <div 
                    key={channel.name} 
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200 cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => console.log(`Channel details: ${channel.name}`)}
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-400 hover:text-white"
                  onClick={handleViewAllCampaigns}
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                >
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {topCampaigns.map((campaign, index) => (
                  <div 
                    key={campaign.name} 
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200 cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => console.log(`Campaign details: ${campaign.name}`)}
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-400 hover:text-white"
                  onClick={() => handleViewDetails('activity-feed')}
                  rightIcon={<ExternalLink className="w-4 h-4" />}
                >
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
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer"
                  onClick={() => console.log(`Activity details: ${activity.action}`)}
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