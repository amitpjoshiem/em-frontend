module.exports = {
  pwa: {
    name: 'SWD App',
    themeColor: '#FF0000',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    manifestOptions: {
      display: 'fullscreen',
      orientation: 'landscape',
    },

    workboxPluginMode: 'GenerateSW',
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   swSrc: 'dev/sw.js',
    // },
  },
}
