import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  Zap, 
  TrendingUp, 
  Brain, 
  Target, 
  Shield, 
  Users, 
  Award,
  Upload,
  BarChart3,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Eye,
  DollarSign
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: TrendingUp,
      title: 'Real AI Speed',
      description: 'Get real-time insights and optimization recommendations powered by advanced machine learning algorithms.',
      color: 'bg-success-500/20 border-success-500/30',
      iconColor: 'text-success-400',
    },
    {
      icon: Brain,
      title: 'Predict & Prevent Churn',
      description: 'Identify at-risk customers before they churn and take proactive measures to retain them.',
      color: 'bg-primary-500/20 border-primary-500/30',
      iconColor: 'text-primary-400',
    },
    {
      icon: Target,
      title: 'Personalized Content at Scale',
      description: 'Create personalized marketing content for thousands of customers automatically.',
      color: 'bg-warning-500/20 border-warning-500/30',
      iconColor: 'text-warning-400',
    },
    {
      icon: Shield,
      title: 'Unified Marketing Intelligence',
      description: 'Consolidate all your marketing data into one intelligent platform for better decision making.',
      color: 'bg-accent-500/20 border-accent-500/30',
      iconColor: 'text-accent-400',
    },
  ];

  const workflowSteps = [
    {
      step: 1,
      title: 'Upload Your Disasters & Winners',
      description: 'Share your best campaigns and past disasters. Our AI finds the patterns that drive success and failure.',
      icon: Upload,
      mockData: [
        { label: 'Campaign A', value: 85 },
        { label: 'Campaign B', value: 45 },
        { label: 'Campaign C', value: 92 },
      ]
    },
    {
      step: 2,
      title: 'AI Becomes Your Marketing Department',
      description: 'Watch our deep AI of 3 years, tests, and optimizes 47+ campaigns types and creative formats.',
      icon: Brain,
      mockData: [
        { label: 'Meta Ads', value: 78 },
        { label: 'Google Ads', value: 65 },
        { label: 'TikTok Ads', value: 89 },
      ]
    },
    {
      step: 3,
      title: 'Board Meeting Confidence',
      description: 'Walk into your next board meeting with campaigns that consistently deliver results.',
      icon: BarChart3,
      mockData: [
        { label: 'ROAS', value: 320 },
        { label: 'CAC', value: -47 },
        { label: 'LTV', value: 156 },
      ]
    },
    {
      step: 4,
      title: 'Get Results Daily',
      description: 'Your unified dashboard tracks ROI, CAC, churn, and channel performance in real-time so you can optimize on the fly.',
      icon: CheckCircle,
      mockData: [
        { label: 'Revenue', value: 245000 },
        { label: 'Conversions', value: 1250 },
        { label: 'CTR', value: 3.4 },
      ]
    },
  ];

  const testimonials = [
    {
      quote: "Omnify increased sales by 4.2x within 3 months. The AI optimization is incredible.",
      author: "Sarah Chen",
      role: "VP of Growth",
      company: "TechFlow",
      rating: 5,
    },
    {
      quote: "Finally, AI that understands our business. Our ROAS improved 300% in the first quarter.",
      author: "Marcus Rodriguez", 
      role: "Head of Marketing",
      company: "ScaleUp Inc",
      rating: 5,
    },
    {
      quote: "Omnify eliminated 90% of our manual work while doubling our conversion rates.",
      author: "Emily Watson",
      role: "CMO", 
      company: "GrowthLabs",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "What platforms does Omnify support?",
      answer: "Omnify integrates with all major advertising platforms including Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads, and more. We also support email marketing platforms, CRM systems, and analytics tools."
    },
    {
      question: "Is my ad data secure with Omnify?",
      answer: "Yes, we take security seriously. Omnify is SOC 2 compliant and uses enterprise-grade encryption to protect your data. We never share your data with third parties."
    },
    {
      question: "How long does onboarding take?",
      answer: "Most customers are up and running within 24 hours. Our AI starts optimizing your campaigns immediately after connecting your accounts."
    },
    {
      question: "Do I need technical skills to use it?",
      answer: "Not at all! Omnify is designed for marketers, not engineers. Our intuitive interface and AI automation handle the technical complexity for you."
    },
    {
      question: "What kind of ROI can I expect?",
      answer: "Our customers typically see a 47% reduction in CAC and 3.2x improvement in ROAS within the first 90 days. Results vary based on your current setup and industry."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white">
      <Header variant="landing" />
      
      {/* Hero Section - Pixel Perfect Match */}
      <section className="relative overflow-hidden bg-[#1a1f2e] pt-8 pb-16 lg:pt-16 lg:pb-24">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#00d4aa] rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#4f46e5] rounded-full blur-3xl opacity-10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 lg:pr-8">
              {/* Top Badge */}
              <div className="flex items-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/20">
                  <Zap className="w-4 h-4 mr-2 text-[#00d4aa]" />
                  <span className="text-[#00d4aa] text-sm font-medium">AI-Powered Marketing Revolution</span>
                </div>
              </div>
              
              {/* Main Headlines */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-[0.9] tracking-tight">
                  <span className="text-white">Stop Bleeding </span>
                  <span className="text-[#00d4aa]">Ad</span>
                  <br />
                  <span className="text-[#00d4aa]">Spend</span>
                  <br />
                  <span className="text-white">Start Winning with</span>
                  <br />
                  <span className="text-[#00d4aa]">AI</span>
                </h1>
              </div>
              
              {/* Description */}
              <div className="space-y-6">
                <p className="text-xl lg:text-2xl text-[#94a3b8] leading-relaxed max-w-2xl">
                  Omnify's autonomous AI Brain transforms your top ads into 
                  25+ optimized creatives, <span className="text-[#00d4aa] font-semibold">cuts CAC upto 20%</span>, and deploys 
                  them in minutes—not weeks.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#00d4aa] to-[#00b894] text-white font-semibold rounded-xl hover:from-[#00b894] hover:to-[#00a085] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                  Book Your Demo Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#475569] text-white font-semibold rounded-xl hover:bg-[#475569]/10 transition-all duration-200">
                  <Play className="w-5 h-5 mr-2" />
                  See How It Works
                </button>
              </div>
              
              {/* Bottom Features */}
              <div className="flex items-center space-x-8 pt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#00d4aa] rounded-full"></div>
                  <span className="text-[#00d4aa] text-sm font-medium">20% CAC Reduction Guarantee in 60 Days</span>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 text-sm text-[#64748b] pt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#64748b] rounded-full"></div>
                  <span>No setup required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#64748b] rounded-full"></div>
                  <span>Results in 24 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#64748b] rounded-full"></div>
                  <span>Average 3x ROAS boost</span>
                </div>
              </div>
            </div>
            
            {/* Right Dashboard Mockup */}
            <div className="relative lg:pl-8">
              {/* AI-Verified Results Badge */}
              <div className="absolute -top-4 right-8 z-20">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#00d4aa] text-white text-sm font-medium shadow-lg">
                  <Star className="w-4 h-4 mr-2" />
                  AI-Verified Results
                </div>
              </div>
              
              {/* Main Dashboard Container */}
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#e2e8f0]">
                {/* Browser Header */}
                <div className="bg-[#f8fafc] px-4 py-3 border-b border-[#e2e8f0]">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-[#ef4444] rounded-full"></div>
                      <div className="w-3 h-3 bg-[#f59e0b] rounded-full"></div>
                      <div className="w-3 h-3 bg-[#10b981] rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-[#64748b] ml-4">
                      app.omnify.ai/dashboard
                    </div>
                  </div>
                </div>
                
                {/* Dashboard Content */}
                <div className="p-6 bg-white">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#1e293b]">Omnify Marketing Cloud</h3>
                      <p className="text-sm text-[#64748b]">AI-powered marketing optimization for DTC & ecommerce brands</p>
                    </div>
                  </div>
                  
                  {/* Metrics Cards */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-[#f8fafc] rounded-lg p-3 border border-[#e2e8f0]">
                      <div className="text-lg font-bold text-[#1e293b]">$142.5K</div>
                      <div className="text-xs text-[#64748b]">Ad Spend</div>
                      <div className="text-xs text-[#ef4444]">-15.2%</div>
                    </div>
                    <div className="bg-[#f8fafc] rounded-lg p-3 border border-[#e2e8f0]">
                      <div className="text-lg font-bold text-[#1e293b]">$892</div>
                      <div className="text-xs text-[#64748b]">Avg Order Value</div>
                      <div className="text-xs text-[#10b981]">+8.7%</div>
                    </div>
                    <div className="bg-[#f8fafc] rounded-lg p-3 border border-[#e2e8f0]">
                      <div className="text-lg font-bold text-[#1e293b]">334K</div>
                      <div className="text-xs text-[#64748b]">Impressions</div>
                      <div className="text-xs text-[#10b981]">+12.3%</div>
                    </div>
                    <div className="bg-[#f8fafc] rounded-lg p-3 border border-[#e2e8f0]">
                      <div className="text-lg font-bold text-[#1e293b]">4.2x</div>
                      <div className="text-xs text-[#64748b]">ROAS</div>
                      <div className="text-xs text-[#10b981]">+47%</div>
                    </div>
                  </div>
                  
                  {/* ROI Performance Chart */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#1e293b] mb-3">ROI Performance Trend</h4>
                    <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#e2e8f0] h-32">
                      {/* Chart placeholder with trend line */}
                      <div className="relative h-full">
                        <svg className="w-full h-full" viewBox="0 0 300 100">
                          <polyline
                            fill="none"
                            stroke="#00d4aa"
                            strokeWidth="2"
                            points="0,80 50,70 100,60 150,45 200,35 250,25 300,20"
                          />
                          <circle cx="300" cy="20" r="3" fill="#00d4aa" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Agent Status */}
                  <div className="bg-[#f0f9ff] rounded-lg p-4 border border-[#0ea5e9]/20 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-[#0369a1]">AI Agent Status</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-2 h-2 bg-[#10b981] rounded-full"></div>
                          <span className="text-xs text-[#64748b]">All Engines ON</span>
                        </div>
                      </div>
                      <button className="bg-[#3b82f6] text-white px-4 py-2 rounded-lg text-xs font-medium">
                        View AI Insights
                      </button>
                    </div>
                  </div>
                  
                  {/* Live Campaign Performance */}
                  <div>
                    <h4 className="text-sm font-semibold text-[#1e293b] mb-3">Live Campaign Performance</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-[#f8fafc] rounded border border-[#e2e8f0]">
                        <span className="text-xs text-[#64748b]">Holiday Campaign 2024</span>
                        <span className="text-xs font-medium text-[#10b981]">+23.4%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-[#f8fafc] rounded border border-[#e2e8f0]">
                        <span className="text-xs text-[#64748b]">Retargeting Campaign</span>
                        <span className="text-xs font-medium text-[#10b981]">+18.7%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating AI Badge */}
              <div className="absolute -bottom-4 -left-4 z-10">
                <div className="bg-[#1a1f2e] rounded-full p-4 border-4 border-[#00d4aa] shadow-lg">
                  <Zap className="w-8 h-8 text-[#00d4aa]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Omnify Section */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Why Growth Teams at $50M+ DTC Brands Choose Omnify
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} padding="lg" className="bg-[#1e293b] border-[#334155] text-center h-full hover:bg-[#334155] transition-colors duration-200">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 border`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-[#94a3b8]">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#1a1f2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              How Omnify's AI Growth Engine Works
            </h2>
            <p className="text-xl text-[#94a3b8] max-w-3xl mx-auto">
              Our autonomous AI system learns from your best campaigns and scales them across all channels.
            </p>
          </div>
          
          <div className="space-y-16">
            {workflowSteps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#00d4aa] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-lg text-[#94a3b8] leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                <div className="flex-1">
                  <div className="bg-[#1e293b] rounded-2xl p-8 border border-[#334155]">
                    <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary-500/30">
                      <step.icon className="w-8 h-8 text-primary-400" />
                    </div>
                    <div className="space-y-4">
                      {step.mockData.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-[#334155] rounded-lg border border-[#475569]">
                          <span className="text-[#94a3b8] text-sm">{item.label}</span>
                          <span className="text-[#00d4aa] font-semibold">
                            {typeof item.value === 'number' && item.value > 100 ? 
                              `$${(item.value / 1000).toFixed(0)}k` : 
                              `${item.value > 0 ? '+' : ''}${item.value}${item.label === 'CTR' ? '%' : item.label === 'ROAS' ? 'x' : item.label === 'CAC' ? '%' : ''}`
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              What High-Growth DTC Teams Say About Omnify
            </h2>
            <p className="text-xl text-[#94a3b8] max-w-3xl mx-auto">
              See how growth teams are transforming their marketing with Omnify's AI.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} padding="lg" className="bg-[#1e293b] border-[#334155] h-full">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-[#e2e8f0] text-lg leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-[#94a3b8] text-sm">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#1a1f2e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#94a3b8]">
              Everything you need to know about Omnify's AI-powered marketing platform.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} padding="none" className="bg-[#1e293b] border-[#334155]">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#334155] transition-colors duration-200"
                >
                  <span className="font-semibold text-white text-lg">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[#94a3b8]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#94a3b8]" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-[#94a3b8] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#00d4aa] to-[#3b82f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Stop Bleeding<br />Ad Spend?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the AI marketing revolution. Start optimizing your campaigns 
            in under 10 minutes with our smart trial.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="xl"
              className="bg-white text-[#1a1f2e] hover:bg-neutral-100"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Start Your Smart Trial
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="border-white text-white hover:bg-white/10"
            >
              Schedule Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-white/75">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>500+ DTC Brands</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;