import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  glow?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    className = '',
    variant = 'primary',
    size = 'md',
    dot = false,
    glow = false,
    children,
    ...props
  }, ref) => {
    const baseClasses = 'inline-flex items-center font-medium rounded-full transition-all duration-200';
    
    const variantClasses = {
      primary: 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 border border-blue-500/30',
      secondary: 'bg-gradient-to-r from-teal-500/20 to-teal-600/20 text-teal-300 border border-teal-500/30',
      success: 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-300 border border-green-500/30',
      warning: 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-300 border border-yellow-500/30',
      error: 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 border border-red-500/30',
      neutral: 'bg-gradient-to-r from-slate-500/20 to-slate-600/20 text-slate-300 border border-slate-500/30',
    };

    const sizeClasses = {
      sm: dot ? 'px-2 py-1 text-xs' : 'px-2.5 py-0.5 text-xs',
      md: dot ? 'px-2.5 py-1.5 text-sm' : 'px-3 py-1 text-sm',
      lg: dot ? 'px-3 py-2 text-base' : 'px-4 py-1.5 text-base',
    };

    const dotClasses = {
      primary: 'bg-blue-400',
      secondary: 'bg-teal-400',
      success: 'bg-green-400',
      warning: 'bg-yellow-400',
      error: 'bg-red-400',
      neutral: 'bg-slate-400',
    };

    const glowClasses = glow ? {
      primary: 'shadow-lg shadow-blue-500/25',
      secondary: 'shadow-lg shadow-teal-500/25',
      success: 'shadow-lg shadow-green-500/25',
      warning: 'shadow-lg shadow-yellow-500/25',
      error: 'shadow-lg shadow-red-500/25',
      neutral: 'shadow-lg shadow-slate-500/25',
    }[variant] : '';

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      glowClasses,
      className,
    ].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classes} {...props}>
        {dot && (
          <span className={`w-2 h-2 rounded-full mr-2 animate-pulse ${dotClasses[variant]}`} />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;