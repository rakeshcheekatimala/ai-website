// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Obsidian & Electric Indigo design system
      colors: {
        // Background layers
        'dark-bg': '#030712',
        'dark-surface': '#0F172A',
        'dark-elevated': '#1E293B',
        'dark-border': '#1E293B',
        'dark-border-visible': '#334155',
        'dark-hover': '#1E293B',
      },

      boxShadow: {
        glow: '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-sm': '0 0 10px rgba(99, 102, 241, 0.15)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.4)',
        card: '0 4px 20px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 30px rgba(99, 102, 241, 0.12)',
      },

      backgroundImage: {
        'gradient-indigo': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%)',
        'gradient-soft': 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)' },
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
              color: '#818CF8',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#A5B4FC',
                textDecoration: 'underline',
              },
            },
            code: {
              color: '#A5B4FC',
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
              borderLeftColor: '#6366F1',
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
