import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled' | 'glass' | 'futuristic';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  glow?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className = '',
    variant = 'default',
    padding = 'md',
    hover = false,
    glow = false,
    children,
    ...props
  }, ref) => {
    const baseClasses = 'rounded-2xl transition-all duration-300 relative overflow-hidden';
    
    const variantClasses = {
      default: 'bg-white border border-neutral-200 shadow-sm dark:bg-slate-800 dark:border-slate-700',
      elevated: 'bg-white shadow-xl border border-neutral-100 dark:bg-slate-800 dark:border-slate-700',
      outlined: 'bg-white border-2 border-neutral-300 dark:bg-slate-800 dark:border-slate-600',
      filled: 'bg-neutral-50 border border-neutral-200 dark:bg-slate-700 dark:border-slate-600',
      glass: 'glass border border-white/20 shadow-xl',
      futuristic: 'glass-dark border border-white/10 shadow-2xl backdrop-blur-xl',
    };

    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    };

    const hoverClasses = hover
      ? 'card-hover cursor-pointer hover:border-blue-300 dark:hover:border-blue-500'
      : '';

    const glowClasses = glow ? 'neon-blue' : '';

    const classes = [
      baseClasses,
      variantClasses[variant],
      paddingClasses[padding],
      hoverClasses,
      glowClasses,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {/* Geometric pattern overlay for futuristic variant */}
        {variant === 'futuristic' && (
          <div className="absolute inset-0 geometric-pattern opacity-30 pointer-events-none"></div>
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;