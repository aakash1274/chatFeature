/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        customColor:{
            sideBackground: '#F5FAFC',
            dark01: '#09132C',
            light: '#FFFFFF',
            lightGrey: '#F6F6F6',
            boxBorder: 'rgb(206, 214, 227)',
            boxBorderTop: 'rgba(129,140,248, 1)',
            bubbleBackground: '#EBECF6',
            rightBackground: '#696EE5',
            timeColor: '#829C99',
            greyish: '#F8F9FB'

        }
        
      }
    },
  },
  plugins: [],
}

