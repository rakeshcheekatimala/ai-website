// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Light editorial system for a senior-engineering portfolio.
      colors: {
        ink: '#171A1F',
        graphite: '#2B2F36',
        muted: '#5B6472',
        subtle: '#8A94A6',
        paper: '#FFFFFF',
        wash: '#F7F8FA',
        line: '#DDE1E7',
        accent: '#0F766E',
        'accent-light': '#14B8A6',
        'accent-dim': '#115E59',
        'accent-soft': '#DDF7F2',
      },

      boxShadow: {
        glow: '0 12px 30px rgba(15, 118, 110, 0.18)',
        'glow-sm': '0 8px 18px rgba(15, 118, 110, 0.12)',
        card: '0 12px 28px rgba(23, 26, 31, 0.08)',
        'card-hover': '0 18px 36px rgba(23, 26, 31, 0.12)',
      },

      backgroundImage: {
        'gradient-soft': 'linear-gradient(135deg, rgba(15, 118, 110, 0.08) 0%, rgba(255, 255, 255, 0.72) 100%)',
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
            color: '#4B5563',
            'h1,h2,h3,h4,h5,h6': {
              color: '#171A1F',
              fontWeight: '700',
              letterSpacing: '0',
            },
            h1: { fontSize: '2.5rem', lineHeight: '1.2' },
            h2: { fontSize: '1.875rem', marginTop: '1.5em' },
            a: {
              color: '#0F766E',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#115E59',
                textDecoration: 'underline',
              },
            },
            code: {
              color: '#115E59',
              backgroundColor: '#EEF1F4',
              padding: '0.25em 0.5em',
              borderRadius: '0.375rem',
              fontWeight: '500',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: '#171A1F',
              border: '1px solid #DDE1E7',
            },
            blockquote: {
              color: '#5B6472',
              borderLeftColor: '#0F766E',
            },
            strong: {
              color: '#171A1F',
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
