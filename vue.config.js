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
          favicon32: 'img/icons/icon-logo.png',
          favicon16: 'img/icons/icon-logo.png',
          appleTouchIcon: 'img/icons/icon-logo.png',
          maskIcon: 'img/icons/icon-logo.png',
          msTileImage: 'img/icons/icon-logo.png',
        },
      ],
    },

    iconPaths: {
      favicon32: 'img/icons/icon-logo.png',
      favicon16: 'img/icons/icon-logo.png',
      appleTouchIcon: 'img/icons/icon-logo.png',
      maskIcon: 'img/icons/icon-logo.png',
      msTileImage: 'img/icons/icon-logo.png',
    },

    workboxPluginMode: 'GenerateSW',
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   swSrc: 'dev/sw.js',
    // },
  },
}
