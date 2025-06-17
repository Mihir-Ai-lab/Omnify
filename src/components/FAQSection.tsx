import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Zap, Shield, Clock, BarChart3 } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How quickly can I see results with Omnify?",
    answer: "Most customers see initial performance improvements within 24-48 hours of setup. Our AI begins optimizing your campaigns immediately, with significant CAC reductions typically visible within the first week. Full optimization benefits, including 20%+ CAC reduction and 3x ROAS improvements, are usually achieved within 2-4 weeks.",
    icon: <Clock className="h-5 w-5" />
  },
  {
    id: 2,
    question: "What ad platforms does Omnify support?",
    answer: "Omnify integrates with all major advertising platforms including Facebook Ads, Google Ads, Instagram, TikTok Ads, LinkedIn Ads, Twitter Ads, Snapchat Ads, and Pinterest Ads. Our AI automatically optimizes creative variations for each platform's specific requirements and audience behaviors.",
    icon: <Zap className="h-5 w-5" />
  },
  {
    id: 3,
    question: "Is my advertising data secure with Omnify?",
    answer: "Absolutely. We use enterprise-grade security with SOC 2 Type II compliance, end-to-end encryption, and zero-trust architecture. Your data is never shared with third parties, and we maintain strict data isolation between customer accounts. All processing happens in secure, audited environments.",
    icon: <Shield className="h-5 w-5" />
  },
  {
    id: 4,
    question: "Do I need technical expertise to use Omnify?",
    answer: "No technical knowledge required. Omnify is designed for marketers, not engineers. Simply connect your ad accounts, upload your best-performing ads, and our AI handles the rest. The dashboard provides clear, actionable insights without requiring any coding or complex setup.",
    icon: <HelpCircle className="h-5 w-5" />
  },
  {
    id: 5,
    question: "How does Omnify's pricing work?",
    answer: "We offer flexible pricing based on your ad spend volume, starting at $497/month for businesses spending up to $50k monthly on ads. Enterprise plans are available for larger organizations. All plans include unlimited AI-generated variations, real-time optimization, and dedicated support. ROI guarantee: if you don't see 20%+ improvement in 60 days, we'll refund your first month.",
    icon: <BarChart3 className="h-5 w-5" />
  }
];

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="faqs" className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Everything you need to know about Omnify's AI-powered marketing platform
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-2xl"
                aria-expanded={openItems.includes(item.id)}
                aria-controls={`faq-answer-${item.id}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold text-white pr-4">
                    {item.question}
                  </h3>
                </div>
                <ChevronDown 
                  className={`h-6 w-6 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                    openItems.includes(item.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                id={`faq-answer-${item.id}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openItems.includes(item.id) 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="pl-14">
                    <p className="text-slate-300 leading-relaxed text-lg">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">
            Still have questions?
          </p>
          <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200">
            Contact our team →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;