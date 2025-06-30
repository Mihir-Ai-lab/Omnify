import React, { useState } from 'react';
import { Zap, Mail, ArrowRight, CheckCircle, Linkedin, Twitter, Instagram, Youtube, MessageCircle, ChevronDown, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      // Here you would typically send the email to your backend
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const navigationLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faqs' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/omnify-marketing-cloud' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/omnifycloud' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/omnifycloud' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@omnifycloud' },
  ];

  const languages = ['English', 'Spanish', 'Arabic'];

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/50">
      {/* Subtle gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-600/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & Legal */}
          <div className="space-y-6">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <Zap className="h-8 w-8 text-teal-400" />
                <div className="absolute inset-0 blur-sm">
                  <Zap className="h-8 w-8 text-teal-400/50" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">Omnify</span>
                <span className="text-sm text-slate-400 font-medium ml-2">Marketing Cloud</span>
              </div>
            </div>
            
            {/* Copyright and Legal */}
            <div className="space-y-3">
              <p className="text-slate-500 text-sm">
                © 2025 Omnify. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {legalLinks.map((link, index) => (
                  <React.Fragment key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-teal-400 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                    >
                      {link.name}
                    </a>
                    {index < legalLinks.length - 1 && (
                      <span className="text-slate-600">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg mb-6">Navigation</h3>
            <div className="space-y-4">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-slate-400 hover:text-teal-400 transition-colors duration-200 font-medium py-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                >
                  {link.name}
                </a>
              ))}
              
              {/* Omnify Academy Link */}
              <div className="pt-4 border-t border-slate-800">
                <a
                  href="/academy"
                  className="block text-slate-400 hover:text-teal-400 transition-colors duration-200 font-medium py-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                >
                  <span className="text-teal-400 font-semibold">Omnify Academy</span>
                  <br />
                  <span className="text-sm text-slate-500">Learn how to use Omnify's AI tools</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Stay in the Loop */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg mb-6">Stay in the Loop</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Get product updates, insights, and AI growth tips.
            </p>
            
            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="relative">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address for newsletter
                </label>
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribed}
                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center space-x-2 min-h-[48px]"
              >
                {isSubscribed ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
            
            {/* Chat Support */}
            <div className="pt-4 border-t border-slate-800">
              <p className="text-slate-400 text-sm mb-3">Need help?</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <a
                  href="#chat"
                  className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Live Chat</span>
                </a>
                <span className="text-slate-600">or</span>
                <a
                  href="#support"
                  className="text-slate-400 hover:text-teal-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Language & Social */}
          <div className="space-y-6">
            {/* Language Selector */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg mb-6">Language & Social</h3>
              
              {/* Language Dropdown */}
              <div className="relative">
                <label htmlFor="language-selector" className="block text-slate-400 text-sm mb-2">
                  🌐 Language
                </label>
                <button
                  id="language-selector"
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white text-left transition-all duration-200 backdrop-blur-sm hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent flex items-center justify-between"
                  aria-expanded={isLanguageDropdownOpen}
                  aria-haspopup="listbox"
                >
                  <span>{selectedLanguage}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLanguageDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10 backdrop-blur-sm">
                    {languages.map((language) => (
                      <button
                        key={language}
                        onClick={() => {
                          setSelectedLanguage(language);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
                        role="option"
                        aria-selected={language === selectedLanguage}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Social Links */}
            <div className="space-y-4">
              <span className="text-slate-400 text-sm font-medium">Follow us:</span>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 bg-slate-800/50 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-teal-400 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-teal-500/25 backdrop-blur-sm border border-slate-700 hover:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Separator */}
        <div className="border-t border-slate-800/50 pt-8">
          <div className="text-center">
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent font-semibold">
                Transforming marketing for high-growth DTC brands with AI-powered optimization
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;