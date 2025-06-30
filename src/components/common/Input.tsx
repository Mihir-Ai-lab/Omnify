import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'default' | 'futuristic';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className = '',
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    variant = 'default',
    id,
    ...props
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const baseClasses = 'block px-3 py-2.5 text-base border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
      default: error
        ? 'border-red-300 text-red-900 placeholder-red-400 focus:border-red-500 focus:ring-red-500 bg-white'
        : 'border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-blue-500 focus:ring-blue-500 hover:border-neutral-400 bg-white',
      futuristic: error
        ? 'border-red-400/50 text-red-100 placeholder-red-300 focus:border-red-400 focus:ring-red-400 bg-white/5 backdrop-blur-sm'
        : 'border-white/20 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400 hover:border-white/30 bg-white/5 backdrop-blur-sm form-input',
    };

    const paddingClasses = leftIcon && rightIcon
      ? 'pl-10 pr-10'
      : leftIcon
      ? 'pl-10'
      : rightIcon
      ? 'pr-10'
      : '';

    const inputClasses = [
      baseClasses,
      variantClasses[variant],
      paddingClasses,
      fullWidth ? 'w-full' : '',
      className,
    ].filter(Boolean).join(' ');

    const labelClasses = variant === 'futuristic' 
      ? 'block text-sm font-medium text-slate-300 mb-2'
      : 'block text-sm font-medium text-neutral-700 mb-2';

    const helperClasses = variant === 'futuristic'
      ? error ? 'text-red-400' : 'text-slate-400'
      : error ? 'text-red-600' : 'text-neutral-500';

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={inputId}
            className={labelClasses}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className={variant === 'futuristic' ? 'text-slate-400' : 'text-neutral-400'}>
                {leftIcon}
              </span>
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className={error 
                ? (variant === 'futuristic' ? 'text-red-400' : 'text-red-400')
                : (variant === 'futuristic' ? 'text-slate-400' : 'text-neutral-400')
              }>
                {error ? <AlertCircle className="w-5 h-5" /> : rightIcon}
              </span>
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p className={`mt-2 text-sm ${helperClasses}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;