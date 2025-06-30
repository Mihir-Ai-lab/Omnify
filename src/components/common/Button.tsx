import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'futuristic';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  glow?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className = '',
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    glow = false,
    children,
    disabled,
    ...props
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group';
    
    const variantClasses = {
      primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-0.5',
      secondary: 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white focus:ring-teal-500 shadow-lg hover:shadow-xl hover:shadow-teal-500/25 transform hover:-translate-y-0.5',
      outline: 'border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white focus:ring-blue-500 hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5',
      ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-500 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10',
      danger: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white focus:ring-red-500 shadow-lg hover:shadow-xl hover:shadow-red-500/25 transform hover:-translate-y-0.5',
      futuristic: 'bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 hover:from-blue-700 hover:via-purple-700 hover:to-teal-600 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-1 border border-white/20',
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm rounded-lg',
      md: 'px-4 py-2.5 text-base rounded-xl',
      lg: 'px-6 py-3 text-lg rounded-xl',
      xl: 'px-8 py-4 text-xl rounded-2xl',
    };

    const glowClasses = glow ? 'animate-pulse-glow' : '';

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? 'w-full' : '',
      loading ? 'cursor-wait' : '',
      glowClasses,
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {/* Shimmer effect for futuristic variant */}
        {variant === 'futuristic' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        )}
        
        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        <span className="relative z-10">{children}</span>
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;