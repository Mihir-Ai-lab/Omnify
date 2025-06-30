import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
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
    id,
    ...props
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const baseClasses = 'block px-3 py-2.5 text-base border rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const stateClasses = error
      ? 'border-error-300 text-error-900 placeholder-error-400 focus:border-error-500 focus:ring-error-500'
      : 'border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:ring-primary-500 hover:border-neutral-400';

    const paddingClasses = leftIcon && rightIcon
      ? 'pl-10 pr-10'
      : leftIcon
      ? 'pl-10'
      : rightIcon
      ? 'pr-10'
      : '';

    const inputClasses = [
      baseClasses,
      stateClasses,
      paddingClasses,
      fullWidth ? 'w-full' : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-neutral-400">{leftIcon}</span>
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
              <span className={error ? 'text-error-400' : 'text-neutral-400'}>
                {error ? <AlertCircle className="w-5 h-5" /> : rightIcon}
              </span>
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p className={`mt-2 text-sm ${error ? 'text-error-600' : 'text-neutral-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;