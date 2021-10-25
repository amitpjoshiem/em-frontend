/* eslint-disable no-undef */
import { register } from 'register-service-worker'
import store from './store'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.VUE_APP_BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' + 'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered(registration) {
      console.log('Service worker has been registered.')
      setInterval(() => {
        registration.update()
      }, 5000)
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated(updated) {
      console.log('New content is available; please refresh.')
      store.commit('globalComponents/setShowDialogRealodPage', true)
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    },
  })
}
