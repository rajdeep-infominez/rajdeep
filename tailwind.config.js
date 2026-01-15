/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Motion Design System - Custom Animations
      animation: {
        'fade-in': 'fadeIn var(--motion-duration-base) ease-out',
        'fade-in-up': 'fadeInUp var(--motion-duration-base) ease-out',
        'fade-in-scale': 'fadeInScale var(--motion-duration-slow) ease-out',
        'clip-reveal': 'clipReveal var(--motion-duration-dramatic) ease-out',
        'skeleton-shimmer': 'shimmer 1.5s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        clipReveal: {
          '0%': { clipPath: 'circle(0% at 50% 50%)' },
          '100%': { clipPath: 'circle(150% at 50% 50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      // Custom spacing for depth effects
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Z-index scale for layering
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      // Box shadows for depth
      boxShadow: {
        'depth-subtle': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'depth-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'depth-focus': '0 20px 40px -10px rgba(0, 0, 0, 0.3), 0 16px 20px -10px rgba(0, 0, 0, 0.15)',
        'depth-modal': '0 40px 80px -20px rgba(0, 0, 0, 0.4), 0 30px 40px -15px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.4)',
      },
      // Backdrop blur extensions
      backdropBlur: {
        'xs': '2px',
      },
      // Custom colors for the gallery
      colors: {
        // Dark theme primary colors
        dark: {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a25',
          600: '#232330',
          500: '#2d2d3d',
        },
        // Accent colors
        accent: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          tertiary: '#a855f7',
        },
        // Surface colors
        surface: {
          dark: 'rgba(18, 18, 26, 0.8)',
          light: 'rgba(255, 255, 255, 0.05)',
        },
      },
      // Typography
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Outfit', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      // Transition durations matching motion tokens
      transitionDuration: {
        'instant': '100ms',
        'fast': '200ms',
        'base': '400ms',
        'slow': '800ms',
        'dramatic': '1200ms',
      },
      // Transition timing functions
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.33, 1, 0.68, 1)',
        'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      // Perspective for 3D effects
      perspective: {
        'none': 'none',
        'sm': '500px',
        'md': '1000px',
        'lg': '1500px',
        'xl': '2000px',
      },
    },
  },
  plugins: [],
}
