module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        // TITLE
        primary: '#073763',

        // BUTTON
        'main-blue': '#83ccf0',

        // BORDER AND BACKGROUND
        'main-gray': '#e9e9e9',

        'main-orange': '#f58833',

        // REST
        'main-green': '#7BD7BD',

        // TEXT
        main: '#282828',

        activity: '#66B6FF',

        'blue-primary': '#66B9FF',
        'blue-primary-light': '#E9F8FF',

        'orange-primary': '#FF9979',
        'orange-primary-light': '#FFEFEA',

        // gray03: '#AAB5CF',
        // 'input-border': '#D4DDEB',
        // 'widget-bg': '#F2F5FA',
        // 'border-blue': '#66B6FF',
        // lightgray03: '#E2E9F4',
        // 'activity-item': '#A9B1CC',
        // 'color-grey': '#EBF0FA',
        // 'widget-border': '#E7EDFB',
        // 'color-main-blue': '#E9F8FF',
        // 'color-blue-border': '#66B9FF',
        // 'text-gray': '#2E2F38',
        // 'orange-badge': '#FF9979',
        // 'orange-bg': '#FFEFEA',
        // 'orange-border': '#FF9979',
        // 'color-error': '#FF92A5',
        // 'title-gray': '#C7CFE3',
        // 'color-main-gray': '#EBF1F9',
        // 'text-main-gray': '#383838',
        // 'lighy-green': '#EEFFF9',
        // 'border-green': '#76E1BB',
        // 'dark-blue-charts': '#53576A',
        // 'main-green': '#DBF4EE',
        // 'color-link': '#6EBAFF',
      },
      fontFamily: {
        sans: ['Montserrat', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
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
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
        '10/10': '100%',
      },
      lineHeight: {
        12: '3rem',
      },
      boxShadow: {
        'shadow-input': '0px 0px 1.5px rgba(73, 96, 117, 0.6)',
        'shadow-input-activ': '0px 0px 1.5px rgba(102, 182, 255, 0.6)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
