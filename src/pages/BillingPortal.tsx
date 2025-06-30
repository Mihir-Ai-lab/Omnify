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
  const [isNavigatingToBillingPortal, setIsNavigatingToBillingPortal] = useState(false);
  
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

  // Enhanced Interactive Element Handlers with Comprehensive Error Handling
  const handleChangePlan = async (planId: string) => {
    try {
      setIsChangingPlan(true);
      setSelectedPlan(planId);
      
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedPlanName = plans.find(p => p.id === planId)?.name;
      console.log(`✅ Plan changed successfully to: ${planId} (${selectedPlanName})`);
      
      // Show success feedback
      const successMessage = `Successfully upgraded to ${selectedPlanName} plan! Changes will take effect on your next billing cycle.`;
      alert(successMessage);
      
      togglePlanModal();
      
      // Refresh data to reflect changes
      setLastUpdated(new Date());
      
    } catch (error) {
      console.error('❌ Plan change error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to change plan: ${errorMessage}. Please try again or contact support.`);
    } finally {
      setIsChangingPlan(false);
      setSelectedPlan(null);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setIsCancellingSubscription(true);
      
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      console.log('✅ Subscription cancelled successfully');
      
      const cancelMessage = `Your subscription has been cancelled successfully. You will retain access to Pro features until ${formatDate(new Date(currentPlan.nextBilling))}.`;
      alert(cancelMessage);
      
      toggleCancelModal();
      
      // Update UI to reflect cancellation
      setLastUpdated(new Date());
      
    } catch (error) {
      console.error('❌ Subscription cancellation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to cancel subscription: ${errorMessage}. Please contact support for assistance.`);
    } finally {
      setIsCancellingSubscription(false);
    }
  };

  const handleUpdatePaymentMethod = async () => {
    try {
      setIsUpdatingPayment(true);
      
      // Simulate API call with validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('✅ Payment method updated successfully');
      alert('Payment method updated successfully! Your new payment method will be used for future billing cycles.');
      
      togglePaymentModal();
      setLastUpdated(new Date());
      
    } catch (error) {
      console.error('❌ Payment method update error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to update payment method: ${errorMessage}. Please verify your card details and try again.`);
    } finally {
      setIsUpdatingPayment(false);
    }
  };

  const handleDownloadInvoice = async (invoiceId: string) => {
    try {
      setIsDownloadingInvoice(invoiceId);
      
      // Find the invoice details
      const invoice = invoices.find(inv => inv.id === invoiceId);
      if (!invoice) {
        throw new Error('Invoice not found');
      }
      
      if (invoice.status === 'failed') {
        throw new Error('Cannot download failed invoice');
      }
      
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      console.log(`✅ Downloading invoice: ${invoiceId}`);
      
      // Create mock download with proper filename
      const filename = `omnify-invoice-${invoiceId}-${formatDate(new Date(invoice.date)).replace(/\s+/g, '-')}.pdf`;
      
      // In a real application, this would be an actual file download
      const link = document.createElement('a');
      link.href = invoice.downloadUrl || '#';
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`📄 Invoice ${invoiceId} downloaded as: ${filename}`);
      
    } catch (error) {
      console.error('❌ Invoice download error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to download invoice: ${errorMessage}. Please try again or contact support.`);
    } finally {
      setIsDownloadingInvoice(null);
    }
  };

  const handleExport = async (format: string) => {
    try {
      setIsExporting(true);
      setShowExportDropdown(false);
      
      // Validate export format
      const validFormats = ['csv', 'excel', 'pdf'];
      if (!validFormats.includes(format)) {
        throw new Error(`Unsupported export format: ${format}`);
      }
      
      // Simulate export process with progress
      console.log(`🔄 Starting ${format.toUpperCase()} export...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `omnify-billing-data-${timestamp}.${format}`;
      
      // Prepare export data
      const exportData = {
        period: 'All Time',
        currentPlan: currentPlan,
        usage: usage,
        invoices: invoices,
        paymentMethods: paymentMethods.map(pm => ({
          id: pm.id,
          type: pm.type,
          last4: pm.last4,
          brand: pm.brand,
          isDefault: pm.isDefault
        })),
        exportedAt: new Date().toISOString(),
        exportFormat: format.toUpperCase()
      };
      
      console.log(`📊 Export data prepared:`, exportData);
      
      // Create mock download
      const link = document.createElement('a');
      link.href = '#';
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`✅ Billing data exported successfully as: ${filename}`);
      alert(`Billing data exported as ${format.toUpperCase()} successfully! File: ${filename}`);
      
    } catch (error) {
      console.error('❌ Export error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to export data: ${errorMessage}. Please try again or contact support.`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      setLastUpdated(new Date());
      
      // Simulate data refresh with multiple API calls
      console.log('🔄 Refreshing billing data...');
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      console.log('✅ Billing data refreshed successfully');
      
      // Optional: Show subtle success feedback
      setTimeout(() => {
        console.log('📊 All billing information is now up to date');
      }, 100);
      
    } catch (error) {
      console.error('❌ Data refresh error:', error);
      alert('Failed to refresh billing data. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  };

  // 🔧 ENHANCED BILLING PORTAL NAVIGATION - COMPREHENSIVE FIX
  const handleNavigateToBillingPortal = async () => {
    try {
      setIsNavigatingToBillingPortal(true);
      console.log('🔄 Initiating billing portal navigation...');
      
      // Comprehensive browser compatibility checks
      if (typeof window === 'undefined') {
        throw new Error('Window object not available - running in non-browser environment');
      }

      if (!window.open) {
        throw new Error('Browser does not support window.open functionality');
      }

      // Check for popup blocker by testing window.open
      console.log('🔍 Testing popup blocker...');
      const testWindow = window.open('', '_blank', 'width=1,height=1');
      if (!testWindow) {
        throw new Error('Popup blocked by browser. Please allow popups for this site and try again.');
      }
      
      // Close test window immediately
      testWindow.close();
      console.log('✅ Popup test successful');

      // Simulate API call to get secure billing portal URL
      console.log('🔄 Fetching billing portal URL...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In production, this would be a dynamic URL from your backend
      // For demo purposes, using a placeholder URL
      const billingPortalUrl = 'https://billing.stripe.com/p/login/test_omnify_demo_portal';
      
      console.log('🔗 Billing portal URL obtained:', billingPortalUrl);
      
      // Enhanced window.open with comprehensive options
      const windowFeatures = [
        'noopener=yes',
        'noreferrer=yes',
        'width=1200',
        'height=800',
        'scrollbars=yes',
        'resizable=yes',
        'status=yes',
        'toolbar=yes',
        'menubar=yes',
        'location=yes'
      ].join(',');
      
      console.log('🚀 Opening billing portal with features:', windowFeatures);
      
      // Open billing portal in new tab/window
      const billingWindow = window.open(billingPortalUrl, '_blank', windowFeatures);
      
      if (!billingWindow) {
        throw new Error('Failed to open billing portal window. Please check your browser\'s popup settings.');
      }

      // Focus the new window (if allowed by browser)
      try {
        billingWindow.focus();
        console.log('✅ Billing portal window focused');
      } catch (focusError) {
        console.warn('⚠️ Could not focus billing portal window:', focusError);
        // This is not critical, continue execution
      }
      
      console.log('✅ Billing portal opened successfully');
      
      // Optional: Track the event for analytics
      setTimeout(() => {
        console.log('📊 Billing portal navigation event tracked');
      }, 100);
      
      // Optional: Show success feedback to user
      setTimeout(() => {
        console.log('💡 User feedback: Billing portal opened in new tab');
      }, 200);
      
    } catch (error) {
      console.error('❌ Billing portal navigation error:', error);
      
      // Provide specific, actionable error messages
      let userMessage = 'Unable to open billing portal. ';
      let fallbackAction = '';
      
      if (error instanceof Error) {
        const errorMsg = error.message.toLowerCase();
        
        if (errorMsg.includes('popup blocked') || errorMsg.includes('popup')) {
          userMessage += 'Your browser is blocking popups. Please:\n\n1. Allow popups for this site\n2. Try again\n3. Or manually navigate to the billing portal';
          fallbackAction = 'copy-url';
        } else if (errorMsg.includes('browser does not support') || errorMsg.includes('window object')) {
          userMessage += 'Your browser does not support this feature. Please try:\n\n1. Using a modern browser (Chrome, Firefox, Safari, Edge)\n2. Updating your current browser\n3. Manually navigating to the billing portal';
          fallbackAction = 'copy-url';
        } else if (errorMsg.includes('failed to open')) {
          userMessage += 'The billing portal window could not be opened. This might be due to:\n\n1. Browser security settings\n2. Ad blockers\n3. Privacy extensions\n\nPlease try disabling these temporarily or use the manual link below.';
          fallbackAction = 'copy-url';
        } else {
          userMessage += error.message;
          fallbackAction = 'copy-url';
        }
      } else {
        userMessage += 'An unexpected error occurred. Please try again or contact support.';
        fallbackAction = 'copy-url';
      }
      
      // Show detailed error message
      alert(userMessage);
      
      // Fallback: Copy URL to clipboard
      if (fallbackAction === 'copy-url') {
        try {
          const fallbackUrl = 'https://billing.stripe.com/p/login/test_omnify_demo_portal';
          
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(fallbackUrl);
            console.log('📋 Billing portal URL copied to clipboard');
            alert('Billing portal URL has been copied to your clipboard. Please paste it in a new browser tab to access your billing information.');
          } else {
            // Fallback for older browsers
            console.log('📋 Clipboard API not available, showing URL to user');
            prompt('Please copy this URL and paste it in a new browser tab:', fallbackUrl);
          }
        } catch (clipboardError) {
          console.error('❌ Clipboard fallback error:', clipboardError);
          alert('Please manually navigate to: https://billing.stripe.com/p/login/test_omnify_demo_portal');
        }
      }
      
    } finally {
      setIsNavigatingToBillingPortal(false);
      console.log('🏁 Billing portal navigation process completed');
    }
  };

  // Enhanced Navigation Handlers with Error Handling
  const handleViewAllInvoices = () => {
    try {
      console.log('🔄 Navigating to invoices page...');
      navigate('/billing/invoices');
      console.log('✅ Navigation to invoices initiated');
    } catch (error) {
      console.error('❌ Navigation error to invoices:', error);
      alert('Unable to navigate to invoices page. Please refresh the page and try again.');
    }
  };

  const handleManageTeam = () => {
    try {
      console.log('🔄 Navigating to team management...');
      navigate('/team');
      console.log('✅ Navigation to team management initiated');
    } catch (error) {
      console.error('❌ Navigation error to team management:', error);
      alert('Unable to navigate to team management. Please refresh the page and try again.');
    }
  };

  // Utility Functions
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
                      title={invoice.status === 'failed' ? 'Cannot download failed invoice' : `Download ${invoice.id}`}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                {/* 🎯 ENHANCED BILLING PORTAL BUTTON - MAIN FIX */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  fullWidth 
                  leftIcon={<ExternalLink className="w-4 h-4" />}
                  onClick={handleNavigateToBillingPortal}
                  loading={isNavigatingToBillingPortal}
                  disabled={isNavigatingToBillingPortal}
                  className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-200"
                  aria-label="Open external billing portal in new tab"
                  title="Open Stripe billing portal in a new tab to manage your subscription, payment methods, and download invoices"
                >
                  {isNavigatingToBillingPortal ? (
                    <>
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Opening Portal...
                    </>
                  ) : (
                    'View Billing Portal'
                  )}
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