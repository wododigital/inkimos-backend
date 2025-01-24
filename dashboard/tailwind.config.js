/** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            black: '#2c304d',
            lightGrey: '#D4D4D4',
            WhiteGrey: '#FFFFFF33',
            darkGrey: '#3D3D3D',
            grey: '#F2F2F2',
            iblue: '#0055FF',
            igreen: '#22dac4',
          },
          // fontFamily: {
          //   noto: ['"Noto Sans"', 'sans-serif'],
          // },
          backgroundColor:{
            iblue: '#0055FF',
            igreen: '#22dac4',
          },
        },
      },
      plugins: [],
    }