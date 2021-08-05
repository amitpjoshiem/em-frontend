import { createStore } from 'vuex'
import auth from './modules/auth'
import dashboard from './modules/dashboard'
import newProspect from './modules/newProspect'
import globalComponents from './modules/globalComponents'
import applicationState from './modules/applicationState'

import createPersistedState from 'vuex-persistedstate'

const dataState = createPersistedState({
  paths: ['auth.isAuth'],
  key: 'auth',
})

export default createStore({
  modules: {
    auth,
    dashboard,
    newProspect,
    globalComponents,
    applicationState,
  },
  plugins: [dataState],
})
