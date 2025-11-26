// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Phoenix-inspired color palette
      colors: {
        // Dark background
        'dark-bg': '#0a0a0f',
        'dark-surface': '#12121a',
        'dark-border': '#1e1e2e',
        'dark-hover': '#252535',

        // Phoenix warm gradients: orange → gold → crimson
        'phoenix-50': '#fff7ed',
        'phoenix-100': '#ffedd5',
        'phoenix-200': '#fed7aa',
        'phoenix-300': '#fdba74',
        'phoenix-400': '#fb923c',
        'phoenix-500': '#f97316',
        'phoenix-600': '#ea580c',
        'phoenix-700': '#c2410c',
        'phoenix-800': '#9a3412',
        'phoenix-900': '#7c2d12',
        'phoenix-950': '#431407',
        'phoenix-warm': '#FF8C42',
        'phoenix-gold': '#FFD700',
        'phoenix-crimson': '#DC143C',
        'phoenix-ember': '#FF6347',

        // Supporting palette for text & accents
        'cream-50': '#fffbf5',
        'cream-100': '#fef5eb',
        'cream-200': '#fde9d8',
        'cream-300': '#fdd9c1',
        'cream-base': '#f5e8d8',
        'cream-dark': '#e8dcc8',
      },

      // Glowing effects & animations
      boxShadow: {
        glow: '0 0 20px rgba(255, 115, 22, 0.4)',
        'glow-sm': '0 0 10px rgba(255, 115, 22, 0.2)',
        'glow-lg': '0 0 40px rgba(255, 115, 22, 0.6)',
        'glow-gold': '0 0 30px rgba(255, 215, 0, 0.4)',
        'glow-crimson': '0 0 25px rgba(220, 20, 60, 0.3)',
        
        // Soft card shadows
        card: '0 4px 16px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 32px rgba(255, 115, 22, 0.15)',
      },

      backgroundImage: {
        // Phoenix gradient: warm orange to gold
        'gradient-phoenix': 'linear-gradient(135deg, #FF8C42 0%, #FFD700 50%, #FF6347 100%)',
        
        // Soft gradient for cards
        'gradient-soft': 'linear-gradient(135deg, rgba(255, 140, 66, 0.05) 0%, rgba(255, 215, 0, 0.05) 100%)',
        
        // Dark gradient for hero section
        'gradient-dark': 'linear-gradient(180deg, rgba(10, 10, 15, 0.8) 0%, rgba(18, 18, 26, 1) 100%)',
      },

      // Smooth animations inspired by growth & rebirth
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'spark': 'spark 2s ease-out infinite',
        'rise': 'rise 3s ease-out infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '1' },
          '50%': { transform: 'translateY(-10px)', opacity: '0.8' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 115, 22, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)' },
        },
        spark: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-40px)' },
        },
      },

      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#f5e8d8',
            'h1,h2,h3,h4,h5,h6': {
              color: '#f5e8d8',
              fontWeight: '700',
              letterSpacing: '-0.02em',
            },
            h1: { fontSize: '2.5rem', lineHeight: '1.2' },
            h2: { fontSize: '1.875rem', marginTop: '1.5em' },
            a: {
              color: '#FF8C42',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#FFD700',
                textDecoration: 'underline',
              },
            },
            code: {
              color: '#FFD700',
              backgroundColor: '#12121a',
              padding: '0.25em 0.5em',
              borderRadius: '0.375rem',
              fontWeight: '500',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: '#0a0a0f',
              border: '1px solid #1e1e2e',
            },
            blockquote: {
              color: '#e8dcc8',
              borderLeftColor: '#FF8C42',
            },
            strong: {
              color: '#FFD700',
            },
          },
        },
      },

      spacing: {
        section: '5rem',
      },

      // Custom font weights for emphasis
      fontWeight: {
        display: '800',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
