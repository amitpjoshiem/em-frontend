import { createStore } from 'vuex'
import auth from './modules/auth'
import dashboard from './modules/dashboard'

import createPersistedState from 'vuex-persistedstate'

const dataState = createPersistedState({
  paths: ['auth.isAuth'],
  key: 'auth',
})

export default createStore({
  modules: {
    auth,
    dashboard,
  },
  plugins: [dataState],
})
