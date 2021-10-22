module.exports = {
  pwa: {
    name: 'SWD',
    themeColor: '#042D52',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#042D52',

    manifestOptions: {
      display: 'fullscreen',
      orientation: 'landscape',
      icons: [
        {
          src: 'img/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'img/icons/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: 'img/icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png',
        },
        {
          src: 'img/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },

    workboxOptions: {
      // swSrc: './src/registerServiceWorker.js',
      skipWaiting: true,
    },

    iconPaths: {
      favicon32: 'img/icons/icon-192x192.png',
      favicon16: 'img/icons/icon-192x192.png',
      appleTouchIcon: 'img/icons/icon-512x512.png',
      maskIcon: 'img/icons/icon-512x512.png',
      msTileImage: 'img/icons/icon-512x512.png',
    },

    workboxPluginMode: 'GenerateSW',
  },
}
