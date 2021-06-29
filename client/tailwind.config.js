module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        navBlue: '#2256FF',
        navy: '#142661',
        bgColor: '#F8F8FF',
        cardBorder:'#C5D0F6',
        grayText:'#8E91AC'
      },
      fontSize:{
        homeLgText: '2.5rem'
      },
      spacing:{
        '144': '28.2rem',
      },
      borderWidth:{
        '1':'1px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
