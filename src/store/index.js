import { createStore } from 'vuex'
import auth from './modules/auth'

import createPersistedState from 'vuex-persistedstate'

const dataState = createPersistedState({
  paths: ['auth.isAuth'],
  key: 'auth',
})

export default createStore({
  modules: {
    auth,
  },
  plugins: [dataState],
})
