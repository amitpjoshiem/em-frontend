<template>
  <div class="bg-widget-bg items-center pl-7 h-16 pr-5 flex justify-between">
    <div class="flex items-center justify-between w-21/24">
      <template v-if="$can('advisor', 'all')">
        <SwdRemoteSearch />
        <div class="flex items-center justify-end">
          <el-dropdown class="mr-4 cursor-pointer" trigger="click" @command="handleCommand">
            <el-button type="info" plain>
              Test event
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="sendTestNotifications">test send notifications</el-dropdown-item>
                <el-dropdown-item command="sendTestSentry">test sentry</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
            @click="newLead"
          >
            <span class="px-2">
              <InlineSvg :src="IconPlus" />
            </span>
            <div class="pr-2">Add new lead</div>
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
        </div>
      </template>
    </div>

    <div class="w-3/24 flex items-center justify-end">
      <div class="flex items-center justify-center pl-5 cursor-pointer">
        <router-link :to="{ name: 'profile' }">
          <SwdAvatar v-if="!isLoadingUserProfile" :link="user.avatar.url" />
        </router-link>
        <UserAction />
      </div>
    </div>
  </div>
  <NewLeadModal />
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
import { ArrowDown } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import NewLeadModal from '@/components/Leads/NewLeadModal.vue'

export default {
  name: 'Header',
  components: {
    UserAction,
    SwdRemoteSearch,
    HeaderNotificationsBlock,
    ArrowDown,
    NewLeadModal,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

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

    const newLead = () => {
      console.log('newLead')
      store.commit('globalComponents/setShowModal', {
        destination: 'newLead',
        value: true,
      })
    }

    const throwError = () => {
      throw new Error('Sentry Error')
    }

    const handleCommand = (command) => {
      if (command === 'sendTestNotifications') getNotificationTest()
      if (command === 'sendTestSentry') throwError()
    }

    return {
      IconPlus,
      newProspect,
      isLoadingUserProfile,
      isErrorUserProfile,
      user,
      isFetched,
      response,
      error,
      fetching,
      showContent,
      newLead,
      handleCommand,
    }
  },
}
</script>
