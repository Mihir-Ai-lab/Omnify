import React from 'react';
import { Zap, Mail, ArrowRight, Linkedin, Twitter, Github } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

const Footer: React.FC = () => {
  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'ROI Engine X™', href: '#roi-engine' },
      { name: 'Integrations', href: '#integrations' },
      { name: 'API', href: '#api' },
    ],
    Company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
    Resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
      { name: 'Status', href: '/status' },
    ],
    Legal: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Security', href: '/security' },
      { name: 'Compliance', href: '/compliance' },
    ],
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
  ];

  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <Zap className="h-8 w-8 text-accent-500" />
                <div className="absolute inset-0 blur-sm">
                  <Zap className="h-8 w-8 text-accent-500 opacity-30" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold">Omnify</span>
                <span className="text-sm text-neutral-400 font-medium ml-2">
                  Marketing Cloud
                </span>
              </div>
            </div>
            <p className="text-neutral-400 mb-6 max-w-sm">
              Predict. Create. Deploy. Optimize. The AI-native marketing orchestration platform for mid-market DTC brands.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white">Stay Updated</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400 flex-1"
                />
                <Button variant="secondary" size="md" className="bg-accent-500 hover:bg-accent-600">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <p className="text-neutral-400 text-sm">
                © 2025 Omnify. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-neutral-400">
              <span>🌐 English</span>
              <span>🔒 SOC 2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;