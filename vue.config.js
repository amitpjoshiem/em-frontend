module.exports = {
  pwa: {
    name: 'SWD App 1',
    themeColor: '#042D52',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    manifestOptions: {
      display: 'fullscreen',
      orientation: 'landscape',
      icons: [
        {
          favicon32: '/img/icons/icon-logo.svg',
          favicon16: '/img/icons/icon-logo.svg',
          appleTouchIcon: '/img/icons/icon-logo.svg',
          maskIcon: '/img/icons/icon-logo.svg',
          msTileImage: '/img/icons/icon-logo.svg',
        },
      ],
    },

    workboxPluginMode: 'GenerateSW',
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   swSrc: 'dev/sw.js',
    // },
  },
}
