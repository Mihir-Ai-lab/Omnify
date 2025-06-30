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
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Filter,
  ChevronDown,
  Shield,
  Bell,
  Settings,
  FileText,
  FileSpreadsheet,
  FileImage
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

const BillingPortal: React.FC = () => {
  const [sidebarCollapsed, { toggle: toggleSidebar }] = useToggle(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');
  const [isChangingPlan, setIsChangingPlan] = useState(false);
  const [isCancellingSubscription, setIsCancellingSubscription] = useState(false);
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(false);
  const [isDownloadingInvoice, setIsDownloadingInvoice] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showPlanModal, { toggle: togglePlanModal }] = useToggle(false);
  const [showCancelModal, { toggle: toggleCancelModal }] = useToggle(false);
  const [showPaymentModal, { toggle: togglePaymentModal }] = useToggle(false);
  const [showUsageDetails, { toggle: toggleUsageDetails }] = useToggle(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const navigate = useNavigate();

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

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'pm_1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2026,
      isDefault: true
    },
    {
      id: 'pm_2',
      type: 'card',
      last4: '1234',
      brand: 'Mastercard',
      expiryMonth: 8,
      expiryYear: 2025,
      isDefault: false
    }
  ];

  const exportFormats = [
    { value: 'csv', label: 'CSV File', icon: FileText, description: 'Billing data in CSV format' },
    { value: 'excel', label: 'Excel File', icon: FileSpreadsheet, description: 'Formatted Excel spreadsheet' },
    { value: 'pdf', label: 'PDF Report', icon: FileImage, description: 'Complete billing report' },
  ];

  // Interactive Element Handlers with Error Handling
  const handleChangePlan = async (planId: string) => {
    try {
      setIsChangingPlan(true);
      setSelectedPlan(planId);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`Plan changed to: ${planId}`);
      alert(`Successfully changed to ${plans.find(p => p.id === planId)?.name} plan!`);
      togglePlanModal();
    } catch (error) {
      console.error('Plan change error:', error);
      alert('Failed to change plan. Please try again.');
    } finally {
      setIsChangingPlan(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setIsCancellingSubscription(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Subscription cancelled');
      alert('Subscription has been cancelled. You will retain access until the end of your billing period.');
      toggleCancelModal();
    } catch (error) {
      console.error('Cancellation error:', error);
      alert('Failed to cancel subscription. Please contact support.');
    } finally {
      setIsCancellingSubscription(false);
    }
  };

  const handleUpdatePaymentMethod = async () => {
    try {
      setIsUpdatingPayment(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Payment method updated');
      alert('Payment method updated successfully!');
      togglePaymentModal();
    } catch (error) {
      console.error('Payment update error:', error);
      alert('Failed to update payment method. Please try again.');
    } finally {
      setIsUpdatingPayment(false);
    }
  };

  const handleDownloadInvoice = async (invoiceId: string) => {
    try {
      setIsDownloadingInvoice(invoiceId);
      
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Downloading invoice: ${invoiceId}`);
      
      // Create mock download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `invoice-${invoiceId}.pdf`;
      link.click();
      
      alert(`Invoice ${invoiceId} downloaded successfully!`);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download invoice. Please try again.');
    } finally {
      setIsDownloadingInvoice(null);
    }
  };

  const handleExport = async (format: string) => {
    try {
      setIsExporting(true);
      setShowExportDropdown(false);
      
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `billing-data-${timestamp}.${format}`;
      
      console.log(`Exporting ${format.toUpperCase()} file: ${filename}`);
      
      // Create mock download
      const link = document.createElement('a');
      link.href = '#';
      link.download = filename;
      link.click();
      
      alert(`Billing data exported as ${format.toUpperCase()} successfully!`);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      setLastUpdated(new Date());
      
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Billing data refreshed');
    } catch (error) {
      console.error('Refresh error:', error);
      alert('Failed to refresh data. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleNavigateToBillingPortal = () => {
    try {
      // In a real app, this would open Stripe's billing portal
      window.open('https://billing.stripe.com/p/login/test_123', '_blank');
      console.log('Navigating to external billing portal');
    } catch (error) {
      console.error('Navigation error:', error);
      alert('Unable to open billing portal. Please try again.');
    }
  };

  const handleViewAllInvoices = () => {
    try {
      navigate('/billing/invoices');
      console.log('Navigating to invoices page');
    } catch (error) {
      console.error('Navigation error:', error);
      alert('Unable to navigate to invoices. Please try again.');
    }
  };

  const handleManageTeam = () => {
    try {
      navigate('/team');
      console.log('Navigating to team management');
    } catch (error) {
      console.error('Navigation error:', error);
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
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="text-slate-400 hover:text-white"
              >
                Refresh
              </Button>
              
              {/* Export Dropdown */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  leftIcon={<Download className="w-4 h-4" />}
                  rightIcon={<ChevronDown className="w-4 h-4" />}
                  loading={isExporting}
                  onClick={() => setShowExportDropdown(!showExportDropdown)}
                  className="text-slate-400 hover:text-white"
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
              
              <Button 
                variant="futuristic" 
                size="sm" 
                leftIcon={<CreditCard className="w-4 h-4" />}
                onClick={togglePaymentModal}
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
                    onClick={togglePlanModal}
                    loading={isChangingPlan}
                  >
                    Change Plan
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    fullWidth 
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={toggleCancelModal}
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
                  onClick={toggleUsageDetails}
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
                          {key === 'apiCalls' ? 'API Calls' : key === 'teamMembers' ? 'Team Members' : key}
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
                      {percentage >= 80 && (
                        <div className="flex items-center space-x-1 text-xs text-yellow-400">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Approaching limit</span>
                        </div>
                      )}
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
                  Your usage is 15% higher than last month. 
                  <button 
                    onClick={handleManageTeam}
                    className="text-blue-400 hover:text-blue-300 ml-1 underline"
                  >
                    Manage team access
                  </button>
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
                  className={`relative p-6 rounded-2xl border transition-all duration-300 hover:scale-105 cursor-pointer ${
                    plan.popular 
                      ? 'border-blue-500 bg-gradient-to-br from-blue-500/10 to-teal-500/10' 
                      : 'border-white/20 bg-white/5'
                  } ${plan.current ? 'ring-2 ring-green-500' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => !plan.current && handleChangePlan(plan.id)}
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
                    {billingInterval === 'year' && (
                      <div className="text-green-400 text-sm mt-1">
                        Save {formatCurrency((plan.price * 12) - (plan.price * 10))} annually
                      </div>
                    )}
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
                    disabled={plan.current || isChangingPlan}
                    loading={isChangingPlan && selectedPlan === plan.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!plan.current) handleChangePlan(plan.id);
                    }}
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
                <h3 className="text-xl font-semibold text-white">Payment Methods</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-400 hover:text-white"
                  onClick={togglePaymentModal}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New
                </Button>
              </div>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {method.brand} •••• {method.last4}
                          </div>
                          <div className="text-slate-400 text-sm">
                            Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.isDefault && (
                          <Badge variant="primary" size="sm">Default</Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-white"
                          onClick={() => console.log(`Edit payment method: ${method.id}`)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        {!method.isDefault && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300"
                            onClick={() => console.log(`Delete payment method: ${method.id}`)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-3">
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
                  onClick={handleViewAllInvoices}
                  rightIcon={<ArrowUpRight className="w-4 h-4" />}
                >
                  View All
                </Button>
              </div>
              
              <div className="space-y-3">
                {invoices.slice(0, 4).map((invoice, index) => (
                  <div 
                    key={invoice.id} 
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium">{invoice.id}</span>
                        {getInvoiceStatusBadge(invoice.status)}
                      </div>
                      <div className="text-slate-400 text-sm">
                        {formatDate(new Date(invoice.date))} • {formatCurrency(invoice.amount)}
                      </div>
                      <div className="text-slate-500 text-xs mt-1">
                        {invoice.description}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-slate-400 hover:text-white ml-4"
                      onClick={() => handleDownloadInvoice(invoice.id)}
                      loading={isDownloadingInvoice === invoice.id}
                      disabled={invoice.status === 'failed'}
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
                  onClick={handleNavigateToBillingPortal}
                >
                  View Billing Portal
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>

      {/* Plan Change Modal */}
      <Modal
        isOpen={showPlanModal}
        onClose={togglePlanModal}
        title="Change Subscription Plan"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button 
              variant="ghost" 
              onClick={togglePlanModal} 
              className="text-slate-400 hover:text-white"
              disabled={isChangingPlan}
            >
              Cancel
            </Button>
            <Button 
              variant="futuristic" 
              onClick={() => selectedPlan && handleChangePlan(selectedPlan)}
              loading={isChangingPlan}
              disabled={!selectedPlan}
            >
              Confirm Change
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-slate-300">
            Select a new plan for your subscription. Changes will take effect at the next billing cycle.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.filter(p => !p.current).map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  selectedPlan === plan.id
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <div className="font-semibold text-white">{plan.name}</div>
                <div className="text-slate-400">{formatCurrency(plan.price)}/{plan.interval}</div>
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {/* Cancel Subscription Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={toggleCancelModal}
        title="Cancel Subscription"
        footer={
          <div className="flex justify-end space-x-3">
            <Button 
              variant="ghost" 
              onClick={toggleCancelModal} 
              className="text-slate-400 hover:text-white"
              disabled={isCancellingSubscription}
            >
              Keep Subscription
            </Button>
            <Button 
              variant="danger" 
              onClick={handleCancelSubscription}
              loading={isCancellingSubscription}
            >
              Cancel Subscription
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
            <div>
              <div className="text-red-300 font-semibold">Are you sure?</div>
              <div className="text-red-200 text-sm">This action cannot be undone.</div>
            </div>
          </div>
          
          <p className="text-slate-300">
            Your subscription will be cancelled and you'll lose access to Pro features at the end of your current billing period 
            ({formatDate(new Date(currentPlan.nextBilling))}).
          </p>
          
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-white font-medium mb-2">You'll lose access to:</div>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Advanced analytics and reporting</li>
              <li>• Priority customer support</li>
              <li>• Team collaboration features</li>
              <li>• API access and integrations</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Payment Method Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={togglePaymentModal}
        title="Update Payment Method"
        footer={
          <div className="flex justify-end space-x-3">
            <Button 
              variant="ghost" 
              onClick={togglePaymentModal} 
              className="text-slate-400 hover:text-white"
              disabled={isUpdatingPayment}
            >
              Cancel
            </Button>
            <Button 
              variant="futuristic" 
              onClick={handleUpdatePaymentMethod}
              loading={isUpdatingPayment}
            >
              Update Payment Method
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-slate-300">
            Add or update your payment method. This will be used for future billing cycles.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="setDefault"
                className="w-4 h-4 text-blue-600 border-white/20 rounded focus:ring-blue-500 bg-white/10"
              />
              <label htmlFor="setDefault" className="text-slate-300 text-sm">
                Set as default payment method
              </label>
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-medium">Secure Payment</span>
            </div>
            <p className="text-blue-200 text-sm mt-1">
              Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      </Modal>

      {/* Usage Details Modal */}
      <Modal
        isOpen={showUsageDetails}
        onClose={toggleUsageDetails}
        title="Detailed Usage Information"
        size="lg"
      >
        <div className="space-y-6">
          {Object.entries(usage).map(([key, data]) => {
            const percentage = getUsagePercentage(data.used, data.limit);
            const color = getUsageColor(percentage);
            
            return (
              <div key={key} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium capitalize">
                    {key === 'apiCalls' ? 'API Calls' : key === 'teamMembers' ? 'Team Members' : key}
                  </h4>
                  <Badge 
                    variant={color === 'green' ? 'success' : color === 'yellow' ? 'warning' : 'error'} 
                    size="sm"
                  >
                    {percentage.toFixed(1)}% used
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Current usage</span>
                    <span className="text-white">
                      {key === 'storage' ? `${data.used}GB` : data.used.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Plan limit</span>
                    <span className="text-white">
                      {key === 'storage' ? `${data.limit}GB` : data.limit.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full bg-gradient-to-r transition-all duration-300 ${
                        color === 'red' ? 'from-red-500 to-red-600' :
                        color === 'yellow' ? 'from-yellow-500 to-yellow-600' :
                        'from-green-500 to-green-600'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Bell className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-medium">Usage Alerts</span>
            </div>
            <p className="text-blue-200 text-sm">
              We'll notify you when you reach 80% and 95% of your plan limits.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BillingPortal;