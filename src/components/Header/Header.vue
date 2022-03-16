<template>
  <div class="bg-widget-bg items-center pl-7 h-16 pr-5 flex justify-between">
    <SwdRemoteSearch />
    <div class="flex items-center justify-end">
      <div
        v-if="showContent.testNotificationsBtn"
        class="border border-input-border p-1 mr-2 cursor-pointer rounded-md"
        @click="getNotificationTest()"
      >
        <span class="text-xss">test send notifications</span>
      </div>
      <div
        v-if="showContent.testSentryBtn"
        class="border border-input-border p-1 mr-2 cursor-pointer rounded-md"
        @click="throwError()"
      >
        <span class="text-xss">test sentry</span>
      </div>
      <div
        class="
          h-9
          bg-color-grey
          rounded-md
          border-input-border border
          flex
          items-center
          justify-center
          text-primary text-xss
          cursor-pointer
          mr-5
        "
        @click="newProspect"
      >
        <span class="px-2">
          <InlineSvg :src="IconPlus" />
        </span>
        <div class="pr-2">Add new opportunity</div>
      </div>

      <div class="border-l border-color-grey h-16" />
      <HeaderNotificationsBlock />

      <div class="border-l border-color-grey h-16" />
      <div class="flex items-center justify-center pl-5 cursor-pointer">
        <router-link :to="{ name: 'profile' }">
          <SwdAvatar v-if="!isLoadingUserProfile" :link="user.avatar.url" />
        </router-link>
        <UserAction />
      </div>
    </div>
  </div>
</template>

<script>
import UserAction from '@/components/UserAction.vue'
import SwdRemoteSearch from '@/components/Global/SwdRemoteSearch.vue'
import IconPlus from '@/assets/svg/icon-plus.svg'
import { ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { useUserProfile } from '@/api/use-user-profile.js'
import { useNotificationTest } from '@/api/use-notification-test'
import HeaderNotificationsBlock from '@/components/Header/HeaderNotificationsBlock.vue'
import { useShowContentEnv } from '@/utils/use-show-content-env'

export default {
  name: 'Header',
  components: {
    UserAction,
    SwdRemoteSearch,
    HeaderNotificationsBlock,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: user, isFetched } = useUserProfile()

    const { response, error, fetching, getNotificationTest } = useNotificationTest()

    const { showContent } = useShowContentEnv()

    const newProspect = () => {
      if (
        [
          'basic-information',
          'assets-information',
          'assets-account',
          'add-assets-consolidations',
          'stresstest',
        ].includes(route.name)
      ) {
        ElMessageBox.confirm('Are you sure you want to exit? All the unsaved changes will be lost', 'Info', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'info',
        })
          .then(() => {
            router.push({ name: 'basic-information' })
          })
          .catch(() => {})
      } else {
        router.push({ name: 'basic-information' })
      }
    }

    const throwError = () => {
      throw new Error('Sentry Error')
    }

    return {
      IconPlus,
      newProspect,
      isLoadingUserProfile,
      isErrorUserProfile,
      user,
      isFetched,
      getNotificationTest,
      response,
      error,
      fetching,
      showContent,
      throwError,
    }
  },
}
</script>
