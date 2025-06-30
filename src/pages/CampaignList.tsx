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
  ExternalLink
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
}

const CampaignList: React.FC = () => {
  const [sidebarCollapsed, { toggle: toggleSidebar }] = useToggle(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDeleteModalOpen, { toggle: toggleDeleteModal }] = useToggle(false);

  const user = {
    name: 'Sarah Chen',
    email: 'sarah@techflow.com',
  };

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

  const handleDeleteCampaign = () => {
    // Handle delete logic here
    console.log('Deleting campaign:', selectedCampaign?.id);
    toggleDeleteModal();
    setSelectedCampaign(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        currentPath="/campaigns"
      />
      
      <div className="flex-1 flex flex-col">
        <Header variant="dashboard" user={user} />
        
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Campaigns
              </h1>
              <p className="text-neutral-600">
                Manage and optimize your marketing campaigns across all channels.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Button 
                variant="primary" 
                size="md"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                <a href="/campaigns/new" className="flex items-center">
                  Create Campaign
                </a>
              </Button>
            </div>
          </div>

          {/* Filters and Search */}
          <Card padding="lg" className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedFilter(filter.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                      selectedFilter === filter.value
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-transparent'
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
                />
                <Button variant="outline" size="md" leftIcon={<Filter className="w-4 h-4" />}>
                  Filter
                </Button>
              </div>
            </div>
          </Card>

          {/* Campaigns Table */}
          <Card padding="none">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-neutral-700">Campaign</th>
                    <th className="text-left py-4 px-6 font-medium text-neutral-700">Channel</th>
                    <th className="text-left py-4 px-6 font-medium text-neutral-700">Budget</th>
                    <th className="text-left py-4 px-6 font-medium text-neutral-700">Spent</th>
                    <th className="text-left py-4 px-6 font-medium text-neutral-700">ROAS</th>
                    <th className="text-left py-4 px-6 font-medium text-neutral-700">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-neutral-700">Performance</th>
                    <th className="text-left py-4 px-6 font-medium text-neutral-700">Last Modified</th>
                    <th className="text-left py-4 px-6 font-medium text-neutral-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-neutral-900 mb-1">
                            {campaign.name}
                          </div>
                          <div className="text-sm text-neutral-500">
                            Created {formatDate(new Date(campaign.createdAt))}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-neutral-700 font-medium">
                          {campaign.channel}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-neutral-600">
                        {formatCurrency(campaign.budget)}
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="text-neutral-900 font-medium">
                            {formatCurrency(campaign.spent)}
                          </div>
                          <div className="text-sm text-neutral-500">
                            {campaign.budget > 0 ? `${((campaign.spent / campaign.budget) * 100).toFixed(1)}% used` : '0% used'}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-medium text-neutral-900">
                          {campaign.roas > 0 ? `${campaign.roas.toFixed(1)}x` : '-'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(campaign.status)}
                      </td>
                      <td className="py-4 px-6">
                        {getPerformanceBadge(campaign.performance)}
                      </td>
                      <td className="py-4 px-6 text-neutral-600 text-sm">
                        {formatDate(new Date(campaign.lastModified))}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          {campaign.status === 'active' ? (
                            <Button variant="ghost" size="sm" leftIcon={<Pause className="w-4 h-4" />}>
                              Pause
                            </Button>
                          ) : campaign.status === 'paused' ? (
                            <Button variant="ghost" size="sm" leftIcon={<Play className="w-4 h-4" />}>
                              Resume
                            </Button>
                          ) : null}
                          
                          <div className="relative group">
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                            
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                              <button className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                                <Edit className="w-4 h-4 mr-3" />
                                Edit Campaign
                              </button>
                              <button className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                                <Copy className="w-4 h-4 mr-3" />
                                Duplicate
                              </button>
                              <button className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                                <ExternalLink className="w-4 h-4 mr-3" />
                                View Details
                              </button>
                              <hr className="my-1 border-neutral-200" />
                              <button 
                                onClick={() => {
                                  setSelectedCampaign(campaign);
                                  toggleDeleteModal();
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50"
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
                <div className="text-neutral-500 mb-4">
                  {searchQuery ? 'No campaigns match your search.' : 'No campaigns found.'}
                </div>
                <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
                  <a href="/campaigns/new">
                    Create Your First Campaign
                  </a>
                </Button>
              </div>
            )}
          </Card>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={toggleDeleteModal}
        title="Delete Campaign"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={toggleDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteCampaign}>
              Delete Campaign
            </Button>
          </div>
        }
      >
        <p className="text-neutral-700">
          Are you sure you want to delete "{selectedCampaign?.name}"? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default CampaignList;