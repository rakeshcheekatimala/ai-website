// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Dark Navy & Electric Teal design system (Brittany Chiang-inspired)
      colors: {
        // Background layers
        'dark-bg': '#030712',
        'dark-surface': '#0F172A',
        'dark-elevated': '#1E293B',
        'dark-border': '#1E293B',
        'dark-border-visible': '#334155',
        'dark-hover': '#1E293B',
        // Teal accent palette
        'accent': '#2dd4bf',
        'accent-light': '#5eead4',
        'accent-dim': '#0d9488',
      },

      boxShadow: {
        glow: '0 0 20px rgba(45, 212, 191, 0.3)',
        'glow-sm': '0 0 10px rgba(45, 212, 191, 0.15)',
        'glow-lg': '0 0 40px rgba(45, 212, 191, 0.4)',
        card: '0 4px 20px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 30px rgba(45, 212, 191, 0.12)',
      },

      backgroundImage: {
        'gradient-teal': 'linear-gradient(135deg, #0d9488 0%, #2dd4bf 50%, #5eead4 100%)',
        'gradient-soft': 'linear-gradient(135deg, rgba(45, 212, 191, 0.05) 0%, rgba(94, 234, 212, 0.05) 100%)',
        'gradient-dark': 'linear-gradient(180deg, #030712 0%, #0F172A 50%, #030712 100%)',
      },

      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out forwards',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '1' },
          '50%': { transform: 'translateY(-8px)', opacity: '0.85' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(45, 212, 191, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(94, 234, 212, 0.5)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#CBD5E1',
            'h1,h2,h3,h4,h5,h6': {
              color: '#F8FAFC',
              fontWeight: '700',
              letterSpacing: '-0.02em',
            },
            h1: { fontSize: '2.5rem', lineHeight: '1.2' },
            h2: { fontSize: '1.875rem', marginTop: '1.5em' },
            a: {
              color: '#2dd4bf',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#5eead4',
                textDecoration: 'underline',
              },
            },
            code: {
              color: '#5eead4',
              backgroundColor: '#0F172A',
              padding: '0.25em 0.5em',
              borderRadius: '0.375rem',
              fontWeight: '500',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: '#030712',
              border: '1px solid #1E293B',
            },
            blockquote: {
              color: '#94A3B8',
              borderLeftColor: '#2dd4bf',
            },
            strong: {
              color: '#F8FAFC',
            },
          },
        },
      },

      spacing: {
        section: '5rem',
      },

      fontWeight: {
        display: '800',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
