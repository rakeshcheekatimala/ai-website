module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#0f172a',
            'h1,h2,h3,h4,h5,h6': {
              color: '#0f172a',
              fontWeight: '700',
            },
            a: {
              color: '#0369a1',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            code: {
              color: '#e11d48',
              backgroundColor: '#f8fafc',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
          },
        },
      },
      spacing: {
        section: '5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
