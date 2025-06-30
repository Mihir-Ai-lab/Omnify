import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    className = '',
    variant = 'primary',
    size = 'md',
    dot = false,
    children,
    ...props
  }, ref) => {
    const baseClasses = 'inline-flex items-center font-medium rounded-full';
    
    const variantClasses = {
      primary: 'bg-primary-100 text-primary-800 border border-primary-200',
      secondary: 'bg-accent-100 text-accent-800 border border-accent-200',
      success: 'bg-success-100 text-success-800 border border-success-200',
      warning: 'bg-warning-100 text-warning-800 border border-warning-200',
      error: 'bg-error-100 text-error-800 border border-error-200',
      neutral: 'bg-neutral-100 text-neutral-800 border border-neutral-200',
    };

    const sizeClasses = {
      sm: dot ? 'px-2 py-1 text-xs' : 'px-2.5 py-0.5 text-xs',
      md: dot ? 'px-2.5 py-1.5 text-sm' : 'px-3 py-1 text-sm',
      lg: dot ? 'px-3 py-2 text-base' : 'px-4 py-1.5 text-base',
    };

    const dotClasses = {
      primary: 'bg-primary-500',
      secondary: 'bg-accent-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      neutral: 'bg-neutral-500',
    };

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className,
    ].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classes} {...props}>
        {dot && (
          <span className={`w-2 h-2 rounded-full mr-2 ${dotClasses[variant]}`} />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;