import { colors, typography, spacing } from './src/styles/tokens/index';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Omnify Brand Colors
        omnify: {
          primary: '#6C63FF',
          'primary-dark': '#5A52E8',
          'primary-light': '#8B84FF',
          secondary: '#2D3748',
          'secondary-dark': '#1A202C',
          'secondary-light': '#4A5568',
          accent: '#00F5FF',
          'accent-dark': '#00D4E6',
          'accent-light': '#33F7FF',
        },
        primary: colors.primary,
        accent: colors.accent,
        neutral: colors.neutral,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
        ...typography.fontFamily,
      },
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      spacing: spacing,
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'omnify': '8px',
        'omnify-lg': '16px',
        'omnify-xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'omnify-glow': '0 0 20px rgba(108, 99, 255, 0.3)',
        'omnify-accent-glow': '0 0 20px rgba(0, 245, 255, 0.3)',
        'omnify-soft': '0 4px 20px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'omnify-gradient': 'linear-gradient(135deg, #6C63FF 0%, #00F5FF 100%)',
        'omnify-gradient-secondary': 'linear-gradient(135deg, #2D3748 0%, #4A5568 100%)',
        'omnify-gradient-accent': 'linear-gradient(135deg, #00F5FF 0%, #6C63FF 100%)',
        'omnify-gradient-bg': 'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(0, 245, 255, 0.15) 100%)',
      },
      animation: {
        'omnify-pulse': 'omnify-pulse 2s ease-in-out infinite',
        'omnify-float': 'omnify-float 3s ease-in-out infinite',
        'omnify-glow': 'omnify-glow-pulse 2s ease-in-out infinite',
        'omnify-shimmer': 'omnify-shimmer 2s infinite',
      },
      keyframes: {
        'omnify-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'omnify-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'omnify-glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(108, 99, 255, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(108, 99, 255, 0.6)' },
        },
        'omnify-shimmer': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      },
      backdropBlur: {
        'omnify': '20px',
      },
    },
  },
  plugins: [],
};