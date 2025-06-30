import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  Target, 
  DollarSign,
  Calendar,
  Image,
  Sparkles,
  Upload,
  Zap,
  BarChart3,
  Users,
  Globe,
  Palette,
  TestTube,
  CheckCircle,
  Play
} from 'lucide-react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import { useToggle } from '../hooks/useToggle';

interface CampaignData {
  name: string;
  objective: string;
  platforms: string[];
  budget: string;
  budgetType: 'daily' | 'total';
  startDate: string;
  endDate: string;
  targetAudience: {
    demographics: string;
    interests: string;
    location: string;
  };
  creativeAssets: File[];
  template: string;
  abTesting: {
    enabled: boolean;
    variants: number;
    splitType: 'creative' | 'audience' | 'budget';
  };
}

const CampaignWizard: React.FC = () => {
  const [sidebarCollapsed, { toggle: toggleSidebar }] = useToggle(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingPrediction, setIsGeneratingPrediction] = useState(false);
  
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: '',
    objective: '',
    platforms: [],
    budget: '',
    budgetType: 'daily',
    startDate: '',
    endDate: '',
    targetAudience: {
      demographics: '',
      interests: '',
      location: ''
    },
    creativeAssets: [],
    template: '',
    abTesting: {
      enabled: false,
      variants: 2,
      splitType: 'creative'
    }
  });

  const steps = [
    { id: 1, name: 'Campaign Setup', icon: Target, description: 'Define your campaign goals' },
    { id: 2, name: 'Budget & Schedule', icon: DollarSign, description: 'Set budget and timeline' },
    { id: 3, name: 'Audience Targeting', icon: Users, description: 'Define your target audience' },
    { id: 4, name: 'Creative Assets', icon: Image, description: 'Upload and select creatives' },
    { id: 5, name: 'A/B Testing', icon: TestTube, description: 'Configure testing options' },
    { id: 6, name: 'Review & Launch', icon: Sparkles, description: 'Review and launch campaign' },
  ];

  const objectives = [
    { 
      value: 'awareness', 
      label: 'Brand Awareness', 
      description: 'Increase brand visibility and reach',
      icon: Globe,
      color: 'blue'
    },
    { 
      value: 'traffic', 
      label: 'Website Traffic', 
      description: 'Drive visitors to your website',
      icon: ArrowRight,
      color: 'green'
    },
    { 
      value: 'conversions', 
      label: 'Conversions', 
      description: 'Generate sales and leads',
      icon: Target,
      color: 'purple'
    },
    { 
      value: 'engagement', 
      label: 'Engagement', 
      description: 'Increase likes, shares, and comments',
      icon: Users,
      color: 'teal'
    }
  ];

  const platforms = [
    { id: 'meta', name: 'Meta Ads', description: 'Facebook & Instagram', enabled: true, color: 'blue' },
    { id: 'google', name: 'Google Ads', description: 'Search & Display', enabled: true, color: 'red' },
    { id: 'tiktok', name: 'TikTok Ads', description: 'Short-form video', enabled: true, color: 'purple' },
    { id: 'linkedin', name: 'LinkedIn Ads', description: 'Professional network', enabled: true, color: 'blue' },
    { id: 'twitter', name: 'Twitter Ads', description: 'Social engagement', enabled: false, color: 'blue' },
    { id: 'snapchat', name: 'Snapchat Ads', description: 'Mobile-first', enabled: false, color: 'yellow' },
  ];

  const templates = [
    {
      id: 'ecommerce',
      name: 'E-commerce Sale',
      description: 'Perfect for product promotions and sales',
      preview: '/api/placeholder/300/200',
      category: 'Sales'
    },
    {
      id: 'lead-gen',
      name: 'Lead Generation',
      description: 'Capture leads with compelling offers',
      preview: '/api/placeholder/300/200',
      category: 'Leads'
    },
    {
      id: 'brand-awareness',
      name: 'Brand Awareness',
      description: 'Build brand recognition and trust',
      preview: '/api/placeholder/300/200',
      category: 'Branding'
    },
    {
      id: 'app-install',
      name: 'App Install',
      description: 'Drive mobile app downloads',
      preview: '/api/placeholder/300/200',
      category: 'Mobile'
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setCampaignData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof CampaignData],
          [child]: value
        }
      }));
    } else {
      setCampaignData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handlePlatformToggle = (platformId: string) => {
    setCampaignData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const generatePrediction = async () => {
    setIsGeneratingPrediction(true);
    // Simulate AI prediction generation
    setTimeout(() => {
      setIsGeneratingPrediction(false);
    }, 3000);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Campaign Setup</h3>
              
              <div className="space-y-6">
                <Input
                  label="Campaign Name"
                  placeholder="e.g., Holiday Sale 2024"
                  value={campaignData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  variant="futuristic"
                  fullWidth
                />
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-4">
                    Campaign Objective
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {objectives.map((objective) => (
                      <button
                        key={objective.value}
                        onClick={() => handleInputChange('objective', objective.value)}
                        className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                          campaignData.objective === objective.value
                            ? 'border-blue-500 bg-blue-500/20 shadow-lg neon-blue'
                            : 'border-white/20 hover:border-white/40 bg-white/5'
                        }`}
                      >
                        <div className="flex items-center space-x-4 mb-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-${objective.color}-500 to-${objective.color}-600 flex items-center justify-center`}>
                            <objective.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-white text-lg">{objective.label}</div>
                            <div className="text-slate-400 text-sm">{objective.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-4">
                    Target Platforms
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {platforms.map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => platform.enabled && handlePlatformToggle(platform.id)}
                        disabled={!platform.enabled}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                          !platform.enabled
                            ? 'border-white/10 bg-white/5 opacity-50 cursor-not-allowed'
                            : campaignData.platforms.includes(platform.id)
                            ? 'border-blue-500 bg-blue-500/20 shadow-lg'
                            : 'border-white/20 hover:border-white/40 bg-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r from-${platform.color}-500 to-${platform.color}-600 flex items-center justify-center`}>
                              <span className="text-white font-bold text-sm">
                                {platform.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-white">{platform.name}</div>
                              <div className="text-sm text-slate-400">{platform.description}</div>
                            </div>
                          </div>
                          {!platform.enabled && (
                            <Badge variant="neutral" size="sm">Coming Soon</Badge>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Budget & Schedule</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Budget Amount"
                    type="number"
                    placeholder="1000"
                    value={campaignData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    leftIcon={<DollarSign className="w-4 h-4" />}
                    variant="futuristic"
                    fullWidth
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Budget Type
                    </label>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleInputChange('budgetType', 'daily')}
                        className={`flex-1 p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                          campaignData.budgetType === 'daily'
                            ? 'border-blue-500 bg-blue-500/20 text-white shadow-lg'
                            : 'border-white/20 hover:border-white/40 text-slate-300'
                        }`}
                      >
                        <Calendar className="w-5 h-5 mx-auto mb-2" />
                        Daily Budget
                      </button>
                      <button
                        onClick={() => handleInputChange('budgetType', 'total')}
                        className={`flex-1 p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                          campaignData.budgetType === 'total'
                            ? 'border-blue-500 bg-blue-500/20 text-white shadow-lg'
                            : 'border-white/20 hover:border-white/40 text-slate-300'
                        }`}
                      >
                        <DollarSign className="w-5 h-5 mx-auto mb-2" />
                        Total Budget
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Start Date"
                    type="date"
                    value={campaignData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    leftIcon={<Calendar className="w-4 h-4" />}
                    variant="futuristic"
                    fullWidth
                  />
                  
                  <Input
                    label="End Date (Optional)"
                    type="date"
                    value={campaignData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    leftIcon={<Calendar className="w-4 h-4" />}
                    variant="futuristic"
                    fullWidth
                  />
                </div>

                {/* Performance Prediction */}
                <Card variant="futuristic" padding="lg" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        AI Performance Prediction
                      </h4>
                      <p className="text-slate-300 text-sm">
                        Get AI-powered predictions for your campaign performance
                      </p>
                    </div>
                    <Button
                      variant="futuristic"
                      size="md"
                      leftIcon={<Zap className="w-4 h-4" />}
                      loading={isGeneratingPrediction}
                      onClick={generatePrediction}
                    >
                      Generate Prediction
                    </Button>
                  </div>
                  
                  {isGeneratingPrediction && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {['Expected ROAS', 'Estimated Reach', 'Predicted Conversions'].map((metric) => (
                        <div key={metric} className="bg-white/10 rounded-lg p-3 animate-pulse">
                          <div className="h-4 bg-white/20 rounded mb-2"></div>
                          <div className="h-6 bg-white/20 rounded"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Audience Targeting</h3>
              
              <div className="space-y-6">
                <Input
                  label="Demographics"
                  placeholder="e.g., Age 25-45, College educated, Urban"
                  value={campaignData.targetAudience.demographics}
                  onChange={(e) => handleInputChange('targetAudience.demographics', e.target.value)}
                  variant="futuristic"
                  fullWidth
                />
                
                <Input
                  label="Interests & Behaviors"
                  placeholder="e.g., Technology, Online shopping, Fitness"
                  value={campaignData.targetAudience.interests}
                  onChange={(e) => handleInputChange('targetAudience.interests', e.target.value)}
                  variant="futuristic"
                  fullWidth
                />
                
                <Input
                  label="Geographic Location"
                  placeholder="e.g., United States, Major cities"
                  value={campaignData.targetAudience.location}
                  onChange={(e) => handleInputChange('targetAudience.location', e.target.value)}
                  variant="futuristic"
                  fullWidth
                />

                {/* AI Audience Suggestions */}
                <Card variant="futuristic" padding="lg" className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 border-teal-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        AI Audience Suggestions
                      </h4>
                      <p className="text-slate-300 text-sm">
                        Based on your campaign objective and industry data
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-teal-400 hover:text-teal-300">
                      Apply All
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Tech-savvy millennials',
                      'High-income professionals',
                      'Online shopping enthusiasts',
                      'Mobile-first users'
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        className="p-3 bg-white/10 rounded-lg text-left hover:bg-white/20 transition-all duration-200"
                      >
                        <div className="text-white font-medium">{suggestion}</div>
                        <div className="text-slate-400 text-sm">Estimated reach: {(Math.random() * 5 + 1).toFixed(1)}M</div>
                      </button>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Creative Assets</h3>
              
              <div className="space-y-6">
                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-4">
                    Choose a Template
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => handleInputChange('template', template.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                          campaignData.template === template.id
                            ? 'border-blue-500 bg-blue-500/20 shadow-lg neon-blue'
                            : 'border-white/20 hover:border-white/40 bg-white/5'
                        }`}
                      >
                        <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg mb-3 flex items-center justify-center">
                          <Palette className="w-8 h-8 text-slate-400" />
                        </div>
                        <div className="font-medium text-white mb-1">{template.name}</div>
                        <div className="text-sm text-slate-400 mb-2">{template.description}</div>
                        <Badge variant="secondary" size="sm">{template.category}</Badge>
                      </button>
                    ))}
                  </div>
                </div>

                {/* File Upload */}
                <div className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-300">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-white mb-2">
                    Upload Your Creative Assets
                  </h4>
                  <p className="text-slate-400 mb-4">
                    Drag and drop files here, or click to browse
                  </p>
                  <Button variant="outline" size="md">
                    Choose Files
                  </Button>
                  <p className="text-sm text-slate-500 mt-2">
                    Supports: JPG, PNG, MP4, MOV (Max 50MB each)
                  </p>
                </div>

                {/* AI Creative Generation */}
                <Card variant="futuristic" padding="lg" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        AI Creative Generation
                      </h4>
                      <p className="text-slate-300 text-sm">
                        Generate multiple creative variations automatically
                      </p>
                    </div>
                    <Button
                      variant="futuristic"
                      size="md"
                      leftIcon={<Sparkles className="w-4 h-4" />}
                    >
                      Generate Creatives
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">A/B Testing Configuration</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <div className="font-medium text-white">Enable A/B Testing</div>
                    <div className="text-sm text-slate-400">Test different variations to optimize performance</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={campaignData.abTesting.enabled}
                    onChange={(e) => handleInputChange('abTesting.enabled', e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-white/20 rounded focus:ring-blue-500 bg-white/10"
                  />
                </div>

                {campaignData.abTesting.enabled && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Number of Variants
                        </label>
                        <select
                          value={campaignData.abTesting.variants}
                          onChange={(e) => handleInputChange('abTesting.variants', parseInt(e.target.value))}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                        >
                          <option value={2} className="bg-slate-800 text-white">2 Variants</option>
                          <option value={3} className="bg-slate-800 text-white">3 Variants</option>
                          <option value={4} className="bg-slate-800 text-white">4 Variants</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Split Type
                        </label>
                        <select
                          value={campaignData.abTesting.splitType}
                          onChange={(e) => handleInputChange('abTesting.splitType', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                        >
                          <option value="creative" className="bg-slate-800 text-white">Creative Variations</option>
                          <option value="audience" className="bg-slate-800 text-white">Audience Segments</option>
                          <option value="budget" className="bg-slate-800 text-white">Budget Allocation</option>
                        </select>
                      </div>
                    </div>

                    <Card variant="futuristic" padding="lg" className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
                      <div className="flex items-center space-x-3 mb-4">
                        <TestTube className="w-6 h-6 text-green-400" />
                        <h4 className="font-semibold text-white">A/B Test Configuration</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{campaignData.abTesting.variants}</div>
                          <div className="text-slate-400 text-sm">Variants</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">7 days</div>
                          <div className="text-slate-400 text-sm">Test Duration</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">95%</div>
                          <div className="text-slate-400 text-sm">Confidence Level</div>
                        </div>
                      </div>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Review & Launch</h3>
              
              <div className="space-y-6">
                {/* Campaign Summary */}
                <Card variant="futuristic" padding="lg">
                  <h4 className="font-semibold text-white mb-4">Campaign Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Name:</span>
                        <span className="text-white font-medium">{campaignData.name || 'Untitled Campaign'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Objective:</span>
                        <span className="text-white font-medium">
                          {objectives.find(o => o.value === campaignData.objective)?.label || 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Budget:</span>
                        <span className="text-white font-medium">
                          ${campaignData.budget} ({campaignData.budgetType})
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Platforms:</span>
                        <span className="text-white font-medium">
                          {campaignData.platforms.length} selected
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">A/B Testing:</span>
                        <span className="text-white font-medium">
                          {campaignData.abTesting.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Start Date:</span>
                        <span className="text-white font-medium">
                          {campaignData.startDate || 'Not set'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
                
                {/* Launch Options */}
                <Card variant="futuristic" padding="lg">
                  <h4 className="font-semibold text-white mb-4">Launch Options</h4>
                  <div className="space-y-3">
                    <button className="w-full p-4 rounded-xl border-2 border-blue-500 bg-blue-500/20 text-left hover:bg-blue-500/30 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white flex items-center space-x-2">
                            <Play className="w-5 h-5" />
                            <span>Launch Campaign Now</span>
                          </div>
                          <div className="text-sm text-blue-300">Start running immediately</div>
                        </div>
                        <Sparkles className="w-5 h-5 text-blue-400" />
                      </div>
                    </button>
                    
                    <button className="w-full p-4 rounded-xl border-2 border-white/20 hover:border-white/40 bg-white/5 text-left transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Save as Draft</div>
                          <div className="text-sm text-slate-400">Continue editing later</div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-slate-400" />
                      </div>
                    </button>
                  </div>
                </Card>

                {/* Performance Prediction Summary */}
                <Card variant="futuristic" padding="lg" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
                  <h4 className="font-semibold text-white mb-4">Expected Performance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">4.2x</div>
                      <div className="text-slate-400 text-sm">Predicted ROAS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">2.4M</div>
                      <div className="text-slate-400 text-sm">Estimated Reach</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">1,247</div>
                      <div className="text-slate-400 text-sm">Expected Conversions</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4 animate-slide-in-up">
              <Button 
                variant="ghost" 
                size="sm"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                className="text-slate-400 hover:text-white"
              >
                <a href="/campaigns">Back to Campaigns</a>
              </Button>
              <div>
                <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Campaign Wizard
                </h1>
                <p className="text-slate-300">
                  Create your campaign with AI-powered optimization
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Progress Steps */}
            <div className="lg:col-span-1">
              <Card variant="futuristic" padding="lg" className="sticky top-6">
                <h3 className="font-semibold text-white mb-4">Progress</h3>
                <div className="space-y-3">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                        currentStep === step.id
                          ? 'bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/30 shadow-lg'
                          : currentStep > step.id
                          ? 'bg-green-500/20 border border-green-500/30'
                          : 'bg-white/5 border border-white/10'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep === step.id
                          ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                          : currentStep > step.id
                          ? 'bg-green-500 text-white'
                          : 'bg-white/20 text-slate-400'
                      }`}>
                        {currentStep > step.id ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <step.icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium ${
                          currentStep >= step.id ? 'text-white' : 'text-slate-500'
                        }`}>
                          {step.name}
                        </div>
                        <div className="text-xs text-slate-400 truncate">
                          {step.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Form Content */}
            <div className="lg:col-span-3">
              <Card variant="futuristic" padding="lg" className="animate-slide-in-up">
                {renderStepContent()}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                    className="text-slate-400 hover:text-white"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex space-x-3">
                    <Button variant="ghost" className="text-slate-400 hover:text-white">
                      Save Draft
                    </Button>
                    {currentStep < steps.length ? (
                      <Button 
                        variant="futuristic" 
                        onClick={nextStep}
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button 
                        variant="futuristic" 
                        leftIcon={<Sparkles className="w-4 h-4" />}
                        glow
                      >
                        Launch Campaign
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CampaignWizard;