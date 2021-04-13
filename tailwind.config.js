module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        'pulse-upgrade': {
          '0%, 100%': {
            'opacity': '1'
          },
          '50%': {
            'opacity': '0.5'
          }
        }
      },
      animation: {
        'pulse-upgrade': "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      },
      fontFamily: {
        'header': ['Poppins','sans-serif']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
