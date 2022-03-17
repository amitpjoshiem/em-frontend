import { createStore } from 'vuex'
import auth from './modules/auth'
import dashboard from './modules/dashboard'
import newProspect from './modules/newProspect'
import globalComponents from './modules/globalComponents'
import notifications from './modules/notifications'

import createPersistedState from 'vuex-persistedstate'

const dataStateAuth = createPersistedState({
  paths: ['auth.isAuth'],
  key: 'auth',
})
const dataStateRole = createPersistedState({
  paths: ['auth.role'],
  key: 'role',
})

export default createStore({
  modules: {
    auth,
    dashboard,
    newProspect,
    globalComponents,
    notifications,
  },
  plugins: [dataStateAuth, dataStateRole],
})
