import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { resetPassword } = useAuth();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const result = await resetPassword(email);
      
      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrors({ submit: result.error || 'Failed to send reset email' });
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card padding="lg" className="shadow-xl text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-success-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Check your email</h2>
            
            <p className="text-neutral-600 mb-6 leading-relaxed">
              We've sent a password reset link to <strong>{email}</strong>. 
              Please check your email and follow the instructions to reset your password.
            </p>
            
            <div className="space-y-4">
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => window.location.href = 'mailto:'}
              >
                Open Email App
              </Button>
              
              <Link to="/login">
                <Button variant="outline" size="md" fullWidth>
                  Back to Sign In
                </Button>
              </Link>
            </div>
            
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <p className="text-sm text-neutral-500 mb-2">
                Didn't receive the email?
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setEmail('');
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Try again
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
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
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Reset your password</h1>
          <p className="text-neutral-600">Enter your email to receive a reset link</p>
        </div>

        <Card padding="lg" className="shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => handleInputChange(e.target.value)}
              leftIcon={<Mail className="w-5 h-5" />}
              error={errors.email}
              placeholder="Enter your email address"
              fullWidth
              autoComplete="email"
              autoFocus
            />

            {/* Submit Error */}
            {errors.submit && (
              <div className="flex items-center space-x-2 text-error-600 bg-error-50 border border-error-200 rounded-lg p-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{errors.submit}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending reset link...' : 'Send Reset Link'}
            </Button>
          </form>
        </Card>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;