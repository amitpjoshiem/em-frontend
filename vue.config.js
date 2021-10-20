module.exports = {
  pwa: {
    name: 'SWD App',
    themeColor: '#042D52',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    manifestOptions: {
      display: 'fullscreen',
      orientation: 'landscape',
      icons: [
        {
          favicon32: './src/assets/svg/icon-logo.svg',
          favicon16: './src/assets/svg/icon-logo.svg',
          appleTouchIcon: './src/assets/svg/icon-logo.svg',
          maskIcon: './src/assets/svg/icon-logo.svg',
          msTileImage: './src/assets/svg/icon-logo.svg',
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
