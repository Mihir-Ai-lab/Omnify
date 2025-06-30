import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Eye,
  ArrowUpDown,
  ChevronDown
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import { useToggle } from '../hooks/useToggle';
import { formatCurrency, formatDate } from '../utils/formatters';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  description: string;
  downloadUrl: string;
  paymentMethod: string;
  dueDate?: string;
}

const InvoiceList: React.FC = () => {
  const [sidebarCollapsed, { toggle: toggleSidebar }] = useToggle(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [downloadingInvoices, setDownloadingInvoices] = useState<string[]>([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const navigate = useNavigate();
  const itemsPerPage = 10;

  // Mock invoice data - in production this would come from an API
  const allInvoices: Invoice[] = [
    {
      id: 'INV-2024-001',
      date: '2024-12-01T00:00:00Z',
      amount: 299,
      status: 'paid',
      description: 'Pro Plan - December 2024',
      downloadUrl: '#',
      paymentMethod: 'Visa ****4242'
    },
    {
      id: 'INV-2024-002',
      date: '2024-11-01T00:00:00Z',
      amount: 299,
      status: 'paid',
      description: 'Pro Plan - November 2024',
      downloadUrl: '#',
      paymentMethod: 'Visa ****4242'
    },
    {
      id: 'INV-2024-003',
      date: '2024-10-01T00:00:00Z',
      amount: 299,
      status: 'paid',
      description: 'Pro Plan - October 2024',
      downloadUrl: '#',
      paymentMethod: 'Visa ****4242'
    },
    {
      id: 'INV-2024-004',
      date: '2024-09-01T00:00:00Z',
      amount: 299,
      status: 'failed',
      description: 'Pro Plan - September 2024',
      downloadUrl: '#',
      paymentMethod: 'Visa ****4242',
      dueDate: '2024-09-15T00:00:00Z'
    },
    {
      id: 'INV-2024-005',
      date: '2024-08-01T00:00:00Z',
      amount: 299,
      status: 'paid',
      description: 'Pro Plan - August 2024',
      downloadUrl: '#',
      paymentMethod: 'Visa ****4242'
    },
    {
      id: 'INV-2024-006',
      date: '2024-07-01T00:00:00Z',
      amount: 299,
      status: 'refunded',
      description: 'Pro Plan - July 2024',
      downloadUrl: '#',
      paymentMethod: 'Visa ****4242'
    },
    {
      id: 'INV-2024-007',
      date: '2024-06-01T00:00:00Z',
      amount: 99,
      status: 'paid',
      description: 'Starter Plan - June 2024',
      downloadUrl: '#',
      paymentMethod: 'Visa ****4242'
    },
    {
      id: 'INV-2024-008',
      date: '2024-05-01T00:00:00Z',
      amount: 99,
      status: 'paid',
      description: 'Starter Plan - May 2024',
      downloadUrl: '#',
      paymentMethod: 'Visa ****4242'
    },
    {
      id: 'INV-2024-009',
      date: '2024-04-01T00:00:00Z',
      amount: 99,
      status: 'pending',
      description: 'Starter Plan - April 2024',
      downloadUrl: '#',
      paymentMethod: 'Visa ****4242',
      dueDate: '2024-04-15T00:00:00Z'
    },
    {
      id: 'INV-2024-010',
      date: '2024-03-01T00:00:00Z',
      amount: 99,
      status: 'paid',
      description: 'Starter Plan - March 2024',
      downloadUrl: '#',
      paymentMethod: 'Visa ****4242'
    },
    // Add more mock invoices for pagination testing
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `INV-2024-${String(i + 11).padStart(3, '0')}`,
      date: new Date(2024, 1, i + 1).toISOString(),
      amount: Math.random() > 0.5 ? 299 : 99,
      status: ['paid', 'pending', 'failed'][Math.floor(Math.random() * 3)] as 'paid' | 'pending' | 'failed',
      description: `${Math.random() > 0.5 ? 'Pro' : 'Starter'} Plan - ${new Date(2024, 1, i + 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
      downloadUrl: '#',
      paymentMethod: 'Visa ****4242'
    }))
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses', count: allInvoices.length },
    { value: 'paid', label: 'Paid', count: allInvoices.filter(i => i.status === 'paid').length },
    { value: 'pending', label: 'Pending', count: allInvoices.filter(i => i.status === 'pending').length },
    { value: 'failed', label: 'Failed', count: allInvoices.filter(i => i.status === 'failed').length },
    { value: 'refunded', label: 'Refunded', count: allInvoices.filter(i => i.status === 'refunded').length },
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' },
    { value: '1y', label: 'Last Year' },
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'amount', label: 'Amount' },
    { value: 'status', label: 'Status' },
    { value: 'id', label: 'Invoice ID' },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort invoices
  const filteredAndSortedInvoices = React.useMemo(() => {
    let filtered = allInvoices.filter(invoice => {
      const matchesSearch = invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           invoice.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
      
      let matchesDateRange = true;
      if (selectedDateRange !== 'all') {
        const invoiceDate = new Date(invoice.date);
        const now = new Date();
        const daysAgo = {
          '30d': 30,
          '90d': 90,
          '1y': 365
        }[selectedDateRange] || 0;
        const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
        matchesDateRange = invoiceDate >= cutoffDate;
      }
      
      return matchesSearch && matchesStatus && matchesDateRange;
    });

    // Sort invoices
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Invoice];
      let bValue: any = b[sortBy as keyof Invoice];
      
      if (sortBy === 'date') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (sortBy === 'amount') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [allInvoices, searchQuery, selectedStatus, selectedDateRange, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredAndSortedInvoices.slice(startIndex, startIndex + itemsPerPage);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setLastUpdated(new Date());
    
    // Simulate API refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsRefreshing(false);
    console.log('Invoice data refreshed');
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

  const handleViewInvoice = (invoiceId: string) => {
    try {
      navigate(`/billing/invoices/${invoiceId}`);
    } catch (error) {
      console.error('Navigation error:', error);
      alert('Unable to view invoice details. Please try again.');
    }
  };

  const handleSortChange = (newSortBy: string) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
    setShowSortDropdown(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success" size="sm">Paid</Badge>;
      case 'pending':
        return <Badge variant="warning" size="sm">Pending</Badge>;
      case 'failed':
        return <Badge variant="error" size="sm">Failed</Badge>;
      case 'refunded':
        return <Badge variant="neutral" size="sm">Refunded</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Unknown</Badge>;
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
            i === currentPage
              ? 'bg-blue-500 text-white'
              : 'text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-slate-400">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedInvoices.length)} of {filteredAndSortedInvoices.length} invoices
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
            className="text-slate-400 hover:text-white"
          >
            Previous
          </Button>
          
          <div className="flex space-x-1">
            {pages}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            rightIcon={<ChevronRight className="w-4 h-4" />}
            className="text-slate-400 hover:text-white"
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Loading invoices...</p>
        </div>
      </div>
    );
  }

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
              <div className="flex items-center space-x-4 mb-2">
                <Link to="/billing">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    leftIcon={<ChevronLeft className="w-4 h-4" />}
                    className="text-slate-400 hover:text-white"
                  >
                    Back to Billing
                  </Button>
                </Link>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Invoice History
              </h1>
              <p className="text-slate-300 text-lg">
                View and manage all your billing invoices
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()} • Total: {filteredAndSortedInvoices.length} invoices
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
              
              <Button 
                variant="futuristic" 
                size="sm" 
                leftIcon={<Download className="w-4 h-4" />}
                onClick={() => console.log('Export all invoices')}
              >
                Export All
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { 
                label: 'Total Invoices', 
                value: allInvoices.length, 
                icon: FileText, 
                color: 'blue',
                description: 'All time'
              },
              { 
                label: 'Paid Invoices', 
                value: allInvoices.filter(i => i.status === 'paid').length, 
                icon: CheckCircle, 
                color: 'green',
                description: 'Successfully processed'
              },
              { 
                label: 'Pending/Failed', 
                value: allInvoices.filter(i => ['pending', 'failed'].includes(i.status)).length, 
                icon: Clock, 
                color: 'yellow',
                description: 'Requires attention'
              },
              { 
                label: 'Total Amount', 
                value: formatCurrency(allInvoices.reduce((sum, i) => sum + i.amount, 0)), 
                icon: FileText, 
                color: 'purple',
                description: 'All invoices'
              },
            ].map((stat, index) => (
              <Card 
                key={stat.label} 
                variant="futuristic" 
                padding="lg" 
                hover 
                className="animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-slate-500 text-xs">{stat.description}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Filters and Search */}
          <Card variant="futuristic" padding="lg" className="mb-6 animate-slide-in-up">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Status Filters */}
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => {
                      setSelectedStatus(status.value);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedStatus === status.value
                        ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg neon-blue'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/20'
                    }`}
                  >
                    {status.label} ({status.count})
                  </button>
                ))}
              </div>
              
              {/* Search and Controls */}
              <div className="flex items-center space-x-4">
                <Input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  leftIcon={<Search className="w-4 h-4" />}
                  className="w-64"
                  variant="futuristic"
                />
                
                {/* Date Range Filter */}
                <select
                  value={selectedDateRange}
                  onChange={(e) => {
                    setSelectedDateRange(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                >
                  {dateRangeOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-slate-800 text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
                
                {/* Sort Dropdown */}
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    leftIcon={<ArrowUpDown className="w-4 h-4" />}
                    rightIcon={<ChevronDown className="w-4 h-4" />}
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="text-slate-400 hover:text-white"
                  >
                    Sort by {sortOptions.find(o => o.value === sortBy)?.label}
                  </Button>
                  
                  {showSortDropdown && (
                    <div className="absolute right-0 mt-2 w-48 glass-dark rounded-xl shadow-xl border border-white/10 py-1 z-50 animate-slide-in-up">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSortChange(option.value)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                            sortBy === option.value
                              ? 'text-blue-400 bg-blue-500/10'
                              : 'text-slate-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {option.label} {sortBy === option.value && (sortOrder === 'asc' ? '↑' : '↓')}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Invoices Table */}
          <Card variant="futuristic" padding="none" className="overflow-hidden animate-slide-in-up">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">Invoice ID</th>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">Date</th>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">Description</th>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">Amount</th>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">Payment Method</th>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvoices.map((invoice, index) => (
                    <tr 
                      key={invoice.id} 
                      className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 animate-slide-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="py-4 px-6">
                        <div className="font-medium text-white">{invoice.id}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-slate-300">
                          {formatDate(new Date(invoice.date))}
                        </div>
                        {invoice.dueDate && (
                          <div className="text-xs text-slate-500">
                            Due: {formatDate(new Date(invoice.dueDate))}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-slate-300">{invoice.description}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-white">
                          {formatCurrency(invoice.amount)}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(invoice.status)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-slate-400 text-sm">{invoice.paymentMethod}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-slate-400 hover:text-white"
                            onClick={() => handleViewInvoice(invoice.id)}
                            leftIcon={<Eye className="w-4 h-4" />}
                            aria-label={`View invoice ${invoice.id}`}
                          >
                            View
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-slate-400 hover:text-white"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                            loading={downloadingInvoices.includes(invoice.id)}
                            disabled={downloadingInvoices.includes(invoice.id)}
                            leftIcon={<Download className="w-4 h-4" />}
                            aria-label={`Download invoice ${invoice.id}`}
                          >
                            Download
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredAndSortedInvoices.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="text-slate-300 mb-4 text-lg">
                  {searchQuery || selectedStatus !== 'all' || selectedDateRange !== 'all' 
                    ? 'No invoices match your filters.' 
                    : 'No invoices found.'}
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedStatus('all');
                    setSelectedDateRange('all');
                    setCurrentPage(1);
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredAndSortedInvoices.length > 0 && renderPagination()}
          </Card>
        </main>
      </div>
    </div>
  );
};

export default InvoiceList;