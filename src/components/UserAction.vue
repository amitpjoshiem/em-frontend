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

export default {
  setup() {
    const { error, fetching, logout } = useLogout()

    const actionsOptions = [
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
      'profile-settings': () => console.log('goProfileSetting'),
      'notifications-settings': () => console.log('notifications-settings'),
      integrations: () => console.log('integrations'),
      information: () => console.log('information'),
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
    }
  },
}
</script>
