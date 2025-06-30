import React, { useState, useEffect } from 'react';
import { Zap, Play, ArrowRight, Menu, X, TrendingDown, Brain, PenTool, BarChart3, Upload, Layers, Rocket, RefreshCw, PieChart, ChevronDown, Star, Users, Award, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialCarousel from '../components/landing/TestimonialCarousel';
import FAQSection from '../components/landing/FAQSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

const LandingPage: React.FC = () => {
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
          ? 'bg-white shadow-md border-b border-gray-100' 
          : 'bg-white shadow-sm border-b border-gray-50'
      }`}>
        <nav className="container mx-auto flex justify-between items-center py-4 px-6 min-h-[72px]">
          {/* Logo and Tagline */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-1">
              <div className="relative">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-slate-900">Omnify</span>
              <span className="text-sm text-slate-600 font-medium hidden sm:inline">Marketing Cloud</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-8">
              <a href="#features" className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2 min-h-[44px] flex items-center">
                Features
              </a>
              <a href="#how-it-works" className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2 min-h-[44px] flex items-center">
                How It Works
              </a>
              <a href="#testimonials" className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2 min-h-[44px] flex items-center">
                Testimonials
              </a>
              <a href="#faqs" className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2 min-h-[44px] flex items-center">
                FAQ
              </a>
            </div>
            <Link to="/signup">
              <button className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 min-h-[44px]">
                Book Demo
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-slate-900 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'}`}></span>
              <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out translate-y-2 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out translate-y-4 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0'}`}></span>
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="container mx-auto px-6 py-4 space-y-4">
              <a href="#features" className="block text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium py-3 min-h-[44px] flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                Features
              </a>
              <a href="#how-it-works" className="block text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium py-3 min-h-[44px] flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                How It Works
              </a>
              <a href="#testimonials" className="block text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium py-3 min-h-[44px] flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                Testimonials
              </a>
              <a href="#faqs" className="block text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium py-3 min-h-[44px] flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                FAQ
              </a>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 mt-4 min-h-[44px]">
                  Book Demo
                </button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-600/5 to-transparent rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-teal-600/10 border border-teal-600/20 rounded-full px-4 py-2 text-teal-400 text-sm font-medium">
                <Zap className="h-4 w-4" />
                <span>⚡ AI-Powered Marketing Revolution</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Stop Bleeding
                <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent"> Ad Spend</span>
                <br />
                Start Winning with
                <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent"> AI</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                Omnify's autonomous AI Brain transforms your top ads into 25+ optimized creatives, 
                <span className="text-teal-400 font-semibold"> cuts CAC upto 20%</span>, and deploys them in minutes—not weeks.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/signup">
                  <button className="group bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25 flex items-center justify-center space-x-2">
                    <span>Book Your Demo Now</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </Link>
                
                <button className="group flex items-center justify-center space-x-2 text-slate-300 hover:text-white px-6 py-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200 hover:bg-slate-800/50">
                  <Play className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-semibold">See How It Works</span>
                </button>
              </div>

              {/* Guarantee Badge */}
              <div className="inline-flex items-center space-x-2 bg-teal-600/10 border border-teal-600/20 rounded-full px-4 py-2 text-teal-400 text-sm font-medium">
                <span>🚀 20% CAC Reduction Guarantee in 60 Days</span>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center gap-8 text-slate-400 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>No setup required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                  <span>Results in 24 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Average 3x ROAS boost</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              {/* AI-Verified Results Badge - Fixed positioning for mobile */}
              <div className="absolute -top-8 sm:-top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ 
                filter: 'drop-shadow(0 4px 8px rgba(20, 184, 166, 0.3))',
                zIndex: 10
              }}>
                ✨ AI-Verified Results
              </div>

              {/* Main Dashboard Image */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden transform hover:scale-105 transition-transform duration-500 mt-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/10 to-blue-600/10"></div>
                
                <img
                  src="/Omnify Dashboard.jpg"
                  alt="Omnify AI Dashboard showing marketing performance metrics, ROI trends, and campaign analytics"
                  className="w-full h-auto object-cover relative z-10"
                  loading="lazy"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl p-3 shadow-lg animate-bounce">
                <Zap className="h-6 w-6 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-3 shadow-lg animate-pulse">
                <div className="text-white font-bold text-sm">AI ON</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="features" className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Growth Teams at $50M+ DTC Brands Choose Omnify
            </h2>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit Card 1 - Slash Ad Spend */}
            <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-700 hover:border-green-500/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-600/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <TrendingDown className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Slash Ad Spend</h3>
                <p className="text-slate-300 leading-relaxed">
                  Cut your CAC by up to 20% through autonomous, ROI-driven optimization.
                </p>
              </div>
            </div>

            {/* Benefit Card 2 - Predict & Prevent Churn */}
            <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-700 hover:border-purple-500/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Predict & Prevent Churn</h3>
                <p className="text-slate-300 leading-relaxed">
                  Spot high-risk users early and retain them with proactive AI insights.
                </p>
              </div>
            </div>

            {/* Benefit Card 3 - Personalized Content at Scale */}
            <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-700 hover:border-yellow-500/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600/5 to-yellow-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PenTool className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Personalized Content at Scale</h3>
                <p className="text-slate-300 leading-relaxed">
                  Auto-generate creatives and email copy tailored to each platform — instantly.
                </p>
              </div>
            </div>

            {/* Benefit Card 4 - Unified Marketing Intelligence */}
            <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-700 hover:border-teal-500/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Unified Marketing Intelligence</h3>
                <p className="text-slate-300 leading-relaxed">
                  See CAC, ROAS, LTV, CTR — all in one dashboard across Meta, Google, TikTok, etc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Omnify's AI Growth Engine Works Section */}
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
              How Omnify's AI Growth Engine Works
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our autonomous AI agents work together to transform your marketing performance
            </p>
          </div>

          {/* Steps Container */}
          <div className="max-w-6xl mx-auto">
            {/* Step 1 - Upload Your Disasters & Winners */}
            <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-blue-600/30 to-purple-600/30 scale-150"></div>
                    <span className="relative z-10">1</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    <span className="text-teal-400">Upload Your Disasters & Winners</span>
                  </h3>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Show us your failed campaigns and top performers. Our AI finds the patterns your team missed in 47 seconds.
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
                      {['Failed Campaign #1 - 0.8% CTR', 'Top Performer #1 - 4.2% CTR', 'Failed Campaign #2 - 1.1% CTR'].map((ad, index) => (
                        <div key={index} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                          <span className="text-slate-300">{ad}</span>
                          <div className={`w-2 h-2 rounded-full animate-pulse ${index === 1 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 - AI Becomes Your Marketing Department */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-20">
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-purple-600/30 to-pink-600/30 scale-150"></div>
                    <span className="relative z-10">2</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    <span className="text-teal-400">AI Becomes Your Marketing Department</span>
                  </h3>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  While you sleep, our AI creates, tests, and optimizes 25+ campaigns across every channel—better than any human team.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-pink-600/10 rounded-2xl"></div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Brain className="h-10 w-10 text-white" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="bg-slate-700/50 rounded-lg p-3 text-center">
                          <div className="w-full h-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded mb-2"></div>
                          <div className="text-xs text-slate-400">Campaign {index + 1}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 - Board Meeting Confidence */}
            <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-green-600/30 to-emerald-600/30 scale-150"></div>
                    <span className="relative z-10">3</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    <span className="text-teal-400">Board Meeting Confidence</span>
                  </h3>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Walk into your next board meeting knowing exactly which campaigns drove $2M in profit and which ones to kill immediately.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-600/10 to-emerald-600/10 rounded-2xl"></div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Award className="h-10 w-10 text-white" />
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: 'Holiday Campaign', profit: '+$2.1M', status: 'winner' },
                        { name: 'Q1 Launch', profit: '-$180k', status: 'loser' },
                        { name: 'Retargeting', profit: '+$890k', status: 'winner' }
                      ].map((campaign, index) => (
                        <div key={index} className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                          <span className="text-slate-300">{campaign.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-semibold ${campaign.status === 'winner' ? 'text-green-400' : 'text-red-400'}`}>
                              {campaign.profit}
                            </span>
                            <div className={`w-2 h-2 rounded-full animate-pulse ${campaign.status === 'winner' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 - Get Results Daily */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-indigo-600/30 to-blue-600/30 scale-150"></div>
                    <span className="relative z-10">4</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    <span className="text-teal-400">Get Results Daily</span>
                  </h3>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Your unified dashboard tracks ROI, LTV, CAC, churn, and channel performance—updated in real-time. Our AI analysts run 24/7, so you don't have to.
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
                        <div className="text-slate-400 text-xs">Daily Revenue</div>
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
                    <div className="mt-4 flex items-center justify-center">
                      <div className="flex items-center space-x-2 text-teal-400 text-sm">
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                        <span>Live Updates 24/7</span>
                      </div>
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
              What High-Growth DTC Teams Say About Omnify
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
};

export default LandingPage;