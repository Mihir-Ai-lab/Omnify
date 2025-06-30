import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      const result = await login(formData.email, formData.password, formData.rememberMe);
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setErrors({ submit: result.error || 'Login failed' });
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
            Welcome back
          </h1>
          <p className="text-slate-300">Sign in to your account to continue</p>
        </div>

        <Card variant="futuristic" padding="lg" className="shadow-2xl animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your password"
              fullWidth
              autoComplete="current-password"
              variant="futuristic"
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-white/20 rounded focus:ring-blue-500 focus:ring-2 bg-white/10 transition-all duration-200"
                />
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors duration-200">Remember me</span>
              </label>
              
              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
              >
                Forgot password?
              </Link>
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
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>

            {/* Demo Credentials */}
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4 animate-slide-in-up">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-teal-400" />
                <span className="text-sm font-medium text-teal-300">Demo Credentials</span>
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <p><strong>Email:</strong> demo@omnify.com</p>
                <p><strong>Password:</strong> password123</p>
              </div>
            </div>
          </form>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center mt-6 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-slate-300">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Sign up for free
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

export default LoginPage;