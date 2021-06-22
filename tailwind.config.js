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
        activity: '#66B6FF',
        'activity-item': '#A9B1CC',
        'input-border': '#D4DDEB',
        'color-grey': '#EBF0FA',
        'widget-border': '#E7EDFB',
        'color-green': '#7BD7BD',
        'color-light-blue': '#E9F8FF',
        'color-blue-border': '#66B9FF',
        'text-gray': '#2E2F38',
        'orange-badge': '#FF9979',
        'orange-bg': '#FFEFEA',
        'orange-border': '#FF9979',
        'color-green-bg': '#76E1BB',
        'color-error': '#FF92A5',
        'color-link-btn': '#E2E9F9',
        'title-gray': '#C7CFE3',
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
        xxs: '11px',
        xss: '13px',
        smm: '15px',
        title: '18px',
        xll: '22px',
      },
      borderRadius: {
        large: '10px',
      },
      width: {
        '1/24': '4.16%',
        '2/24': '8.33%',
        '3/24': '12.5%',
        '4/24': '16.66%',
        '5/24': '20.83%',
        '6/24': '25%',
        '7/24': '29.16%',
        '8/24': '33.33%',
        '9/24': '37.5%',
        '10/24': '41.66%',
        '11/24': '45.83%',
        '12/24': '50%',
        '13/24': '54.16%',
        '14/24': '58.33%',
        '15/24': '62.5%',
        '16/24': '66.66%',
        '17/24': '70.83%',
        '18/24': '75%',
        '19/24': '79.16%',
        '20/24': '83.33%',
        '21/24': '87.5%',
        '22/24': '91.66%',
        '23/24': '95.83%',
        '24/24': '100%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
