<template>
  <div class="flex justify-end items-center">
    <SwdSpinner v-if="isLoadingUserProfile" />

    <template v-else>
      <router-link :to="{ name: 'profile' }">
        <SwdAvatar v-if="!isLoadingUserProfile" :link="user.avatar.url" />
      </router-link>
      <SwdDropDown :options="getActionsOptions" @select="handleSelect">
        <template #titleDropDown>
          <div v-if="!isLoadingUserProfile" class="flex items-center">
            <span class="px-2 py-2 text-xs">{{ getNameTitle }}</span>
            <InlineSvg :src="IconUserAction" />
          </div>
        </template>
      </SwdDropDown>
    </template>
  </div>
</template>
<script>
import IconUserAction from '@/assets/svg/icon-user-action.svg'
import { useRouter } from 'vue-router'
import { useUserProfile } from '@/api/use-user-profile.js'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'UserAction',
  props: {
    idAdminPanel: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()

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
        title: 'Logout',
        command: 'logout',
        class: 'font-medium',
      },
    ]

    const actionsOptionsAdmin = [
      {
        title: 'Profile',
        command: 'profile',
      },
      {
        title: 'Settings',
        command: 'settings',
      },
      {
        title: 'Admin panel',
        command: 'admin-panel',
      },
      {
        title: 'Logout',
        command: 'logout',
        class: 'font-medium',
      },
    ]

    const actionsOptionsAdminPanel = [
      {
        title: 'SWD paltform',
        command: 'sdw-platform',
      },
      {
        title: 'Logout',
        command: 'logout',
        class: 'font-medium',
      },
    ]

    const getActionsOptions = computed(() => {
      if (
        store.state.globalComponents.role === 'admin' ||
        (store.state.globalComponents.role === 'ceo' && !props.idAdminPanel)
      ) {
        return actionsOptionsAdmin
      }

      if (
        store.state.globalComponents.role === 'admin' ||
        (store.state.globalComponents.role === 'ceo' && props.idAdminPanel)
      ) {
        return actionsOptionsAdminPanel
      }

      return actionsOptions
    })

    const getNameTitle = computed(() => {
      if (!user.value.firstName && !user.value.lastName) return 'User'
      return user.value.firstName + ' ' + user.value.lastName.charAt(0) + '.'
    })

    const actionsMap = {
      logout: () => router.push({ name: 'logout' }),
      profile: () => router.push({ name: 'profile' }),
      'admin-panel': () => {
        showLoading()
        router.push({ name: 'admin-panel' })
      },
      'sdw-platform': () => {
        showLoading()
        router.push({ name: 'home' })
      },
      settings: () => router.push({ name: 'settings' }),
    }

    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: user } = useUserProfile()

    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    const showLoading = () => {
      store.commit('globalComponents/setIsLoadingApp', true)
      setTimeout(function () {
        store.commit('globalComponents/setIsLoadingApp', false)
      }, 1000)
    }

    return {
      actionsOptions,
      handleSelect,
      IconUserAction,
      isLoadingUserProfile,
      isErrorUserProfile,
      user,
      getNameTitle,
      getActionsOptions,
    }
  },
}
</script>
