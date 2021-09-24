<template>
  <SwdDropDown :options="actionsOptions" @select="handleSelect">
    <template #titleDropDown>
      <div v-if="!isLoadingUserProfile" class="flex items-center">
        <span class="px-2 py-2">{{ getNameTitle }}</span>
        <InlineSvg :src="IconUserAction" />
      </div>
    </template>
  </SwdDropDown>
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
        title: 'Profile',
        command: 'profile',
      },
      {
        title: 'Settings',
        command: 'settings',
      },
      {
        title: 'Last Activity',
        command: 'activity',
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
      profile: () => router.push({ name: 'profile' }),
      activity: () => router.push({ name: 'last-activity' }),
      settings: () => router.push({ name: 'settings' }),
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
