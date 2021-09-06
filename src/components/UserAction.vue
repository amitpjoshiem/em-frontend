<template>
  <DropDown :options="actionsOptions" @select="handleSelect">
    <template #titleDropDown>
      <div v-if="!isLoadingUserProfile" class="flex items-center">
        <span class="px-2 py-2">{{ getNameTitle }}</span>
        <InlineSvg :src="IconUserAction" />
      </div>
    </template>
  </DropDown>
</template>
<script>
import IconUserAction from '@/assets/svg/icon-user-action.svg'
import { useRouter } from 'vue-router'
import { useUserProfile } from '@/api/use-user-profile.js'
import { computed } from 'vue'

export default {
  setup() {
    const router = useRouter()
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
        class: 'font-medium',
      },
    ]

    const getNameTitle = computed(() => {
      if (!user.value.firstName && !user.value.lastName) return 'User'
      return user.value.firstName + ' ' + user.value.lastName.charAt(0) + '.'
    })

    const actionsMap = {
      logout: () => router.push({ name: 'logout' }),
      'profile-settings': () => router.push({ name: 'profile' }),
      'notifications-settings': () => router.push({ name: 'notifications' }),
      integrations: () => console.log('integrations'),
      information: () => router.push({ name: 'information' }),
    }

    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: user } = useUserProfile()

    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    return {
      actionsOptions,
      handleSelect,
      IconUserAction,
      isLoadingUserProfile,
      isErrorUserProfile,
      user,
      getNameTitle,
    }
  },
}
</script>
