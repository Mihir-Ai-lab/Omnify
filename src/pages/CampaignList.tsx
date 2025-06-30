import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Play,
  Pause,
  Copy,
  Trash2,
  Edit,
  ExternalLink,
  Target,
  TrendingUp,
  TrendingDown,
  Zap,
  BarChart3,
  DollarSign,
  Eye
} from 'lucide-react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useToggle } from '../hooks/useToggle';
import { formatCurrency, formatDate } from '../utils/formatters';

interface Campaign {
  id: number;
  name: string;
  channel: string;
  budget: number;
  spent: number;
  roas: number;
  status: 'active' | 'paused' | 'completed' | 'draft';
  performance: 'excellent' | 'good' | 'poor';
  createdAt: string;
  lastModified: string;
  impressions: number;
  clicks: number;
  conversions: number;
}

const CampaignList: React.FC = () => {
  const [sidebarCollapsed, { toggle: toggleSidebar }] = useToggle(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDeleteModalOpen, { toggle: toggleDeleteModal }] = useToggle(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const campaigns: Campaign[] = [
    {
      id: 1,
      name: 'Holiday Sale 2024 - Black Friday Special',
      channel: 'Meta Ads',
      budget: 15000,
      spent: 12450,
      roas: 3.8,
      status: 'active',
      performance: 'good',
      createdAt: '2024-11-15T10:00:00Z',
      lastModified: '2024-12-01T14:30:00Z',
      impressions: 245000,
      clicks: 8750,
      conversions: 342,
    },
    {
      id: 2,
      name: 'Product Launch - Q1 2025',
      channel: 'Google Ads',
      budget: 25000,
      spent: 18200,
      roas: 2.1,
      status: 'active',
      performance: 'poor',
      createdAt: '2024-11-20T09:15:00Z',
      lastModified: '2024-12-01T16:45:00Z',
      impressions: 180000,
      clicks: 5400,
      conversions: 156,
    },
    {
      id: 3,
      name: 'Retargeting Campaign - Abandoned Cart',
      channel: 'TikTok Ads',
      budget: 8000,
      spent: 7850,
      roas: 5.2,
      status: 'active',
      performance: 'excellent',
      createdAt: '2024-11-25T11:30:00Z',
      lastModified: '2024-12-01T12:20:00Z',
      impressions: 95000,
      clicks: 4750,
      conversions: 287,
    },
    {
      id: 4,
      name: 'Brand Awareness - Winter Collection',
      channel: 'LinkedIn Ads',
      budget: 5000,
      spent: 3200,
      roas: 1.8,
      status: 'paused',
      performance: 'poor',
      createdAt: '2024-11-10T08:45:00Z',
      lastModified: '2024-11-28T10:15:00Z',
      impressions: 65000,
      clicks: 1950,
      conversions: 89,
    },
    {
      id: 5,
      name: 'Email Nurture Sequence',
      channel: 'Email Marketing',
      budget: 2000,
      spent: 1850,
      roas: 4.5,
      status: 'completed',
      performance: 'excellent',
      createdAt: '2024-10-15T14:20:00Z',
      lastModified: '2024-11-30T09:30:00Z',
      impressions: 45000,
      clicks: 2250,
      conversions: 198,
    },
    {
      id: 6,
      name: 'New Customer Acquisition',
      channel: 'Google Ads',
      budget: 12000,
      spent: 0,
      roas: 0,
      status: 'draft',
      performance: 'good',
      createdAt: '2024-12-01T16:00:00Z',
      lastModified: '2024-12-01T16:00:00Z',
      impressions: 0,
      clicks: 0,
      conversions: 0,
    },
  ];

  const filters = [
    { value: 'all', label: 'All Campaigns', count: campaigns.length },
    { value: 'active', label: 'Active', count: campaigns.filter(c => c.status === 'active').length },
    { value: 'paused', label: 'Paused', count: campaigns.filter(c => c.status === 'paused').length },
    { value: 'completed', label: 'Completed', count: campaigns.filter(c => c.status === 'completed').length },
    { value: 'draft', label: 'Draft', count: campaigns.filter(c => c.status === 'draft').length },
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.channel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || campaign.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm" dot>Active</Badge>;
      case 'paused':
        return <Badge variant="warning" size="sm" dot>Paused</Badge>;
      case 'completed':
        return <Badge variant="neutral" size="sm" dot>Completed</Badge>;
      case 'draft':
        return <Badge variant="secondary" size="sm" dot>Draft</Badge>;
      default:
        return <Badge variant="neutral" size="sm" dot>Unknown</Badge>;
    }
  };

  const getPerformanceBadge = (performance: Campaign['performance']) => {
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

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'meta ads':
        return <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">M</div>;
      case 'google ads':
        return <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">G</div>;
      case 'tiktok ads':
        return <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold">T</div>;
      case 'linkedin ads':
        return <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">L</div>;
      case 'email marketing':
        return <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">E</div>;
      default:
        return <Target className="w-6 h-6 text-slate-400" />;
    }
  };

  const handleDeleteCampaign = () => {
    console.log('Deleting campaign:', selectedCampaign?.id);
    toggleDeleteModal();
    setSelectedCampaign(null);
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCampaigns.map((campaign, index) => (
        <Card 
          key={campaign.id} 
          variant="futuristic" 
          padding="lg" 
          hover 
          glow
          className="animate-slide-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getChannelIcon(campaign.channel)}
              <div>
                <h3 className="font-semibold text-white text-lg truncate max-w-[200px]">
                  {campaign.name}
                </h3>
                <p className="text-slate-400 text-sm">{campaign.channel}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusBadge(campaign.status)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-xs text-slate-400">Budget</span>
              </div>
              <div className="text-white font-semibold">{formatCurrency(campaign.budget)}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-slate-400">ROAS</span>
              </div>
              <div className="text-white font-semibold">
                {campaign.roas > 0 ? `${campaign.roas.toFixed(1)}x` : '-'}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-slate-400">
              Spent: <span className="text-white font-medium">{formatCurrency(campaign.spent)}</span>
            </div>
            <div className="text-sm text-slate-400">
              {campaign.budget > 0 ? `${((campaign.spent / campaign.budget) * 100).toFixed(1)}% used` : '0% used'}
            </div>
          </div>

          <div className="flex items-center justify-between">
            {getPerformanceBadge(campaign.performance)}
            <div className="flex items-center space-x-2">
              {campaign.status === 'active' ? (
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <Pause className="w-4 h-4" />
                </Button>
              ) : campaign.status === 'paused' ? (
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <Play className="w-4 h-4" />
                </Button>
              ) : null}
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderTableView = () => (
    <Card variant="futuristic" padding="none" className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="text-left py-4 px-6 font-medium text-slate-300">Campaign</th>
              <th className="text-left py-4 px-6 font-medium text-slate-300">Channel</th>
              <th className="text-left py-4 px-6 font-medium text-slate-300">Budget</th>
              <th className="text-left py-4 px-6 font-medium text-slate-300">Spent</th>
              <th className="text-left py-4 px-6 font-medium text-slate-300">ROAS</th>
              <th className="text-left py-4 px-6 font-medium text-slate-300">Performance</th>
              <th className="text-left py-4 px-6 font-medium text-slate-300">Status</th>
              <th className="text-left py-4 px-6 font-medium text-slate-300">Last Modified</th>
              <th className="text-left py-4 px-6 font-medium text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.map((campaign, index) => (
              <tr 
                key={campaign.id} 
                className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 animate-slide-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    {getChannelIcon(campaign.channel)}
                    <div>
                      <div className="font-medium text-white mb-1">
                        {campaign.name}
                      </div>
                      <div className="text-sm text-slate-400">
                        Created {formatDate(new Date(campaign.createdAt))}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-slate-300 font-medium">
                    {campaign.channel}
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-300">
                  {formatCurrency(campaign.budget)}
                </td>
                <td className="py-4 px-6">
                  <div>
                    <div className="text-white font-medium">
                      {formatCurrency(campaign.spent)}
                    </div>
                    <div className="text-sm text-slate-400">
                      {campaign.budget > 0 ? `${((campaign.spent / campaign.budget) * 100).toFixed(1)}% used` : '0% used'}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">
                      {campaign.roas > 0 ? `${campaign.roas.toFixed(1)}x` : '-'}
                    </span>
                    {campaign.roas > 3 ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : campaign.roas > 0 && campaign.roas < 2 ? (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    ) : null}
                  </div>
                </td>
                <td className="py-4 px-6">
                  {getPerformanceBadge(campaign.performance)}
                </td>
                <td className="py-4 px-6">
                  {getStatusBadge(campaign.status)}
                </td>
                <td className="py-4 px-6 text-slate-400 text-sm">
                  {formatDate(new Date(campaign.lastModified))}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    {campaign.status === 'active' ? (
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <Pause className="w-4 h-4" />
                      </Button>
                    ) : campaign.status === 'paused' ? (
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <Play className="w-4 h-4" />
                      </Button>
                    ) : null}
                    
                    <div className="relative group">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                      
                      <div className="absolute right-0 top-full mt-1 w-48 glass-dark rounded-xl shadow-xl border border-white/10 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        <button className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors duration-200">
                          <Edit className="w-4 h-4 mr-3" />
                          Edit Campaign
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors duration-200">
                          <Copy className="w-4 h-4 mr-3" />
                          Duplicate
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors duration-200">
                          <ExternalLink className="w-4 h-4 mr-3" />
                          View Details
                        </button>
                        <hr className="my-1 border-white/10" />
                        <button 
                          onClick={() => {
                            setSelectedCampaign(campaign);
                            toggleDeleteModal();
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4 mr-3" />
                          Delete Campaign
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div className="text-slate-300 mb-4 text-lg">
            {searchQuery ? 'No campaigns match your search.' : 'No campaigns found.'}
          </div>
          <Button variant="futuristic" leftIcon={<Plus className="w-4 h-4" />}>
            <a href="/campaigns/new">
              Create Your First Campaign
            </a>
          </Button>
        </div>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        currentPath="/campaigns"
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
                Campaigns
              </h1>
              <p className="text-slate-300 text-lg">
                Manage and optimize your marketing campaigns across all channels.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0 animate-slide-in-right">
              <Button 
                variant="futuristic" 
                size="md"
                leftIcon={<Plus className="w-4 h-4" />}
                glow
              >
                <a href="/campaigns/new" className="flex items-center">
                  Create Campaign
                </a>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Campaigns', value: campaigns.length, icon: Target, color: 'blue' },
              { label: 'Active Campaigns', value: campaigns.filter(c => c.status === 'active').length, icon: Play, color: 'green' },
              { label: 'Total Spend', value: formatCurrency(campaigns.reduce((sum, c) => sum + c.spent, 0)), icon: DollarSign, color: 'purple' },
              { label: 'Avg ROAS', value: `${(campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length).toFixed(1)}x`, icon: TrendingUp, color: 'teal' },
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
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedFilter(filter.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedFilter === filter.value
                        ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg neon-blue'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/20'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <Input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                  className="w-64"
                  variant="futuristic"
                />
                <Button variant="ghost" size="md" leftIcon={<Filter className="w-4 h-4" />} className="text-slate-400 hover:text-white">
                  Filter
                </Button>
                <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'table' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Target className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Campaigns Display */}
          {viewMode === 'grid' ? renderGridView() : renderTableView()}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={toggleDeleteModal}
        title="Delete Campaign"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="ghost" onClick={toggleDeleteModal} className="text-slate-400 hover:text-white">
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteCampaign}>
              Delete Campaign
            </Button>
          </div>
        }
      >
        <div className="text-slate-300">
          Are you sure you want to delete <span className="text-white font-semibold">"{selectedCampaign?.name}"</span>? This action cannot be undone.
        </div>
      </Modal>
    </div>
  );
};

export default CampaignList;