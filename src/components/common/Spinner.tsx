import React from 'react';
import { Loader2 } from 'lucide-react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'accent' | 'neutral' | 'white';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'text-primary-600',
    accent: 'text-accent-500',
    neutral: 'text-neutral-500',
    white: 'text-white',
  };

  const classes = [
    'animate-spin',
    sizeClasses[size],
    colorClasses[color],
    className,
  ].filter(Boolean).join(' ');

  return <Loader2 className={classes} />;
};

export default Spinner;