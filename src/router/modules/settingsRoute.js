import Settings from '@/layouts/Settings.vue'

export const settingsRoute = {
  path: '/settings-app',
  name: 'settings-app',
  component: Settings,
  children: [
    {
      path: 'profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "Settings" */ '../../components/Settings/ProfileSettings.vue'),
    },
    {
      path: 'information',
      name: 'information',
      meta: {},
      component: () => import(/* webpackChunkName: "Settings" */ '../../components/Settings/InformationSettings.vue'),
    },
    {
      path: 'partners',
      name: 'partners',
      meta: {},
      component: () => import(/* webpackChunkName: "Settings" */ '../../components/Settings/Partners.vue'),
    },
    {
      path: 'settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "Settings" */ '../../components/Settings/Settings.vue'),
    },
  ],
}
