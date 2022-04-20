<template>
  <div class="bg-widget-bg items-center h-16 flex justify-between px-3">
    <SwdRemoteSearch
      v-if="$can('advisor', 'all') || $can('superadmin', 'all') || $can('ceo', 'all')"
      class="sm:w-4/24"
    />

    <div v-if="$can('advisor', 'all')" class="flex items-center justify-end sm:w-14/24">
      <TestEventBtn v-if="showContent.testNotificationsBtn && showContent.testSentryBtn" />
      <NewLeadBtn />
      <NewOpportunityBtn />
    </div>

    <div
      v-if="$can('superadmin', 'all') || $can('ceo', 'all')"
      class="flex justify-between items-center text-sm sm:w-11/24"
    >
      <el-button :type="getRouteName === 'sa-dashboard' ? 'primary' : 'info'" size="small" plain @click="goDashboard">
        Dashboard
      </el-button>
      <el-button
        :type="getRouteName === 'list-of-advisors' ? 'primary' : 'info'"
        size="small"
        plain
        @click="goAdvisors"
      >
        Advisors
      </el-button>
      <el-button type="info" plain size="small">Members</el-button>
      <el-button type="info" plain size="small">Action</el-button>
      <el-button type="info" plain size="small">PipeLine</el-button>
    </div>

    <SelectCompany v-if="$can('superadmin', 'all')" class="sm:w-3/24" />

    <HeaderNotificationsBlock />

    <div class="flex items-center justify-end cursor-pointer sm:w-4/24 xl:w-2/24">
      <router-link :to="{ name: 'profile' }">
        <SwdAvatar v-if="!isLoadingUserProfile" :link="user.avatar.url" />
      </router-link>
      <UserAction />
    </div>
  </div>
  <NewLeadModal />
</template>

<script>
import UserAction from '@/components/UserAction.vue'
import SwdRemoteSearch from '@/components/Global/SwdRemoteSearch.vue'
import HeaderNotificationsBlock from '@/components/Header/HeaderNotificationsBlock.vue'
import NewLeadModal from '@/components/Leads/NewLeadModal.vue'
import NewLeadBtn from '@/components/Header/NewLeadBtn.vue'
import NewOpportunityBtn from '@/components/Header/NewOpportunityBtn.vue'
import TestEventBtn from '@/components/Header/TestEventBtn.vue'
import SelectCompany from '@/components/Header/SelectCompany.vue'
import { useUserProfile } from '@/api/use-user-profile.js'
import { useShowContentEnv } from '@/hooks/use-show-content-env'

import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'Header',
  components: {
    UserAction,
    SwdRemoteSearch,
    HeaderNotificationsBlock,
    NewLeadModal,
    NewLeadBtn,
    NewOpportunityBtn,
    TestEventBtn,
    SelectCompany,
  },

  setup() {
    const router = useRouter()
    const route = useRoute()

    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: user, isFetched } = useUserProfile()

    const { showContent } = useShowContentEnv()

    const getRouteName = computed(() => {
      return route.name
    })

    const goAdvisors = () => {
      router.push({ name: 'all-advisors' })
    }

    const goDashboard = () => {
      router.push({ name: 'sa-dashboard' })
    }

    return {
      isLoadingUserProfile,
      isErrorUserProfile,
      user,
      isFetched,
      showContent,
      goAdvisors,
      goDashboard,
      getRouteName,
    }
  },
}
</script>
