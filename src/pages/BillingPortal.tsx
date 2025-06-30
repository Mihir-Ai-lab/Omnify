import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Zap,
  Crown,
  Star,
  ArrowUpRight,
  ExternalLink,
  RefreshCw,
  Settings,
  Users,
  FileText,
  FileSpreadsheet,
  FileImage,
  ChevronDown
} from 'lucide-react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useToggle } from '../hooks/useToggle';
import { formatCurrency, formatDate } from '../utils/formatters';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  downloadUrl: string;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
  current?: boolean;
}

const BillingPortal: React.FC = () => {
  const [sidebarCollapsed, { toggle: toggleSidebar }] = useToggle(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');
  const [isChangingPlan, setIsChangingPlan] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [downloadingInvoices, setDownloadingInvoices] = useState<string[]>([]);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showUsageModal, setShowUsageModal] = useState(false);
  const [showBillingPortalModal, setShowBillingPortalModal] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const currentPlan = {
    name: 'Pro Plan',
    price: 299,
    interval: 'month' as const,
    nextBilling: '2025-01-15T00:00:00Z',
    status: 'active'
  };

  const usage = {
    apiCalls: { used: 24567, limit: 100000 },
    campaigns: { used: 12, limit: 50 },
    teamMembers: { used: 5, limit: 10 },
    storage: { used: 2.4, limit: 10 }
  };

  const invoices: Invoice[] = [
    {
      id: 'INV-2024-001',
      date: '2024-12-01T00:00:00Z',
      amount: 299,
      status: 'paid',
      description: 'Pro Plan - December 2024',
      downloadUrl: '#'
    },
    {
      id: 'INV-2024-002',
      date: '2024-11-01T00:00:00Z',
      amount: 299,
      status: 'paid',
      description: 'Pro Plan - November 2024',
      downloadUrl: '#'
    },
    {
      id: 'INV-2024-003',
      date: '2024-10-01T00:00:00Z',
      amount: 299,
      status: 'paid',
      description: 'Pro Plan - October 2024',
      downloadUrl: '#'
    },
    {
      id: 'INV-2024-004',
      date: '2024-09-01T00:00:00Z',
      amount: 299,
      status: 'failed',
      description: 'Pro Plan - September 2024',
      downloadUrl: '#'
    }
  ];

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: billingInterval === 'month' ? 99 : 990,
      interval: billingInterval,
      features: [
        'Up to 5 campaigns',
        '10,000 API calls/month',
        'Basic analytics',
        'Email support',
        '2 team members'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: billingInterval === 'month' ? 299 : 2990,
      interval: billingInterval,
      popular: true,
      current: true,
      features: [
        'Up to 50 campaigns',
        '100,000 API calls/month',
        'Advanced analytics',
        'Priority support',
        '10 team members',
        'A/B testing',
        'Custom integrations'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingInterval === 'month' ? 999 : 9990,
      interval: billingInterval,
      features: [
        'Unlimited campaigns',
        'Unlimited API calls',
        'Custom analytics',
        'Dedicated support',
        'Unlimited team members',
        'Advanced A/B testing',
        'White-label solution',
        'Custom onboarding'
      ]
    }
  ];

  const exportFormats = [
    { value: 'csv', label: 'CSV File', icon: FileText, description: 'Comma-separated values' },
    { value: 'excel', label: 'Excel File', icon: FileSpreadsheet, description: 'Microsoft Excel format' },
    { value: 'pdf', label: 'PDF Report', icon: FileImage, description: 'Formatted report' },
  ];

  // Enhanced button handlers with proper error handling and user feedback
  const handleChangePlan = async () => {
    try {
      setIsChangingPlan(true);
      setShowPlanModal(true);
      console.log('Opening plan change modal');
    } catch (error) {
      console.error('Error opening plan modal:', error);
      alert('Unable to open plan selection. Please try again.');
    } finally {
      setIsChangingPlan(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setIsCancelling(true);
      setShowCancelModal(true);
      console.log('Opening cancellation modal');
    } catch (error) {
      console.error('Error opening cancellation modal:', error);
      alert('Unable to open cancellation dialog. Please try again.');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleUpdatePayment = async () => {
    try {
      setIsUpdatingPayment(true);
      setShowPaymentModal(true);
      console.log('Opening payment update modal');
    } catch (error) {
      console.error('Error opening payment modal:', error);
      alert('Unable to open payment form. Please try again.');
    } finally {
      setIsUpdatingPayment(false);
    }
  };

  const handleViewBillingPortal = async () => {
    try {
      console.log('Opening billing portal dummy page...');
      
      // For development/demo purposes, show a modal instead of redirecting to external URL
      setShowBillingPortalModal(true);
      
      // Alternative: You could also redirect to a dummy internal page
      // window.location.href = '/billing/portal-demo';
      
      console.log('Billing portal modal opened successfully');
      
    } catch (error) {
      console.error('Error opening billing portal:', error);
      alert('Unable to open billing portal. Please try again.');
    }
  };

  const handleDownloadInvoice = async (invoiceId: string) => {
    try {
      setDownloadingInvoices(prev => [...prev, invoiceId]);
      
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`Downloading invoice: ${invoiceId}`);
      
      // In a real app, this would trigger an actual download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `invoice-${invoiceId}.pdf`;
      link.click();
      
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Unable to download invoice. Please try again.');
    } finally {
      setDownloadingInvoices(prev => prev.filter(id => id !== invoiceId));
    }
  };

  const handleExportData = async (format: string) => {
    try {
      setIsExporting(true);
      setShowExportDropdown(false);
      
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `billing-data-${timestamp}.${format}`;
      
      console.log(`Exporting ${format.toUpperCase()} file: ${filename}`);
      
      // In a real app, this would trigger an actual download
      const link = document.createElement('a');
      link.href = '#';
      link.download = filename;
      link.click();
      
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Unable to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleRefreshData = async () => {
    try {
      setIsRefreshing(true);
      setLastUpdated(new Date());
      
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Billing data refreshed');
      
    } catch (error) {
      console.error('Error refreshing data:', error);
      alert('Unable to refresh data. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleViewUsageDetails = () => {
    try {
      setShowUsageModal(true);
      console.log('Opening usage details modal');
    } catch (error) {
      console.error('Error opening usage modal:', error);
      alert('Unable to open usage details. Please try again.');
    }
  };

  const handleManageTeam = () => {
    try {
      window.location.href = '/team';
    } catch (error) {
      console.error('Error navigating to team page:', error);
      alert('Unable to navigate to team management. Please try again.');
    }
  };

  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success" size="sm">Paid</Badge>;
      case 'pending':
        return <Badge variant="warning" size="sm">Pending</Badge>;
      case 'failed':
        return <Badge variant="error" size="sm">Failed</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Unknown</Badge>;
    }
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'red';
    if (percentage >= 70) return 'yellow';
    return 'green';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        currentPath="/billing"
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
                Billing & Subscription
              </h1>
              <p className="text-slate-300 text-lg">
                Manage your subscription, billing, and usage
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0 animate-slide-in-right">
              <Button 
                variant="ghost" 
                size="sm" 
                leftIcon={<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />}
                onClick={handleRefreshData}
                disabled={isRefreshing}
                className="text-slate-400 hover:text-white"
              >
                Refresh
              </Button>
              
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  leftIcon={<Download className="w-4 h-4" />}
                  rightIcon={<ChevronDown className="w-4 h-4" />}
                  onClick={() => setShowExportDropdown(!showExportDropdown)}
                  loading={isExporting}
                  className="text-slate-400 hover:text-white"
                >
                  Export
                </Button>
                
                {showExportDropdown && (
                  <div className="absolute right-0 mt-2 w-64 glass-dark rounded-xl shadow-xl border border-white/10 p-2 z-50 animate-slide-in-up">
                    {exportFormats.map((format) => (
                      <button
                        key={format.value}
                        onClick={() => handleExportData(format.value)}
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
              
              <Button 
                variant="futuristic" 
                size="sm" 
                leftIcon={<CreditCard className="w-4 h-4" />}
                onClick={handleUpdatePayment}
                loading={isUpdatingPayment}
              >
                Update Payment
              </Button>
            </div>
          </div>

          {/* Current Plan & Usage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Current Plan */}
            <Card variant="futuristic" padding="lg" className="animate-slide-in-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Current Plan</h3>
                <Badge variant="success" size="sm" dot>Active</Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">{currentPlan.name}</h4>
                    <p className="text-slate-400">
                      {formatCurrency(currentPlan.price)}/{currentPlan.interval}
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400">Next billing date</span>
                    <span className="text-white font-medium">
                      {formatDate(new Date(currentPlan.nextBilling))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Amount</span>
                    <span className="text-white font-medium">
                      {formatCurrency(currentPlan.price)}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    fullWidth
                    onClick={handleChangePlan}
                    loading={isChangingPlan}
                    className="text-slate-300 hover:text-white border-white/20 hover:border-white/40"
                  >
                    Change Plan
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    fullWidth 
                    onClick={handleCancelSubscription}
                    loading={isCancelling}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </Card>

            {/* Usage Overview */}
            <Card variant="futuristic" padding="lg" className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Usage This Month</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-400 hover:text-white"
                  onClick={handleViewUsageDetails}
                >
                  View Details
                </Button>
              </div>
              
              <div className="space-y-4">
                {Object.entries(usage).map(([key, data], index) => {
                  const percentage = getUsagePercentage(data.used, data.limit);
                  const color = getUsageColor(percentage);
                  
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 capitalize">
                          {key === 'apiCalls' ? 'API Calls' : key}
                        </span>
                        <span className="text-white font-medium">
                          {key === 'storage' 
                            ? `${data.used}GB / ${data.limit}GB`
                            : `${data.used.toLocaleString()} / ${data.limit.toLocaleString()}`
                          }
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${
                            color === 'red' ? 'from-red-500 to-red-600' :
                            color === 'yellow' ? 'from-yellow-500 to-yellow-600' :
                            'from-green-500 to-green-600'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 font-medium">Usage Trend</span>
                </div>
                <p className="text-slate-300 text-sm">
                  Your usage is 15% higher than last month. Consider upgrading if you're approaching limits.
                </p>
              </div>
            </Card>
          </div>

          {/* Plan Comparison */}
          <Card variant="futuristic" padding="lg" className="mb-8 animate-slide-in-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Available Plans</h3>
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setBillingInterval('month')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    billingInterval === 'month' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingInterval('year')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    billingInterval === 'year' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Yearly
                  <span className="ml-1 text-xs bg-green-500 text-white px-1 rounded">Save 20%</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <div
                  key={plan.id}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                    plan.popular 
                      ? 'border-blue-500 bg-gradient-to-br from-blue-500/10 to-teal-500/10' 
                      : 'border-white/20 bg-white/5'
                  } ${plan.current ? 'ring-2 ring-green-500' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge variant="primary" size="sm">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  {plan.current && (
                    <div className="absolute -top-3 right-4">
                      <Badge variant="success" size="sm">Current Plan</Badge>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                    <div className="text-3xl font-bold text-white mb-1">
                      {formatCurrency(plan.price)}
                    </div>
                    <div className="text-slate-400">per {plan.interval}</div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    variant={plan.current ? "outline" : plan.popular ? "futuristic" : "ghost"}
                    size="md"
                    fullWidth
                    disabled={plan.current}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={plan.current ? "text-slate-400 border-slate-600" : ""}
                  >
                    {plan.current ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Payment Method & Invoices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Method */}
            <Card variant="futuristic" padding="lg" className="animate-slide-in-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Payment Method</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-400 hover:text-white"
                  onClick={handleUpdatePayment}
                  loading={isUpdatingPayment}
                >
                  Update
                </Button>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">•••• •••• •••• 4242</div>
                    <div className="text-slate-400 text-sm">Expires 12/26</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Billing email</span>
                  <span className="text-white">billing@techflow.com</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Next charge</span>
                  <span className="text-white">{formatCurrency(currentPlan.price)} on Jan 15, 2025</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 font-medium">Payment method verified</span>
                </div>
              </div>
            </Card>

            {/* Recent Invoices */}
            <Card variant="futuristic" padding="lg" className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Recent Invoices</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-400 hover:text-white"
                  onClick={() => window.location.href = '/billing/invoices'}
                >
                  View All
                </Button>
              </div>
              
              <div className="space-y-3">
                {invoices.slice(0, 4).map((invoice, index) => (
                  <div 
                    key={invoice.id} 
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 border border-white/10"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium">{invoice.id}</span>
                        {getInvoiceStatusBadge(invoice.status)}
                      </div>
                      <div className="text-slate-400 text-sm">
                        {formatDate(new Date(invoice.date))} • {formatCurrency(invoice.amount)}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-slate-400 hover:text-white ml-4"
                      onClick={() => handleDownloadInvoice(invoice.id)}
                      loading={downloadingInvoices.includes(invoice.id)}
                      disabled={downloadingInvoices.includes(invoice.id)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  size="sm" 
                  fullWidth 
                  leftIcon={<ExternalLink className="w-4 h-4" />}
                  onClick={handleViewBillingPortal}
                  className="text-slate-300 hover:text-white border-white/20 hover:border-white/40"
                >
                  View Billing Portal
                </Button>
              </div>
            </Card>
          </div>

          {/* Team Management Quick Access */}
          <Card variant="futuristic" padding="lg" className="mt-6 animate-slide-in-up">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Team Management</h3>
                <p className="text-slate-400">
                  Manage team members and their access levels
                </p>
              </div>
              <Button 
                variant="futuristic" 
                size="md"
                leftIcon={<Users className="w-4 h-4" />}
                onClick={handleManageTeam}
              >
                Manage Team
              </Button>
            </div>
          </Card>
        </main>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showUsageModal}
        onClose={() => setShowUsageModal(false)}
        title="Usage Details"
        size="lg"
      >
        <div className="space-y-6">
          <p className="text-slate-300">
            Detailed usage breakdown for the current billing period.
          </p>
          {/* Usage details content would go here */}
        </div>
      </Modal>

      {/* Billing Portal Demo Modal */}
      <Modal
        isOpen={showBillingPortalModal}
        onClose={() => setShowBillingPortalModal(false)}
        title="Billing Portal Demo"
        size="lg"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Billing Portal Demo
            </h3>
            <p className="text-slate-300 mb-6">
              This is a demo version of the billing portal. In production, this would redirect to the actual Stripe billing portal.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-blue-300 font-semibold mb-2">Demo Features:</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• View and download invoices</li>
              <li>• Update payment methods</li>
              <li>• Change subscription plans</li>
              <li>• View billing history</li>
              <li>• Manage payment preferences</li>
            </ul>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-300 font-semibold">Development Note</span>
            </div>
            <p className="text-slate-300 text-sm">
              In production, this button will redirect to the actual Stripe Customer Portal where users can manage their billing information securely.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <Button 
              variant="ghost" 
              onClick={() => setShowBillingPortalModal(false)}
              className="text-slate-400 hover:text-white"
            >
              Close
            </Button>
            <Button 
              variant="futuristic"
              onClick={() => {
                setShowBillingPortalModal(false);
                console.log('Demo billing portal accessed');
              }}
            >
              Continue to Demo Portal
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BillingPortal;