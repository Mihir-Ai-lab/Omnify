import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  Zap, 
  Target, 
  DollarSign,
  Calendar,
  Image,
  FileText,
  Video,
  Sparkles
} from 'lucide-react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import { useToggle } from '../hooks/useToggle';

interface CampaignFormData {
  name: string;
  objective: string;
  platforms: string[];
  budget: string;
  budgetType: 'daily' | 'total';
  startDate: string;
  endDate: string;
  targetAudience: string;
  creativeAssets: File[];
}

const CampaignForm: React.FC = () => {
  const [sidebarCollapsed, { toggle: toggleSidebar }] = useToggle(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    objective: '',
    platforms: [],
    budget: '',
    budgetType: 'daily',
    startDate: '',
    endDate: '',
    targetAudience: '',
    creativeAssets: [],
  });

  const user = {
    name: 'Sarah Chen',
    email: 'sarah@techflow.com',
  };

  const steps = [
    { id: 1, name: 'Campaign Details', icon: Target },
    { id: 2, name: 'Budget & Schedule', icon: DollarSign },
    { id: 3, name: 'Creative Assets', icon: Image },
    { id: 4, name: 'Review & Launch', icon: Sparkles },
  ];

  const objectives = [
    { value: 'awareness', label: 'Brand Awareness', description: 'Increase brand visibility and reach' },
    { value: 'traffic', label: 'Website Traffic', description: 'Drive visitors to your website' },
    { value: 'conversions', label: 'Conversions', description: 'Generate sales and leads' },
    { value: 'engagement', label: 'Engagement', description: 'Increase likes, shares, and comments' },
    { value: 'app_installs', label: 'App Installs', description: 'Drive mobile app downloads' },
  ];

  const platforms = [
    { id: 'meta', name: 'Meta Ads', description: 'Facebook & Instagram', enabled: true },
    { id: 'google', name: 'Google Ads', description: 'Search & Display', enabled: true },
    { id: 'tiktok', name: 'TikTok Ads', description: 'Short-form video', enabled: true },
    { id: 'linkedin', name: 'LinkedIn Ads', description: 'Professional network', enabled: true },
    { id: 'twitter', name: 'Twitter Ads', description: 'Social engagement', enabled: false },
    { id: 'snapchat', name: 'Snapchat Ads', description: 'Mobile-first', enabled: false },
  ];

  const handleInputChange = (field: keyof CampaignFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlatformToggle = (platformId: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setFormData(prev => ({
        ...prev,
        creativeAssets: [...prev.creativeAssets, ...newFiles]
      }));
    }
  };

  const generateAICopy = async () => {
    setIsGeneratingCopy(true);
    // Simulate AI copy generation
    setTimeout(() => {
      setIsGeneratingCopy(false);
      // Here you would typically update the form with generated copy
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
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Campaign Details
              </h3>
              <div className="space-y-4">
                <Input
                  label="Campaign Name"
                  placeholder="e.g., Holiday Sale 2024"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  fullWidth
                />
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Campaign Objective
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {objectives.map((objective) => (
                      <button
                        key={objective.value}
                        onClick={() => handleInputChange('objective', objective.value)}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          formData.objective === objective.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="font-medium text-neutral-900 mb-1">
                          {objective.label}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {objective.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Target Platforms
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {platforms.map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => platform.enabled && handlePlatformToggle(platform.id)}
                        disabled={!platform.enabled}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          !platform.enabled
                            ? 'border-neutral-200 bg-neutral-50 opacity-50 cursor-not-allowed'
                            : formData.platforms.includes(platform.id)
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-neutral-900 mb-1">
                              {platform.name}
                            </div>
                            <div className="text-sm text-neutral-600">
                              {platform.description}
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
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Budget & Schedule
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Budget Amount"
                    type="number"
                    placeholder="1000"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    leftIcon={<DollarSign className="w-4 h-4" />}
                    fullWidth
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Budget Type
                    </label>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleInputChange('budgetType', 'daily')}
                        className={`flex-1 p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                          formData.budgetType === 'daily'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        Daily Budget
                      </button>
                      <button
                        onClick={() => handleInputChange('budgetType', 'total')}
                        className={`flex-1 p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                          formData.budgetType === 'total'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        Total Budget
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    leftIcon={<Calendar className="w-4 h-4" />}
                    fullWidth
                  />
                  
                  <Input
                    label="End Date (Optional)"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    leftIcon={<Calendar className="w-4 h-4" />}
                    fullWidth
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Target Audience
                  </label>
                  <textarea
                    placeholder="Describe your target audience (age, interests, location, etc.)"
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    className="w-full px-3 py-2.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Creative Assets
              </h3>
              
              {/* File Upload Area */}
              <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors duration-200">
                <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-neutral-900 mb-2">
                  Upload Your Creative Assets
                </h4>
                <p className="text-neutral-600 mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" size="md" as="span">
                    Choose Files
                  </Button>
                </label>
                <p className="text-sm text-neutral-500 mt-2">
                  Supports: JPG, PNG, MP4, MOV (Max 50MB each)
                </p>
              </div>
              
              {/* Uploaded Files */}
              {formData.creativeAssets.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-neutral-900">Uploaded Files</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {formData.creativeAssets.map((file, index) => (
                      <div key={index} className="flex items-center p-3 bg-neutral-50 rounded-xl">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                          {file.type.startsWith('image/') ? (
                            <Image className="w-5 h-5 text-primary-600" />
                          ) : file.type.startsWith('video/') ? (
                            <Video className="w-5 h-5 text-primary-600" />
                          ) : (
                            <FileText className="w-5 h-5 text-primary-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-neutral-900 truncate">
                            {file.name}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* AI Copy Generation */}
              <Card padding="lg" className="bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">
                      AI-Powered Copy Generation
                    </h4>
                    <p className="text-neutral-600 text-sm">
                      Let our AI create optimized ad copy based on your campaign details and assets.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={<Zap className="w-4 h-4" />}
                    loading={isGeneratingCopy}
                    onClick={generateAICopy}
                  >
                    Generate AI Copy
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Review & Launch
              </h3>
              
              <div className="space-y-6">
                {/* Campaign Summary */}
                <Card padding="lg">
                  <h4 className="font-semibold text-neutral-900 mb-4">Campaign Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-neutral-600">Name:</span>
                      <span className="ml-2 font-medium">{formData.name || 'Untitled Campaign'}</span>
                    </div>
                    <div>
                      <span className="text-neutral-600">Objective:</span>
                      <span className="ml-2 font-medium">
                        {objectives.find(o => o.value === formData.objective)?.label || 'Not selected'}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-600">Budget:</span>
                      <span className="ml-2 font-medium">
                        ${formData.budget} ({formData.budgetType})
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-600">Platforms:</span>
                      <span className="ml-2 font-medium">
                        {formData.platforms.length} selected
                      </span>
                    </div>
                  </div>
                </Card>
                
                {/* Launch Options */}
                <Card padding="lg">
                  <h4 className="font-semibold text-neutral-900 mb-4">Launch Options</h4>
                  <div className="space-y-3">
                    <button className="w-full p-4 rounded-xl border-2 border-primary-500 bg-primary-50 text-left">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-primary-900">Launch Campaign Now</div>
                          <div className="text-sm text-primary-700">Start running immediately</div>
                        </div>
                        <Sparkles className="w-5 h-5 text-primary-600" />
                      </div>
                    </button>
                    
                    <button className="w-full p-4 rounded-xl border-2 border-neutral-200 hover:border-neutral-300 text-left">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-neutral-900">Save as Draft</div>
                          <div className="text-sm text-neutral-600">Continue editing later</div>
                        </div>
                        <FileText className="w-5 h-5 text-neutral-600" />
                      </div>
                    </button>
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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                <a href="/campaigns">Back to Campaigns</a>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">
                  Create New Campaign
                </h1>
                <p className="text-neutral-600">
                  Set up your campaign with AI-powered optimization
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Progress Steps */}
            <div className="lg:col-span-1">
              <Card padding="lg" className="sticky top-6">
                <h3 className="font-semibold text-neutral-900 mb-4">Progress</h3>
                <div className="space-y-4">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                        currentStep === step.id
                          ? 'bg-primary-50 border border-primary-200'
                          : currentStep > step.id
                          ? 'bg-success-50 border border-success-200'
                          : 'bg-neutral-50 border border-neutral-200'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep === step.id
                          ? 'bg-primary-600 text-white'
                          : currentStep > step.id
                          ? 'bg-success-600 text-white'
                          : 'bg-neutral-300 text-neutral-600'
                      }`}>
                        {currentStep > step.id ? (
                          <span className="text-sm">✓</span>
                        ) : (
                          <step.icon className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${
                          currentStep >= step.id ? 'text-neutral-900' : 'text-neutral-500'
                        }`}>
                          {step.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Form Content */}
            <div className="lg:col-span-3">
              <Card padding="lg">
                {renderStepContent()}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-neutral-200">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex space-x-3">
                    <Button variant="ghost">
                      Save Draft
                    </Button>
                    {currentStep < steps.length ? (
                      <Button variant="primary" onClick={nextStep}>
                        Next Step
                      </Button>
                    ) : (
                      <Button variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>
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

export default CampaignForm;