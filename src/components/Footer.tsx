import React, { useState } from 'react';
import { Zap, Mail, Twitter, Linkedin, Github, ArrowRight, CheckCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

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
    { name: 'FAQs', href: '#faqs' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Blog', href: '#blog' },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/omnifycloud' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/omnify-marketing-cloud' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/omnify-marketing-cloud' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Zap className="h-8 w-8 text-blue-400" />
                <div className="absolute inset-0 blur-sm">
                  <Zap className="h-8 w-8 text-blue-400/50" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">Omnify</span>
                <span className="text-sm text-slate-400 font-medium ml-2">Marketing Cloud</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              AI-powered marketing automation that transforms your top ads into 25+ optimized creatives, 
              cuts CAC by 20%, and deploys them across all channels in minutes.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-6">Navigation</h3>
            <div className="grid grid-cols-2 gap-4">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-400 hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-6">Stay Updated</h3>
            <p className="text-slate-400 mb-6">
              Get the latest AI marketing insights and product updates delivered to your inbox.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribed}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © 2025 Omnify Marketing Cloud. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="/cookies" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;