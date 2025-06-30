import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Zap } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="relative">
            <Zap className="h-10 w-10 text-primary-600" />
            <div className="absolute inset-0 blur-sm">
              <Zap className="h-10 w-10 text-primary-600 opacity-30" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-bold text-neutral-900">Omnify</span>
            <span className="text-sm text-neutral-600 font-medium ml-2">Marketing Cloud</span>
          </div>
        </div>

        <Card padding="xl" className="shadow-xl">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-500 mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-neutral-600 mb-8 max-w-md mx-auto leading-relaxed">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Home className="w-5 h-5" />}
              >
                Go to Homepage
              </Button>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="border-t border-neutral-200 pt-8">
            <div className="flex items-center justify-center space-x-2 text-neutral-500 mb-4">
              <Search className="w-5 h-5" />
              <span className="text-sm">Looking for something specific?</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <Link
                to="/dashboard"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/campaigns"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Campaigns
              </Link>
              <Link
                to="/settings"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Settings
              </Link>
            </div>
          </div>
        </Card>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-500">
            If you believe this is an error, please{' '}
            <a
              href="mailto:support@omnify.com"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;