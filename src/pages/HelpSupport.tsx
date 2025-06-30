import React, { useState } from 'react';
import { 
  Search, 
  MessageCircle, 
  Book, 
  HelpCircle,
  ChevronRight,
  Star,
  Clock,
  CheckCircle,
  Send,
  Paperclip,
  Phone,
  Mail,
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

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'pending' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  created: string;
  lastUpdate: string;
}

const HelpSupport: React.FC = () => {
  const [sidebarCollapsed, { toggle: toggleSidebar }] = useToggle(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isChatOpen, { toggle: toggleChat }] = useToggle(false);
  const [isTicketModalOpen, { toggle: toggleTicketModal }] = useToggle(false);
  const [chatMessage, setChatMessage] = useState('');
  const [ticketData, setTicketData] = useState({
    subject: '',
    description: '',
    priority: 'medium',
    category: 'general'
  });

  const categories = [
    { id: 'all', name: 'All Topics', count: 24 },
    { id: 'getting-started', name: 'Getting Started', count: 8 },
    { id: 'campaigns', name: 'Campaigns', count: 6 },
    { id: 'analytics', name: 'Analytics', count: 4 },
    { id: 'billing', name: 'Billing', count: 3 },
    { id: 'integrations', name: 'Integrations', count: 3 }
  ];

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "How do I create my first campaign?",
      answer: "To create your first campaign, navigate to the Campaigns page and click 'Create Campaign'. Follow the step-by-step wizard to set up your campaign objectives, target audience, budget, and creative assets.",
      category: "getting-started",
      helpful: 45
    },
    {
      id: 2,
      question: "What platforms does Omnify support?",
      answer: "Omnify supports all major advertising platforms including Meta Ads (Facebook & Instagram), Google Ads, TikTok Ads, LinkedIn Ads, Twitter Ads, and more. Our AI automatically optimizes for each platform's requirements.",
      category: "integrations",
      helpful: 38
    },
    {
      id: 3,
      question: "How is my billing calculated?",
      answer: "Billing is based on your selected plan and usage. We offer monthly and yearly billing cycles with different tiers based on campaign volume, API calls, and team size. Check your billing page for detailed usage information.",
      category: "billing",
      helpful: 32
    },
    {
      id: 4,
      question: "Can I export my analytics data?",
      answer: "Yes, you can export your analytics data in various formats including CSV, PDF, and Excel. Go to the Analytics dashboard and click the 'Export' button to download your data.",
      category: "analytics",
      helpful: 28
    },
    {
      id: 5,
      question: "How do I invite team members?",
      answer: "To invite team members, go to Team Management and click 'Invite Member'. Enter their email address, select their role and permissions, then send the invitation.",
      category: "getting-started",
      helpful: 25
    },
    {
      id: 6,
      question: "What is the AI optimization feature?",
      answer: "Our AI optimization automatically analyzes your campaign performance and makes real-time adjustments to improve ROAS, reduce CAC, and maximize conversions across all your advertising channels.",
      category: "campaigns",
      helpful: 42
    }
  ];

  const tickets: Ticket[] = [
    {
      id: 'TKT-001',
      subject: 'Campaign not showing expected results',
      status: 'open',
      priority: 'high',
      created: '2024-12-01T10:00:00Z',
      lastUpdate: '2024-12-01T14:30:00Z'
    },
    {
      id: 'TKT-002',
      subject: 'Integration with Google Ads failing',
      status: 'pending',
      priority: 'medium',
      created: '2024-11-28T09:15:00Z',
      lastUpdate: '2024-11-30T16:45:00Z'
    },
    {
      id: 'TKT-003',
      subject: 'Billing question about usage limits',
      status: 'resolved',
      priority: 'low',
      created: '2024-11-25T11:30:00Z',
      lastUpdate: '2024-11-26T12:20:00Z'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="error" size="sm">Open</Badge>;
      case 'pending':
        return <Badge variant="warning" size="sm">Pending</Badge>;
      case 'resolved':
        return <Badge variant="success" size="sm">Resolved</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="error" size="sm">High</Badge>;
      case 'medium':
        return <Badge variant="warning" size="sm">Medium</Badge>;
      case 'low':
        return <Badge variant="success" size="sm">Low</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Unknown</Badge>;
    }
  };

  const handleSubmitTicket = () => {
    console.log('Submitting ticket:', ticketData);
    setTicketData({ subject: '', description: '', priority: 'medium', category: 'general' });
    toggleTicketModal();
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      console.log('Sending message:', chatMessage);
      setChatMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        currentPath="/help"
      />
      
      <div className="flex-1 flex flex-col">
        <Header variant="dashboard" />
        
        <main className="flex-1 p-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="animate-slide-in-up">
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Help & Support
              </h1>
              <p className="text-slate-300 text-lg">
                Find answers, get help, and contact our support team
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0 animate-slide-in-right">
              <Button variant="ghost" size="sm" leftIcon={<MessageCircle className="w-4 h-4" />} onClick={toggleChat}>
                Live Chat
              </Button>
              <Button variant="futuristic" size="sm" leftIcon={<HelpCircle className="w-4 h-4" />} onClick={toggleTicketModal}>
                Submit Ticket
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card variant="futuristic" padding="lg" hover className="animate-slide-in-up cursor-pointer" onClick={toggleChat}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Live Chat</h3>
                  <p className="text-slate-400 text-sm">Get instant help from our support team</p>
                  <Badge variant="success" size="sm" className="mt-2">Available now</Badge>
                </div>
              </div>
            </Card>

            <Card variant="futuristic" padding="lg" hover className="animate-slide-in-up cursor-pointer" onClick={toggleTicketModal} style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Submit Ticket</h3>
                  <p className="text-slate-400 text-sm">Create a support ticket for complex issues</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-400 text-xs">24h response time</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="futuristic" padding="lg" hover className="animate-slide-in-up cursor-pointer" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Documentation</h3>
                  <p className="text-slate-400 text-sm">Browse our comprehensive guides</p>
                  <div className="flex items-center space-x-1 mt-2">
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-400 text-xs">docs.omnify.com</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Search and Categories */}
          <Card variant="futuristic" padding="lg" className="mb-8 animate-slide-in-up">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 max-w-md">
                <Input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                  variant="futuristic"
                  fullWidth
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg neon-blue'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white border border-white/20'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* FAQ Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card variant="futuristic" padding="lg" className="animate-slide-in-up">
                <h3 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <div 
                      key={faq.id} 
                      className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-200"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-white font-medium pr-4">{faq.question}</h4>
                        <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed mb-3">
                        {faq.answer}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-slate-400 text-xs">{faq.helpful} people found this helpful</span>
                        </div>
                        <Badge variant="secondary" size="sm">{faq.category}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredFAQs.length === 0 && (
                  <div className="text-center py-8">
                    <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-300 mb-2">No articles found</p>
                    <p className="text-slate-500 text-sm">Try adjusting your search or browse different categories</p>
                  </div>
                )}
              </Card>
            </div>

            {/* Support Tickets */}
            <div>
              <Card variant="futuristic" padding="lg" className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Your Tickets</h3>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {tickets.map((ticket, index) => (
                    <div 
                      key={ticket.id} 
                      className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium text-sm">{ticket.id}</span>
                        {getStatusBadge(ticket.status)}
                      </div>
                      <p className="text-slate-300 text-sm mb-2 line-clamp-2">{ticket.subject}</p>
                      <div className="flex items-center justify-between">
                        {getPriorityBadge(ticket.priority)}
                        <span className="text-slate-500 text-xs">
                          {new Date(ticket.created).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" size="sm" fullWidth className="mt-4" onClick={toggleTicketModal}>
                  Create New Ticket
                </Button>
              </Card>

              {/* Contact Information */}
              <Card variant="futuristic" padding="lg" className="mt-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Live Chat</div>
                      <div className="text-slate-400 text-sm">Available 24/7</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Email Support</div>
                      <div className="text-slate-400 text-sm">support@omnify.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Phone Support</div>
                      <div className="text-slate-400 text-sm">Enterprise only</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Live Chat Modal */}
      <Modal
        isOpen={isChatOpen}
        onClose={toggleChat}
        title="Live Chat Support"
        size="lg"
      >
        <div className="h-96 flex flex-col">
          <div className="flex-1 bg-white/5 rounded-lg p-4 mb-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
                <div className="bg-white/10 rounded-lg p-3 max-w-xs">
                  <p className="text-white text-sm">Hi! I'm here to help. What can I assist you with today?</p>
                  <span className="text-slate-400 text-xs">Support Agent • Just now</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              variant="futuristic"
              fullWidth
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button variant="futuristic" size="sm" onClick={handleSendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Modal>

      {/* Submit Ticket Modal */}
      <Modal
        isOpen={isTicketModalOpen}
        onClose={toggleTicketModal}
        title="Submit Support Ticket"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="ghost" onClick={toggleTicketModal} className="text-slate-400 hover:text-white">
              Cancel
            </Button>
            <Button variant="futuristic" onClick={handleSubmitTicket}>
              Submit Ticket
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Subject"
            type="text"
            value={ticketData.subject}
            onChange={(e) => setTicketData(prev => ({ ...prev, subject: e.target.value }))}
            placeholder="Brief description of your issue"
            variant="futuristic"
            fullWidth
          />
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Category
            </label>
            <select
              value={ticketData.category}
              onChange={(e) => setTicketData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
            >
              <option value="general" className="bg-slate-800 text-white">General</option>
              <option value="technical" className="bg-slate-800 text-white">Technical Issue</option>
              <option value="billing" className="bg-slate-800 text-white">Billing</option>
              <option value="feature" className="bg-slate-800 text-white">Feature Request</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Priority
            </label>
            <select
              value={ticketData.priority}
              onChange={(e) => setTicketData(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
            >
              <option value="low" className="bg-slate-800 text-white">Low</option>
              <option value="medium" className="bg-slate-800 text-white">Medium</option>
              <option value="high" className="bg-slate-800 text-white">High</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <textarea
              value={ticketData.description}
              onChange={(e) => setTicketData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Please provide detailed information about your issue..."
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm resize-none"
              rows={4}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HelpSupport;