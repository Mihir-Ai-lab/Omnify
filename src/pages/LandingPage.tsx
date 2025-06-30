import React from 'react';
import { ArrowRight, Play, Zap, TrendingUp, Brain, Target, Shield, Users, Award } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Optimization',
      description: 'ROI Engine X™ automatically optimizes your campaigns using advanced machine learning algorithms.',
    },
    {
      icon: Target,
      title: 'Precision Targeting',
      description: 'Reach the right audience at the right time with our intelligent targeting system.',
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Monitor CAC, ROAS, LTV, and CTR with comprehensive real-time dashboards.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with enterprise-grade security and data protection.',
    },
  ];

  const benefits = [
    {
      metric: '47%',
      description: 'Average CAC Reduction',
    },
    {
      metric: '3.2x',
      description: 'ROAS Improvement',
    },
    {
      metric: '24hrs',
      description: 'Time to First Results',
    },
    {
      metric: '99.9%',
      description: 'Platform Uptime',
    },
  ];

  const testimonials = [
    {
      quote: "Omnify reduced our CAC by 52% in just 3 weeks. The ROI Engine X™ is a game-changer.",
      author: "Sarah Chen",
      role: "VP of Growth",
      company: "TechFlow",
    },
    {
      quote: "Finally, a platform that understands DTC marketing. Our ROAS improved 4x in the first month.",
      author: "Marcus Rodriguez",
      role: "Head of Marketing",
      company: "ScaleUp Inc",
    },
    {
      quote: "The autonomous optimization saved us 20+ hours per week. Our team can focus on strategy.",
      author: "Emily Watson",
      role: "CMO",
      company: "GrowthLabs",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header variant="landing" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <Badge variant="primary" size="md">
                <Zap className="w-4 h-4 mr-2" />
                ROI Engine X™ Now Available
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                Predict. Create. Deploy.{' '}
                <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  Optimize.
                </span>
                <br />
                Without switching tabs.
              </h1>
              
              <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl">
                The AI-native marketing orchestration platform for mid-market DTC brands. 
                Reduce CAC by up to 47% with autonomous budget optimization and ROI-linked content.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button 
                    variant="primary" 
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Start Free Trial
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  leftIcon={<Play className="w-5 h-5" />}
                >
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 text-sm text-neutral-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span>No setup required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                  <span>Results in 24 hours</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-50 to-accent-50 opacity-50"></div>
                <div className="relative p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-neutral-900">Campaign Performance</h3>
                      <Badge variant="success" dot>Live</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
                        <div className="text-2xl font-bold text-success-600">-32%</div>
                        <div className="text-sm text-neutral-600">CAC Reduction</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
                        <div className="text-2xl font-bold text-primary-600">4.2x</div>
                        <div className="text-sm text-neutral-600">ROAS</div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm opacity-90">AI Optimization</div>
                          <div className="text-lg font-semibold">Running</div>
                        </div>
                        <Zap className="w-8 h-8 opacity-90" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              The Marketing Chaos Ends Here
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Stop juggling 12 different tools, burning budget on failed campaigns, 
              and missing optimization opportunities while your competitors scale.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card padding="lg" className="text-center">
              <div className="w-16 h-16 bg-error-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-error-600 rotate-180" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Wasted Ad Spend
              </h3>
              <p className="text-neutral-600">
                Average DTC brands waste 40% of their ad budget on underperforming campaigns 
                due to delayed optimization and poor targeting.
              </p>
            </Card>
            
            <Card padding="lg" className="text-center">
              <div className="w-16 h-16 bg-warning-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Tool Overload
              </h3>
              <p className="text-neutral-600">
                Marketing teams use 12+ disconnected tools, leading to data silos, 
                manual work, and missed insights that could drive growth.
              </p>
            </Card>
            
            <Card padding="lg" className="text-center">
              <div className="w-16 h-16 bg-error-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-error-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Slow Optimization
              </h3>
              <p className="text-neutral-600">
                By the time you identify and fix campaign issues, you've already 
                lost thousands in ad spend and potential customers.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="primary" size="lg" className="mb-4">
              ROI Engine X™
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              AI-Powered Marketing Orchestration
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our autonomous AI engine handles the complexity so you can focus on strategy and growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} padding="lg" hover className="text-center h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Results That Speak for Themselves
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Join hundreds of DTC brands already transforming their marketing performance with Omnify.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-6xl font-bold mb-2">
                  {benefit.metric}
                </div>
                <div className="text-lg opacity-90">
                  {benefit.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Trusted by Growth Teams
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              See how marketing teams at fast-growing DTC brands are scaling with Omnify.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} padding="lg" className="h-full">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="text-primary-600 text-4xl mb-4 font-serif">"</div>
                    <p className="text-neutral-700 text-lg leading-relaxed mb-6">
                      {testimonial.quote}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">
                        {testimonial.author}
                      </div>
                      <div className="text-neutral-600 text-sm">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join the AI marketing revolution. Start optimizing your campaigns in under 10 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button 
                variant="primary" 
                size="xl"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Start Free Trial
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="xl"
              className="border-white text-white hover:bg-white hover:text-neutral-900"
            >
              Schedule Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 mt-8 text-sm opacity-75">
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