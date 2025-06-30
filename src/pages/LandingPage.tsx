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
    <div className="min-h-screen bg-neutral-900 text-white">
      <Header variant="landing" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-primary-900 to-neutral-800 py-20 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary-600 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl opacity-20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <Badge variant="primary" size="md" className="bg-accent-500/20 text-accent-400 border-accent-500/30">
                <Zap className="w-4 h-4 mr-2" />
                AI Growth Engine
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Stop Bleeding{' '}
                <span className="text-accent-400">Ad</span>
                <br />
                <span className="text-accent-400">Spend</span>
                <br />
                Start Winning with{' '}
                <span className="text-accent-400">AI</span>
              </h1>
              
              <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl">
                Omnify's autonomous AI brain transforms your top ads into 
                24/7 optimized campaigns, cuts waste, and delivers 
                predictable growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-accent-500 hover:bg-accent-600 text-white"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Start Your Smart Trial
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-neutral-600 text-neutral-300 hover:bg-neutral-800"
                  leftIcon={<Play className="w-5 h-5" />}
                >
                  See How It Works
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 text-sm text-neutral-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                  <span>Results in 24 hours</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-neutral-800 rounded-3xl shadow-2xl border border-neutral-700 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/10 to-accent-500/10"></div>
                <div className="relative p-8">
                  {/* Mock Dashboard Interface */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Campaign Performance</h3>
                      <Badge variant="success" dot className="bg-success-500/20 text-success-400 border-success-500/30">Live</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-neutral-700 rounded-xl p-4 border border-neutral-600">
                        <div className="text-2xl font-bold text-success-400">-47%</div>
                        <div className="text-sm text-neutral-400">CAC Reduction</div>
                      </div>
                      <div className="bg-neutral-700 rounded-xl p-4 border border-neutral-600">
                        <div className="text-2xl font-bold text-accent-400">3.2x</div>
                        <div className="text-sm text-neutral-400">ROAS</div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm opacity-90">AI Optimization</div>
                          <div className="text-lg font-semibold">Running</div>
                        </div>
                        <Zap className="w-8 h-8 opacity-90" />
                      </div>
                    </div>
                    
                    {/* Mock Chart Area */}
                    <div className="bg-neutral-700 rounded-xl p-4 border border-neutral-600">
                      <div className="h-24 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg flex items-end justify-between px-2 pb-2">
                        {[40, 65, 45, 80, 60, 90, 75].map((height, i) => (
                          <div 
                            key={i} 
                            className="bg-accent-500 rounded-sm w-3" 
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Omnify Section */}
      <section className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Why Growth Teams at $50M+ DTC Brands Choose Omnify
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} padding="lg" className="bg-neutral-700 border-neutral-600 text-center h-full hover:bg-neutral-600 transition-colors duration-200">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 border`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-300">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              How Omnify's AI Growth Engine Works
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Our autonomous AI system learns from your best campaigns and scales them across all channels.
            </p>
          </div>
          
          <div className="space-y-16">
            {workflowSteps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-lg text-neutral-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                <div className="flex-1">
                  <div className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700">
                    <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary-500/30">
                      <step.icon className="w-8 h-8 text-primary-400" />
                    </div>
                    <div className="space-y-4">
                      {step.mockData.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-neutral-700 rounded-lg border border-neutral-600">
                          <span className="text-neutral-300 text-sm">{item.label}</span>
                          <span className="text-accent-400 font-semibold">
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
      <section className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              What High-Growth DTC Teams Say About Omnify
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              See how growth teams are transforming their marketing with Omnify's AI.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} padding="lg" className="bg-neutral-700 border-neutral-600 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-neutral-200 text-lg leading-relaxed mb-6">
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
                      <div className="text-neutral-400 text-sm">
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
      <section className="py-20 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-neutral-400">
              Everything you need to know about Omnify's AI-powered marketing platform.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} padding="none" className="bg-neutral-800 border-neutral-700">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-700 transition-colors duration-200"
                >
                  <span className="font-semibold text-white text-lg">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-neutral-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-neutral-300 leading-relaxed">
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
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-500">
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
              className="bg-white text-primary-600 hover:bg-neutral-100"
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