import React, { useState, useEffect } from 'react';
import { Zap, Play, ArrowRight, Menu, X, TrendingDown, Brain, PenTool, BarChart3, Upload, Layers, Rocket, RefreshCw, PieChart, ChevronDown, Star, Users, Award, Shield } from 'lucide-react';
import TestimonialCarousel from './components/TestimonialCarousel';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg border-b border-gray-200' 
          : 'bg-white'
      }`}>
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo and Tagline */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-1">
              <div className="relative">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-slate-900">Omnify</span>
              <span className="text-sm text-slate-600 font-medium">Marketing Cloud</span>
            </div>
            <div className="text-sm text-gray-600" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '14px' }}>
              🏷️ Built for $50M–$150M DTC Brands
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-8">
              <a href="#features" className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                How It Works
              </a>
              <a href="#testimonials" className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                Testimonials
              </a>
              <a href="#faqs" className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                FAQ
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-slate-900 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="container mx-auto px-6 py-4 space-y-4">
              <a href="#features" className="block text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2">
                Features
              </a>
              <a href="#how-it-works" className="block text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2">
                How It Works
              </a>
              <a href="#testimonials" className="block text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2">
                Testimonials
              </a>
              <a href="#faqs" className="block text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2">
                FAQ
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Fixed Book Demo Button */}
      <button 
        className="fixed top-4 right-6 z-50 text-white font-medium transition-opacity duration-200 hover:opacity-90"
        style={{
          backgroundColor: '#2E5BFF',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px'
        }}
      >
        Book Demo
      </button>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-600/5 to-transparent rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-600/20 rounded-full px-4 py-2 text-blue-400 text-sm font-medium">
                <Zap className="h-4 w-4" />
                <span>AI-Powered Marketing Revolution</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Stop Bleeding
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Ad Spend</span>
                <br />
                Start Winning with
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> AI</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                Omnify's autonomous AI Brain transforms your top ads into 25+ optimized creatives, 
                <span className="text-blue-400 font-semibold"> cuts CAC by 20%</span>, and deploys them in minutes—not weeks.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center space-x-2">
                  <span>Book Your Demo Now</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                
                <button className="group flex items-center justify-center space-x-2 text-slate-300 hover:text-white px-6 py-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200 hover:bg-slate-800/50">
                  <Play className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-semibold">See How It Works</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center gap-8 text-slate-400 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>No setup required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Results in 24 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>Average 3x ROAS boost</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              {/* Main Dashboard Image Placeholder */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden transform hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10"></div>
                
                {/* Mock Dashboard Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-slate-400 text-sm font-medium">Omnify AI Dashboard</div>
                </div>

                {/* Mock Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Metrics Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-green-400 text-2xl font-bold">+127%</div>
                      <div className="text-slate-400 text-xs">ROAS Boost</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-blue-400 text-2xl font-bold">-34%</div>
                      <div className="text-slate-400 text-xs">CAC Reduction</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-purple-400 text-2xl font-bold">25+</div>
                      <div className="text-slate-400 text-xs">AI Variants</div>
                    </div>
                  </div>

                  {/* Mock Chart */}
                  <div className="bg-slate-700/30 rounded-lg p-4 h-32 flex items-end justify-between space-x-2">
                    {[40, 65, 45, 80, 55, 90, 70, 95, 85, 100].map((height, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-t from-blue-600 to-purple-600 rounded-t"
                        style={{ height: `${height}%`, width: '8%' }}
                      ></div>
                    ))}
                  </div>

                  {/* Mock Campaign List */}
                  <div className="space-y-3">
                    {['Holiday Campaign 2024', 'Product Launch Q1', 'Retargeting Blast'].map((campaign, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-slate-300 text-sm">{campaign}</span>
                        </div>
                        <div className="text-blue-400 text-sm font-semibold">+{(index + 1) * 45}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-3 shadow-lg animate-bounce">
                <Zap className="h-6 w-6 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-3 shadow-lg animate-pulse">
                <div className="text-white font-bold text-sm">AI ON</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Teams Love Omnify Section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Why Teams Love Omnify
            </h2>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit Card 1 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 hover:border-blue-200">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingDown className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Reduce Ad Spend</h3>
              <p className="text-slate-600 leading-relaxed">
                Cut your CAC by up to 20% with intelligent AI optimization across channels.
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 hover:border-purple-200">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Predict Churn</h3>
              <p className="text-slate-600 leading-relaxed">
                Spot and retain high-risk customers before they drop off — automatically.
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 hover:border-green-200">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <PenTool className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Personalized Content</h3>
              <p className="text-slate-600 leading-relaxed">
                Generate winning creatives for every ad platform, instantly.
              </p>
            </div>

            {/* Benefit Card 4 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 hover:border-blue-200">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Centralized Intelligence</h3>
              <p className="text-slate-600 leading-relaxed">
                One unified dashboard for insights, recommendations, and results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Omnify Works Section */}
      <section id="how-it-works" className="relative py-24 bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              How Omnify Works
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our AI-powered system transforms your marketing in 5 simple steps
            </p>
          </div>

          {/* Steps Container */}
          <div className="max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">AI Learns Your Winners</h3>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Upload your best-performing ads — Omnify's AI decodes what drives results.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 rounded-2xl"></div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Upload className="h-10 w-10 text-white" />
                    </div>
                    <div className="space-y-3">
                      {['Top Ad #1 - 4.2% CTR', 'Top Ad #2 - 3.8% CTR', 'Top Ad #3 - 3.5% CTR'].map((ad, index) => (
                        <div key={index} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                          <span className="text-slate-300">{ad}</span>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-20">
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">AI Creates 25+ Variations</h3>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  We generate channel-optimized creatives instantly from your top ads.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-pink-600/10 rounded-2xl"></div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Layers className="h-10 w-10 text-white" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="bg-slate-700/50 rounded-lg p-3 text-center">
                          <div className="w-full h-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded mb-2"></div>
                          <div className="text-xs text-slate-400">Variant {index + 1}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">AI Launches & Tests Everything</h3>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Omnify deploys and monitors performance across all channels, autonomously.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-600/10 to-emerald-600/10 rounded-2xl"></div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Rocket className="h-10 w-10 text-white" />
                    </div>
                    <div className="space-y-3">
                      {['Facebook Ads', 'Google Ads', 'Instagram', 'TikTok Ads'].map((platform, index) => (
                        <div key={index} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                          <span className="text-slate-300">{platform}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 text-sm">Live</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-20">
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    4
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">Smart Budget Reallocation</h3>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Watch our AI move spend from underperformers to winners in real time.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 to-red-600/10 rounded-2xl"></div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <RefreshCw className="h-10 w-10 text-white animate-spin" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Campaign A</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div className="w-3/4 h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                          </div>
                          <span className="text-green-400 text-sm">+$2.5k</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Campaign B</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div className="w-1/4 h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                          </div>
                          <span className="text-red-400 text-sm">-$1.2k</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    5
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">Clear ROI Dashboard</h3>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Track what works, what doesn't, and where your growth is coming from.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 to-blue-600/10 rounded-2xl"></div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <PieChart className="h-10 w-10 text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                        <div className="text-green-400 text-xl font-bold">+247%</div>
                        <div className="text-slate-400 text-xs">ROAS</div>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                        <div className="text-blue-400 text-xl font-bold">$47.2k</div>
                        <div className="text-slate-400 text-xs">Revenue</div>
                      </div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 h-16 flex items-end justify-between space-x-1">
                      {[60, 80, 45, 90, 70, 100, 85].map((height, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-t from-indigo-600 to-blue-600 rounded-t"
                          style={{ height: `${height}%`, width: '12%' }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Loved by Marketers Who Move Fast
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              See how growth teams are transforming their marketing with Omnify's AI
            </p>
          </div>

          {/* Testimonial Carousel */}
          <TestimonialCarousel />

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-12 mt-16 opacity-70">
            <div className="text-slate-400 font-semibold text-lg">FEATURED IN</div>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {['TechCrunch', 'Forbes', 'Wired', 'Fast Company', 'Inc'].map((brand) => (
                <div key={brand} className="text-slate-500 font-medium text-lg hover:text-slate-400 transition-colors duration-200">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Call-to-Action Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;