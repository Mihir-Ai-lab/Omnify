import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className = '',
    variant = 'default',
    padding = 'md',
    hover = false,
    children,
    ...props
  }, ref) => {
    const baseClasses = 'rounded-2xl transition-all duration-200';
    
    const variantClasses = {
      default: 'bg-white border border-neutral-200 shadow-sm',
      elevated: 'bg-white shadow-lg border border-neutral-100',
      outlined: 'bg-white border-2 border-neutral-300',
      filled: 'bg-neutral-50 border border-neutral-200',
    };

    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    };

    const hoverClasses = hover
      ? 'hover:shadow-xl hover:scale-[1.02] hover:border-primary-200 cursor-pointer'
      : '';

    const classes = [
      baseClasses,
      variantClasses[variant],
      paddingClasses[padding],
      hoverClasses,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;