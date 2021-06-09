module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        main: '#424450',
        gray03: '#AAB5CF',
        lightgray03: '#E2E9F4',
        'widget-bg': '#F2F5FA',
        primary: '#042D52',
        link: '#66B6FF',
        activity: '#66B6FF',
        'activity-item': '#A9B1CC',
        'color-border': '#EBF0FA',
        'input-border': '#D4DDEB',
        'color-grey': '#EBF0FA',
        'widget-border': '#E7EDFB',
        'color-green': '#7BD7BD',
      },
      fontFamily: {
        sans: [
          'Eina01',
          'Comic Sans',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        smallx: '9px',
        small: '10px',
        xss: '13px',
        smm: '15px',
        xll: '22px',
      },
      borderRadius: {
        large: '10px',
      },
    },
    // fontFamily: {
    //   body: ['Eina01', 'Comic Sans', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
