import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
      const result = await signup(formData.name, formData.email, formData.password);
      
      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'Account created successfully! Please sign in to continue.' 
            } 
          });
        }, 2000);
      } else {
        setErrors({ submit: result.error || 'Signup failed' });
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <Card variant="futuristic" padding="lg" className="shadow-2xl animate-slide-in-up">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
              <p className="text-slate-300 mb-4">
                Your account has been successfully created. You'll be redirected to the login page shortly.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
                <div className="loading-spinner"></div>
                <span>Redirecting...</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="geometric-pattern absolute inset-0 opacity-20"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-slide-in-up">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Zap className="h-10 w-10 text-teal-400" />
              <div className="absolute inset-0 blur-sm">
                <Zap className="h-10 w-10 text-teal-400 opacity-30" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-white">Omnify</span>
              <span className="text-sm text-slate-400 font-medium ml-2">Marketing Cloud</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Create your account
          </h1>
          <p className="text-slate-300">Start your AI-powered marketing journey</p>
        </div>

        <Card variant="futuristic" padding="lg" className="shadow-2xl animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <Input
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              leftIcon={<User className="w-5 h-5" />}
              error={errors.name}
              placeholder="Enter your full name"
              fullWidth
              autoComplete="name"
              variant="futuristic"
            />

            {/* Email Field */}
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              leftIcon={<Mail className="w-5 h-5" />}
              error={errors.email}
              placeholder="Enter your email"
              fullWidth
              autoComplete="email"
              variant="futuristic"
            />

            {/* Password Field */}
            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                leftIcon={<Lock className="w-5 h-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-300 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
                error={errors.password}
                placeholder="Create a strong password"
                fullWidth
                autoComplete="new-password"
                variant="futuristic"
              />
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex space-x-1 mb-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          level <= passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">
                    Password strength: {strengthLabels[passwordStrength - 1] || 'Very Weak'}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              leftIcon={<Lock className="w-5 h-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-slate-400 hover:text-slate-300 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              }
              error={errors.confirmPassword}
              placeholder="Confirm your password"
              fullWidth
              autoComplete="new-password"
              variant="futuristic"
            />

            {/* Terms Agreement */}
            <div>
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-white/20 rounded focus:ring-blue-500 focus:ring-2 bg-white/10 mt-0.5 transition-all duration-200"
                />
                <span className="text-sm text-slate-300 leading-relaxed group-hover:text-white transition-colors duration-200">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-400 hover:text-blue-300 font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-400 hover:text-blue-300 font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-400">{errors.agreeToTerms}</p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3 animate-slide-in-up">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{errors.submit}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="futuristic"
              size="lg"
              fullWidth
              loading={isSubmitting}
              disabled={isSubmitting}
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </Card>

        {/* Sign In Link */}
        <div className="text-center mt-6 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-slate-300">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4 animate-slide-in-up" style={{ animationDelay: '0.5s' }}>
          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-slate-400 transition-colors duration-200"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;