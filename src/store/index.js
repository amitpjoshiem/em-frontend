import { createStore } from 'vuex'
import auth from './modules/auth'
import dashboard from './modules/dashboard'
import newProspect from './modules/newProspect'
import newClient from './modules/newClient'
import globalComponents from './modules/globalComponents'
import notifications from './modules/notifications'

import createPersistedState from 'vuex-persistedstate'

const dataStateAuth = createPersistedState({
  paths: ['auth.isAuth'],
  key: 'auth',
})

const dataStateAdvisorId = createPersistedState({
  paths: ['globalComponents.advisorId'],
  key: 'advisorId',
})

const dataStateRole = createPersistedState({
  paths: ['globalComponents.role'],
  key: 'role',
})

const dataStateCurrentCompanyId = createPersistedState({
  paths: ['globalComponents.currentCompanyId'],
  key: 'currentCompanyId',
})

export default createStore({
  modules: {
    auth,
    dashboard,
    newProspect,
    newClient,
    globalComponents,
    notifications,
  },
  plugins: [dataStateAuth, dataStateAdvisorId, dataStateRole, dataStateCurrentCompanyId],
})
