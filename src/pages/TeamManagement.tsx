import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Mail, 
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Crown,
  User,
  Search,
  Filter,
  Download,
  Activity,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useToggle } from '../hooks/useToggle';
import { formatDate } from '../utils/formatters';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
  avatar: string;
  lastActive: string;
  joinedAt: string;
  permissions: string[];
}

const TeamManagement: React.FC = () => {
  const [sidebarCollapsed, { toggle: toggleSidebar }] = useToggle(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isInviteModalOpen, { toggle: toggleInviteModal }] = useToggle(false);
  const [isEditModalOpen, { toggle: toggleEditModal }] = useToggle(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [inviteData, setInviteData] = useState({ email: '', role: 'member' });

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah@techflow.com',
      role: 'owner',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2',
      lastActive: '2024-12-01T16:30:00Z',
      joinedAt: '2024-01-15T10:00:00Z',
      permissions: ['all']
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      email: 'marcus@techflow.com',
      role: 'admin',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2',
      lastActive: '2024-12-01T14:20:00Z',
      joinedAt: '2024-02-01T09:15:00Z',
      permissions: ['campaigns', 'analytics', 'team']
    },
    {
      id: 3,
      name: 'Emily Watson',
      email: 'emily@techflow.com',
      role: 'member',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2',
      lastActive: '2024-12-01T12:45:00Z',
      joinedAt: '2024-03-10T11:30:00Z',
      permissions: ['campaigns', 'analytics']
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david@techflow.com',
      role: 'member',
      status: 'pending',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2',
      lastActive: '2024-11-28T16:00:00Z',
      joinedAt: '2024-11-28T16:00:00Z',
      permissions: ['campaigns']
    },
    {
      id: 5,
      name: 'Jessica Park',
      email: 'jessica@techflow.com',
      role: 'viewer',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2',
      lastActive: '2024-11-30T09:15:00Z',
      joinedAt: '2024-04-05T14:20:00Z',
      permissions: ['analytics']
    }
  ];

  const roles = [
    { value: 'all', label: 'All Roles', count: teamMembers.length },
    { value: 'owner', label: 'Owner', count: teamMembers.filter(m => m.role === 'owner').length },
    { value: 'admin', label: 'Admin', count: teamMembers.filter(m => m.role === 'admin').length },
    { value: 'member', label: 'Member', count: teamMembers.filter(m => m.role === 'member').length },
    { value: 'viewer', label: 'Viewer', count: teamMembers.filter(m => m.role === 'viewer').length },
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-4 h-4 text-yellow-400" />;
      case 'admin':
        return <Shield className="w-4 h-4 text-blue-400" />;
      case 'member':
        return <User className="w-4 h-4 text-green-400" />;
      case 'viewer':
        return <User className="w-4 h-4 text-slate-400" />;
      default:
        return <User className="w-4 h-4 text-slate-400" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'owner':
        return <Badge variant="warning" size="sm">Owner</Badge>;
      case 'admin':
        return <Badge variant="primary" size="sm">Admin</Badge>;
      case 'member':
        return <Badge variant="success" size="sm">Member</Badge>;
      case 'viewer':
        return <Badge variant="neutral" size="sm">Viewer</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm" dot>Active</Badge>;
      case 'pending':
        return <Badge variant="warning" size="sm" dot>Pending</Badge>;
      case 'inactive':
        return <Badge variant="error" size="sm" dot>Inactive</Badge>;
      default:
        return <Badge variant="neutral" size="sm" dot>Unknown</Badge>;
    }
  };

  const handleInviteMember = () => {
    console.log('Inviting member:', inviteData);
    setInviteData({ email: '', role: 'member' });
    toggleInviteModal();
  };

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    toggleEditModal();
  };

  const handleRemoveMember = (member: TeamMember) => {
    console.log('Removing member:', member.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        currentPath="/team"
      />
      
      <div className="flex-1 flex flex-col">
        <Header variant="dashboard" />
        
        <main className="flex-1 p-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="animate-slide-in-up">
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Team Management
              </h1>
              <p className="text-slate-300 text-lg">
                Manage your team members, roles, and permissions
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0 animate-slide-in-right">
              <Button variant="ghost" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                Export
              </Button>
              <Button 
                variant="futuristic" 
                size="md"
                leftIcon={<UserPlus className="w-4 h-4" />}
                onClick={toggleInviteModal}
              >
                Invite Member
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Members', value: teamMembers.length, icon: Users, color: 'blue' },
              { label: 'Active Members', value: teamMembers.filter(m => m.status === 'active').length, icon: CheckCircle, color: 'green' },
              { label: 'Pending Invites', value: teamMembers.filter(m => m.status === 'pending').length, icon: Clock, color: 'yellow' },
              { label: 'Admin Users', value: teamMembers.filter(m => m.role === 'admin' || m.role === 'owner').length, icon: Shield, color: 'purple' },
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
                {roles.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => setSelectedRole(role.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedRole === role.value
                        ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg neon-blue'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/20'
                    }`}
                  >
                    {role.label} ({role.count})
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <Input
                  type="text"
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                  className="w-64"
                  variant="futuristic"
                />
                <Button variant="ghost" size="md" leftIcon={<Filter className="w-4 h-4" />} className="text-slate-400 hover:text-white">
                  Filter
                </Button>
              </div>
            </div>
          </Card>

          {/* Team Members Table */}
          <Card variant="futuristic" padding="none" className="overflow-hidden animate-slide-in-up">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">Member</th>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">Role</th>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">Last Active</th>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">Joined</th>
                    <th className="text-left py-4 px-6 font-medium text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member, index) => (
                    <tr 
                      key={member.id} 
                      className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 animate-slide-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-full border-2 border-white/20"
                          />
                          <div>
                            <div className="font-medium text-white mb-1">
                              {member.name}
                            </div>
                            <div className="text-sm text-slate-400">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(member.role)}
                          {getRoleBadge(member.role)}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(member.status)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-slate-300">
                          {member.status === 'active' ? (
                            <div className="flex items-center space-x-2">
                              <Activity className="w-4 h-4 text-green-400" />
                              <span>{formatDate(new Date(member.lastActive))}</span>
                            </div>
                          ) : (
                            <span className="text-slate-500">Never</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-400 text-sm">
                        {formatDate(new Date(member.joinedAt))}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-slate-400 hover:text-white"
                            onClick={() => handleEditMember(member)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          
                          {member.role !== 'owner' && (
                            <div className="relative group">
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                              
                              <div className="absolute right-0 top-full mt-1 w-48 glass-dark rounded-xl shadow-xl border border-white/10 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                <button className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors duration-200">
                                  <Mail className="w-4 h-4 mr-3" />
                                  Resend Invite
                                </button>
                                <button className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors duration-200">
                                  <Edit className="w-4 h-4 mr-3" />
                                  Edit Permissions
                                </button>
                                <hr className="my-1 border-white/10" />
                                <button 
                                  onClick={() => handleRemoveMember(member)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-200"
                                >
                                  <Trash2 className="w-4 h-4 mr-3" />
                                  Remove Member
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-slate-300 mb-4 text-lg">
                  {searchQuery ? 'No team members match your search.' : 'No team members found.'}
                </div>
                <Button variant="futuristic" leftIcon={<UserPlus className="w-4 h-4" />} onClick={toggleInviteModal}>
                  Invite Your First Team Member
                </Button>
              </div>
            )}
          </Card>
        </main>
      </div>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={toggleInviteModal}
        title="Invite Team Member"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="ghost" onClick={toggleInviteModal} className="text-slate-400 hover:text-white">
              Cancel
            </Button>
            <Button variant="futuristic" onClick={handleInviteMember}>
              Send Invitation
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={inviteData.email}
            onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter email address"
            leftIcon={<Mail className="w-4 h-4" />}
            variant="futuristic"
            fullWidth
          />
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Role
            </label>
            <select
              value={inviteData.role}
              onChange={(e) => setInviteData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
            >
              <option value="member" className="bg-slate-800 text-white">Member</option>
              <option value="admin" className="bg-slate-800 text-white">Admin</option>
              <option value="viewer" className="bg-slate-800 text-white">Viewer</option>
            </select>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-300 text-sm">
              An invitation email will be sent to the provided address with instructions to join your team.
            </p>
          </div>
        </div>
      </Modal>

      {/* Edit Member Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={toggleEditModal}
        title="Edit Team Member"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="ghost" onClick={toggleEditModal} className="text-slate-400 hover:text-white">
              Cancel
            </Button>
            <Button variant="futuristic" onClick={toggleEditModal}>
              Save Changes
            </Button>
          </div>
        }
      >
        {selectedMember && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={selectedMember.avatar}
                alt={selectedMember.name}
                className="w-16 h-16 rounded-full border-2 border-white/20"
              />
              <div>
                <h3 className="text-white font-semibold text-lg">{selectedMember.name}</h3>
                <p className="text-slate-400">{selectedMember.email}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Role
              </label>
              <select
                defaultValue={selectedMember.role}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
              >
                <option value="member" className="bg-slate-800 text-white">Member</option>
                <option value="admin" className="bg-slate-800 text-white">Admin</option>
                <option value="viewer" className="bg-slate-800 text-white">Viewer</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Permissions
              </label>
              <div className="space-y-2">
                {['campaigns', 'analytics', 'team', 'billing'].map((permission) => (
                  <label key={permission} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={selectedMember.permissions.includes(permission)}
                      className="w-4 h-4 text-blue-600 border-white/20 rounded focus:ring-blue-500 bg-white/10"
                    />
                    <span className="text-slate-300 capitalize">{permission}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TeamManagement;