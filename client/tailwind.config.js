module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        navBlue: '#2256FF',
        navy: '#142661',
        bgColor: '#F8F8FF',
        cardBorder:'#C5D0F6'
      },
      fontSize:{
        temp: '2.5rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
