const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/renderer/src/**/*.{html,js,jsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: 'Establish-Retrosans',
        sans: 'Inter'
      },
      colors: {
        white: '#F9F9F9',
        black: '#2E2D2D'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      defaultTheme: 'dark',
      themes: {
        dark: {
          colors: {
            background: '#111111',
            primary: {
              // #67FBFB true color
              50: '#d9ffff',
              100: '#adfefe', //1
              200: '#80fcfc', //2
              300: '#51fafa', //3
              400: '#2bf9f9', //4
              500: '#1ae0e0', //5
              600: '#05aeae', //6
              700: '#007c7c', //7
              800: '#004c4c', //8
              900: '#001b1b', //9
              DEFAULT: '#1ae0e0',
              foreground: '#2E2D2D'
            }
          }
        }
      }
    })
  ]
}
