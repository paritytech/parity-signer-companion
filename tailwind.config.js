module.exports = {
  content: ['./src/**/*.tsx', './public/**/*.html'],
  theme: {
    extend: {
      spacing: {
        max: '600px',
      },
      colors: {
        _border: {
          400: '#334048',
          500: '#556068',
          600: '#7e8d95',
        },

        _bg: {
          600: '#3a3a3c',
          500: '#343434',
          400: '#2e2d2f',
          300: '#1f2021',
          200: '#1a1a1b',
          100: '#111111',
          DEFAULT: '#000000',
          signal: '#fefefe',
          danger: '#2f2424',
        },
        _text: {
          600: '#fefefe',
          500: '#d1d1d1',
          400: '#aeaeae',
          300: '#7e8d95',
          100: '#334048',
        },
        _action: {
          600: '#ffffff',
          400: '#3996ec',
          300: '#2980d7',
          200: '#0f447a',
          100: '#082542',
        },
        _crypto: {
          500: '#257681',
          400: '#65a8b1',
          200: '#3d686d',
          100: '#21373a',
        },
        _signal: {
          danger: '#ff3b30',
          on: '#32d74b',
          warning: '#ffd541',
        },
      },
    },
  },
  plugins: [],
}
