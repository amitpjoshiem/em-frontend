import { createStore } from 'vuex'
import auth from './modules/auth'
import dashboard from './modules/dashboard'
import newProspect from './modules/newProspect'
import newClient from './modules/newClient'
import globalComponents from './modules/globalComponents'
import notifications from './modules/notifications'
import activity from './modules/activity'
import logs from './modules/logs'
import adminPanelUsers from './modules/adminPanelUsers'

import createPersistedState from 'vuex-persistedstate'

const dataStateAuth = createPersistedState({
  paths: ['auth.isAuth'],
  key: 'auth',
})

const dataStateAdvisorId = createPersistedState({
  paths: ['globalComponents.advisorId'],
  key: 'advisorId',
  storage: window.sessionStorage,
})

const dataStateCeoId = createPersistedState({
  paths: ['globalComponents.ceoId'],
  key: 'ceoId',
  storage: window.sessionStorage,
})

const dataStateSuperAdminId = createPersistedState({
  paths: ['globalComponents.adminId'],
  key: 'adminId',
  storage: window.sessionStorage,
})

const dataStateRole = createPersistedState({
  paths: ['globalComponents.role'],
  key: 'role',
  storage: window.sessionStorage,
})

const dataStateCurrentCompanyId = createPersistedState({
  paths: ['globalComponents.currentCompanyId'],
  key: 'currentCompanyId',
  storage: window.sessionStorage,
})

const dataStateUserId = createPersistedState({
  paths: ['globalComponents.userId'],
  key: 'userId',
  storage: window.sessionStorage,
})

const dataStateClientId = createPersistedState({
  paths: ['globalComponents.clientId'],
  key: 'clientId',
  storage: window.sessionStorage,
})

const dataStateTerms = createPersistedState({
  paths: ['globalComponents.termsAndConditions'],
  key: 'termsAndConditions',
  storage: window.sessionStorage,
})

export default createStore({
  modules: {
    auth,
    dashboard,
    newProspect,
    newClient,
    globalComponents,
    notifications,
    activity,
    logs,
    adminPanelUsers,
  },
  plugins: [
    dataStateAuth,
    dataStateAdvisorId,
    dataStateRole,
    dataStateCurrentCompanyId,
    dataStateUserId,
    dataStateCeoId,
    dataStateSuperAdminId,
    dataStateClientId,
    dataStateTerms,
  ],
})
