<template>
  <DropDown :options="actionsOptions" @select="handleSelect">
    <template #titleDropDown>
      <div class="flex items-center">
        <span class="px-2 py-2">{{ title }}</span>
        <InlineSvg :src="IconUserAction" />
      </div>
    </template>
  </DropDown>
</template>
<script>
import IconUserAction from '@/assets/svg/icon-user-action.svg'
import { useLogout } from '@/api/use-logout'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useEmptyDashboard } from '@/utils/useEmptyDashboard'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const { error, fetching, logout } = useLogout()
    const isEmptyDashboard = useEmptyDashboard()
    const actionsOptions = [
      {
        title: 'Demo empty dashboard',
        command: 'demo-empty',
      },
      {
        title: 'Profile settings',
        command: 'profile-settings',
      },
      {
        title: 'Notifications settings',
        command: 'notifications-settings',
      },
      {
        title: 'Integrations',
        command: 'integrations',
      },
      {
        title: 'Information',
        command: 'information',
      },
      {
        title: 'Logout',
        command: 'logout',
        class: 'font-semibold',
      },
    ]

    const title = 'Adam K.'

    const actionsMap = {
      logout: () => logout(),
      'profile-settings': () => router.push({ name: 'profile' }),
      'notifications-settings': () => router.push({ name: 'notifications' }),
      integrations: () => console.log('integrations'),
      information: () => router.push({ name: 'information' }),
      'demo-empty': () =>
        store.commit('dashboard/setEmptyDashboard', !isEmptyDashboard.value),
    }

    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    return {
      actionsOptions,
      handleSelect,
      IconUserAction,
      title,
      fetching,
      error,
      isEmptyDashboard,
    }
  },
}
</script>
