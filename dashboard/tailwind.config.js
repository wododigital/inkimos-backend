/** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            black: '#2c304d',
            red: '#D71818',
            lightGrey: '#D4D4D4',
            WhiteGrey: '#FFFFFF33',
            darkGrey: '#3D3D3D',
            grey: '#F2F2F2',
            blue: '#0055FF',
            green: '#22dac4'
          },
          fontFamily: {
            noto: ['"Noto Sans"', 'sans-serif'],
          },
          backgroundColor:{
            red: '#df4646d4',
            blue: '#0055FF',
            green: '#22dac4'
          },
        },
      },
      plugins: [],
    }