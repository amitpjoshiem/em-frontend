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
    },

    icons: [
      {
        src: './src/assets/svg/icon-logo.svg',
        sizes: '72x72',
      },
    ],

    workboxPluginMode: 'GenerateSW',
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   swSrc: 'dev/sw.js',
    // },
  },
}
